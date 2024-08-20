import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { googleSearchApiProps } from "../../types/search";
import CustomHeader from "../../components/mobile/CustomHeader";
import CustomInput from "../../components/mobile/CustomInput";
import CancelIcon from "../../assets/icons/CancelIcon";
import ImageView from "../../components/mobile/ImageView";
import StarIcon from "../../assets/icons/StarIcon";
import ActionButton from "../../components/mobile/ActionButton";
import {
  realTimeWords,
  RECENT_SEARCH_KEY,
  testImg1,
} from "../../utils/staticDatas";
import { useModal } from "../../hooks/useModal";
import TwoButtonsModal from "../../components/mobile/TwoButtonsModal";

export default function Search() {
  const [searchWord, setSearchWord] = useState("");
  const [recentWords, setRecentWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<googleSearchApiProps[]>([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
    modalRef: deleteModalRef,
  } = useModal();

  // 최근 검색어 불러오기
  useEffect(() => {
    const storedWords = localStorage.getItem(RECENT_SEARCH_KEY);
    if (storedWords) {
      setRecentWords(JSON.parse(storedWords));
    }
  }, []);

  // 검색 api 불러오기
  useEffect(() => {
    if (searchWord.trim() !== "") {
      const requestApi = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get(
            `/googleplace/text-search/page?contents=${searchWord}${
              page === 1 ? "" : `&nextPageToken=${nextPageToken}`
            }`
          );

          if (response.status === 200) {
            const data = response.data;
            setNextPageToken(data.nextPageToken);
            if (page === 1) {
              setSearchData(data.results);
            } else {
              setSearchData((prev) => [...prev, ...data.results]);
            }
            setHasMore(data.results.length > 0);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
          setIsSubmit(false);
        }
      };
      requestApi();
    }
  }, [isSubmit, page]);

  // 검색 data 초기화
  useEffect(() => {
    if (searchWord.trim() === "") {
      setSearchData([]);
      setPage(1);
    }
  }, [searchWord]);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        {
          threshold: 0.5, // 요소의 50% 이상이 보여야 트리거됨
        }
      );

      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    setPage(1);

    if (searchWord.trim() !== "") {
      const updatedRecentWords = [
        searchWord,
        ...recentWords.filter((word) => word !== searchWord),
      ].slice(0, 5);
      setRecentWords(updatedRecentWords);
      localStorage.setItem(
        RECENT_SEARCH_KEY,
        JSON.stringify(updatedRecentWords)
      );
    }
  };

  const handleAllDeleteClick = () => {
    setRecentWords([]);
    localStorage.removeItem(RECENT_SEARCH_KEY);
    closeDeleteModal();
  };

  const handleWordDelete = (deleteWord: string) => {
    const updatedWords = recentWords.filter((word) => word !== deleteWord);
    setRecentWords(updatedWords);
    localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updatedWords));
  };

  return (
    <>
      <CustomHeader title="검색" />
      <SearchContainer>
        <CustomInput
          text="여행지를 입력해주세요"
          del={searchWord !== ""}
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          onSubmit={handleSearchSubmit}
          onDelete={() => setSearchWord("")}
        />
        {isDeleteModalOpen && (
          <TwoButtonsModal
            text="검색 기록을 모두 삭제하시겠습니까?"
            onClick={handleAllDeleteClick}
            onClose={closeDeleteModal}
            modalRef={deleteModalRef}
          />
        )}
        {searchWord === "" && (
          <>
            <SearchWordContainer>
              <SearchRecentTitleBox>
                <SearchSubTitle>최근 검색어</SearchSubTitle>
                <p onClick={() => openDeleteModal()}>모두 삭제</p>
              </SearchRecentTitleBox>
              <SearchWordBox>
                {recentWords.map((word) => {
                  return (
                    <ActionButton del>
                      <span>{word}</span>
                      <CancelIcon onClick={() => handleWordDelete(word)} />
                    </ActionButton>
                  );
                })}
              </SearchWordBox>
            </SearchWordContainer>
            <SearchWordContainer>
              <SearchSubTitle>실시간 검색 여행지</SearchSubTitle>
              <SearchWordBox>
                {realTimeWords.map((word) => {
                  return <ActionButton hashtag key={word}>{`#${word}`}</ActionButton>;
                })}
              </SearchWordBox>
            </SearchWordContainer>
          </>
        )}
        {searchWord !== "" && (
          <SearchBody>
            {searchData.map((item: googleSearchApiProps, index: number) => {
              if (searchData.length === index + 1) {
                // 마지막 요소에 ref 설정
                return (
                  <SearchPlaceCard key={item.placeId} ref={lastElementRef}>
                    <ImageView
                      src={testImg1}
                      alt={item.name}
                      width="80px"
                      height="78px"
                    />
                    <SearchPlaceDetailCol>
                      <SearchPlaceRating>
                        <StarIcon />
                        {item.rating}
                      </SearchPlaceRating>
                      <SearchPlaceTitle>{item.name}</SearchPlaceTitle>

                      <span>{item.formattedAddress}</span>
                    </SearchPlaceDetailCol>
                  </SearchPlaceCard>
                );
              } else {
                return (
                  <SearchPlaceCard key={item.placeId}>
                    <ImageView
                      src={testImg1}
                      alt={item.name}
                      width="80px"
                      height="78px"
                    />
                    <SearchPlaceDetailCol>
                      <SearchPlaceRating>
                        <StarIcon />
                        {item.rating}
                      </SearchPlaceRating>
                      <SearchPlaceTitle>{item.name}</SearchPlaceTitle>

                      <span>{item.formattedAddress}</span>
                    </SearchPlaceDetailCol>
                  </SearchPlaceCard>
                );
              }
            })}
          </SearchBody>
        )}
      </SearchContainer>
    </>
  );
}

const SearchContainer = styled.div`
  height: calc(100% - 25px);
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SearchWordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 10px;
`;

const SearchRecentTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;

  & > p:nth-child(2) {
    font-size: 12px;
    color: ${(props) => props.theme.color.gray300};
  }
`;

const SearchSubTitle = styled.p`
  font-weight: 700;
  font-size: 16px;
  white-space: nowrap;
`;

const SearchWordBox = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const SearchBody = styled.div`
  height: calc(100% - 45px - 50px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
`;

const SearchPlaceCard = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray200};
  border-radius: 16px;
  padding: 12px;
`;

const SearchPlaceDetailCol = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2px 13px;

  & > span {
    font-size: 12px;
    color: ${(props) => props.theme.color.gray700};
  }
`;

const SearchPlaceRating = styled.div`
  display: flex;
  align-self: flex-end;
  align-items: center;
  gap: 3px;
  color: ${(props) => props.theme.color.gray700};
  font-size: 12px;
  margin-bottom: 2px;
`;

const SearchPlaceTitle = styled.p`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.color.gray900};
`;

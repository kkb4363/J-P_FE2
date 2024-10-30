import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSearchPlaceList } from "../../../utils/axios";
import CustomHeader from "../../../components/mobile/CustomHeader";
import CustomInput from "../../../components/CustomInput";
import CancelIcon from "../../../assets/icons/CancelIcon";
import ImageView from "../../../components/ImageView";
import StarIcon from "../../../assets/icons/StarIcon";
import ActionButton from "../../../components/ActionButton";
import { realTimeWords, testImg1 } from "../../../utils/staticDatas";
import TwoButtonsModal from "../../../components/TwoButtonsModal";
import { placeApiProps } from "../../../types/home";
import { useUserStore } from "../../../store/user.store";

export default function Search() {
  const userStore = useUserStore();
  const [deleteEvery, setDeleteEvery] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState<placeApiProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmit(true);
    setPage(1);

    if (searchString.trim() !== "") {
      userStore.addSearchData(searchString);
    }

    setTimeout(() => {
      getSearchPlace();
    }, 200);
  };

  const handleDeleteEvery = () => {
    userStore.clearSearchData();
    setDeleteEvery(false);
  };

  const getSearchPlace = async () => {
    await getSearchPlaceList({ searchString: searchString, page: page }).then(
      (res) => {
        const newData = res?.data.data;
        setSearchData((p) => [...p, ...newData]);
        setHasMore(newData.length > 0);
        setIsLoading(false);
      }
    );
  };

  // 마지막 요소 트리거
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        {
          threshold: 0.1,
        }
      );

      if (node) observer.current.observe(node);
    },
    [hasMore, isLoading]
  );

  useEffect(() => {
    setIsSubmit(false);
    if (searchString.trim() === "") {
      setSearchData([]);
      setPage(1);
    }
  }, [searchString]);

  useEffect(() => {
    if (page !== 1) {
      getSearchPlace();
    }
  }, [isSubmit, page]);

  return (
    <>
      <CustomHeader title="검색" />
      <SearchContainer>
        <CustomInput
          text="여행지를 입력해주세요"
          del={searchString !== ""}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          onSubmit={handleSearchSubmit}
          onDelete={() => setSearchString("")}
        />
        {deleteEvery && (
          <TwoButtonsModal
            isMobile
            text="검색 기록을 모두 삭제하시겠습니까?"
            onClick={handleDeleteEvery}
            onClose={() => setDeleteEvery(false)}
          />
        )}

        {searchString === "" && (
          <>
            <SearchWordContainer>
              <SearchRecentTitleBox>
                <SearchSubTitle>최근 검색어</SearchSubTitle>
                {userStore.getSearchData().length !== 0 && (
                  <p onClick={() => setDeleteEvery(true)}>모두 삭제</p>
                )}
              </SearchRecentTitleBox>
              <SearchWordBox>
                {userStore
                  .getSearchData()
                  ?.slice()
                  .reverse()
                  .map((s) => (
                    <ActionButton del key={s}>
                      <span>{s}</span>
                      <CancelIcon
                        onClick={() => userStore.deleteSearchData(s)}
                      />
                    </ActionButton>
                  ))}
                {userStore.getSearchData().length === 0 && (
                  <p>최근 검색어가 없습니다.</p>
                )}
              </SearchWordBox>
            </SearchWordContainer>
            <SearchWordContainer>
              <SearchSubTitle>실시간 검색 여행지</SearchSubTitle>
              <SearchWordBox>
                {realTimeWords.map((s: string, index: number) => (
                  <ActionButton hashtag key={index}>{`#${s}`}</ActionButton>
                ))}
              </SearchWordBox>
            </SearchWordContainer>
          </>
        )}
        {searchString !== "" && (
          <SearchBody>
            {searchData.length === 0 && !isLoading && isSubmit && (
              <CenterText>검색 결과가 없습니다.</CenterText>
            )}
            {isLoading && <CenterText>로딩중..</CenterText>}
            {searchData.map((item: placeApiProps, index: number) => {
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

                      <span>{item.subName}</span>
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

                      <span>{item.subName}</span>
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

  & > p {
    font-size: 12px;
    color: ${(props) => props.theme.color.gray400};
  }
`;

const SearchBody = styled.div`
  height: calc(100% - 45px - 50px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
`;

const CenterText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  color: ${(props) => props.theme.color.gray300};
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

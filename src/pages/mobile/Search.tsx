import styled from "styled-components";
import CustomHeader from "../../components/mobile/CustomHeader";
import CustomInput from "../../components/mobile/CustomInput";
import CancelIcon from "../../assets/icons/CancelIcon";
import SmallRoundButton from "../../components/mobile/SmallRoundButton";
import { useCallback, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import ImageView from "../../components/mobile/ImageView";
import { googleSearchApiProps } from "../../types/search";
import StarIcon from "../../assets/icons/StarIcon";

// [TODO]: 최근 검색어 배열 데이터 가져오기
const recentWords: string[] = ["춘천", "거제도", "통영"];
const realTimeWords: string[] = [
  "제주도",
  "여수",
  "강릉",
  "부산",
  "전주",
  "남해",
  "가평",
  "진천",
  "담양",
  "곡성",
];

export default function Search() {
  const [searchWord, setSearchWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<googleSearchApiProps[]>([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (searchWord.trim() !== "") {
      // [TODO]: 최근 검색어 로컬 스토리지 저장
      //
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
  };

  console.log(searchWord, page, loading);
  console.log(searchData);
  return (
    <>
      <CustomHeader title="검색" />
      <SearchContainer>
        {/* [TODO]: 검색어 입력 시 x 아이콘 추가 */}
        <CustomInput
          text="여행지를 입력해주세요"
          onChange={(e) => setSearchWord(e.target.value)}
          onSubmit={(e) => handleSearchSubmit(e)}
        />
        {searchWord === "" && (
          <>
            <SearchWordContainer>
              <SearchRecentTitleBox>
                <SearchSubTitle>최근 검색어</SearchSubTitle>
                <p>모두 삭제</p>
              </SearchRecentTitleBox>
              <SearchWordBox>
                {recentWords.map((word) => {
                  return (
                    <SmallRoundButton del>
                      <span>{word}</span>
                      <CancelIcon />
                    </SmallRoundButton>
                  );
                })}
              </SearchWordBox>
            </SearchWordContainer>
            <SearchWordContainer>
              <SearchSubTitle>실시간 검색 여행지</SearchSubTitle>
              <SearchWordBox>
                {realTimeWords.map((word) => {
                  return (
                    <SmallRoundButton hashtag>{`#${word}`}</SmallRoundButton>
                  );
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
                      src="https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
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
                      src="https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
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

import styled from "styled-components";
import CustomHeader from "../../../components/mobile/CustomHeader";
import CustomInput from "../../../components/CustomInput";
import CancelIcon from "../../../assets/icons/CancelIcon";
import ImageView from "../../../components/ImageView";
import StarIcon from "../../../assets/icons/StarIcon";
import ActionButton from "../../../components/ActionButton";
import { realTimeWords, testImg1 } from "../../../utils/staticDatas";
import TwoButtonsModal from "../../../components/TwoButtonsModal";
import { PlaceProps } from "../../../types/place";
import { useUserStore } from "../../../store/user.store";
import useSearchHook from "../../../hooks/useSearch";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const userStore = useUserStore();
  const navigate = useNavigate();

  const {
    search,
    searchData,
    setSearch,
    handleInput,
    handleInputSubmit,
    handleDeleteEvery,
    deleteEveryOpen,
    handleDeleteOpen,
    handleRecentWordClick,
  } = useSearchHook();

  return (
    <>
      <CustomHeader title="검색" />
      <SearchContainer>
        <CustomInput
          text="여행지를 입력해주세요"
          del={search !== ""}
          value={search}
          onChange={handleInput}
          onSubmit={handleInputSubmit}
          onDelete={() => setSearch("")}
        />
        {deleteEveryOpen && (
          <TwoButtonsModal
            isMobile
            text="검색 기록을 모두 삭제하시겠습니까?"
            onClick={handleDeleteEvery}
            onClose={handleDeleteEvery}
          />
        )}

        {!search && (
          <>
            <SearchWordContainer>
              <SearchRecentTitleBox>
                <SearchSubTitle>최근 검색어</SearchSubTitle>
                {userStore.getSearchData().length !== 0 && (
                  <p onClick={handleDeleteOpen}>모두 삭제</p>
                )}
              </SearchRecentTitleBox>
              <SearchWordBox>
                {userStore
                  .getSearchData()
                  ?.slice()
                  .reverse()
                  .map((s) => (
                    <ActionButton del key={s}>
                      <span onClick={() => handleRecentWordClick(s)}>{s}</span>
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
                {realTimeWords.map((r: string, index: number) => (
                  <ActionButton
                    onClick={() => handleRecentWordClick(r)}
                    hashtag
                    key={index}
                  >{`#${r}`}</ActionButton>
                ))}
              </SearchWordBox>
            </SearchWordContainer>
          </>
        )}
        {!!search && (
          <SearchBody>
            {searchData.length === 0 && (
              <CenterText>검색 결과가 없습니다.</CenterText>
            )}

            {searchData.map((item: PlaceProps) => (
              <SearchPlaceCard
                key={item.placeId}
                onClick={() => navigate(`/home/${item.placeId}`)}
              >
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
            ))}
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
  padding-bottom: 20px;
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

import styled from "styled-components";
import { HomeTitle, InputBox } from "../home/Home";
import CustomInput from "../../../components/CustomInput";
import XIcon from "../../../assets/icons/XIcon";
import { useUserStore } from "../../../store/user.store";
import { realTimeWords } from "../../../utils/staticDatas";
import TwoButtonsModal from "../../../components/TwoButtonsModal";
import ResultsCard from "../../../components/web/search/ResultsCard";
import useSearchHook from "../../../hooks/useSearch";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Search() {
  const userStore = useUserStore();
  const location = useLocation();

  const {
    search,
    searchData,
    handleInput,
    handleInputEnter,
    handleDeleteEvery,
    deleteEveryOpen,
    handleDeleteOpen,
    handleRecentWordClick,
  } = useSearchHook();

  useEffect(() => {
    if (!!location?.state?.query) {
      handleRecentWordClick(location.state.query);
    }
  }, [location?.state?.query]);

  return (
    <>
      <HomeTitle>어디로 떠날까요?</HomeTitle>
      <InputBox>
        <CustomInput
          text="여행지를 입력해주세요"
          value={search + ""}
          width="500px"
          onChange={handleInput}
          onkeydown={handleInputEnter}
        />
      </InputBox>

      {!search && (
        <>
          <SubTitle>
            최근 검색어
            {userStore.getSearchData().length !== 0 && (
              <span onClick={handleDeleteOpen}>모두 삭제</span>
            )}
          </SubTitle>
          <TagBoxRow>
            {userStore.getSearchData()?.map((s) => (
              <SearchTag key={s}>
                <span onClick={() => handleRecentWordClick(s)}>{s}</span>
                <div onClick={() => userStore.deleteSearchData(s)}>
                  <XIcon stroke="#1a1a1a" />
                </div>
              </SearchTag>
            ))}
          </TagBoxRow>

          <SubTitle>실시간 검색 여행지</SubTitle>
          <TagBoxRow>
            {realTimeWords.map((r) => (
              <NewSearchTag key={r} onClick={() => handleRecentWordClick(r)}>
                <span>#{r}</span>
              </NewSearchTag>
            ))}
          </TagBoxRow>
        </>
      )}

      {searchData.length !== 0 && !!search && (
        <>
          <SubTitle>검색 결과</SubTitle>
          <ResultsRow>
            {searchData?.map((result) => (
              <ResultsCard
                name={result.name}
                subName={result.subName}
                rating={result.rating}
                key={result.id}
                placeId={result.placeId}
              />
            ))}
          </ResultsRow>
        </>
      )}

      {!!search && searchData.length === 0 && (
        <CenterText>검색결과가 없습니다</CenterText>
      )}

      {deleteEveryOpen && (
        <TwoButtonsModal
          isMobile={false}
          width="470px"
          height="390px"
          text="검색 기록을 모두 삭제하시겠습니까?"
          onClick={handleDeleteEvery}
          onClose={handleDeleteOpen}
        />
      )}
    </>
  );
}

const SubTitle = styled.p`
  color: ${(props) => props.theme.color.gray900};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
    cursor: pointer;
  }
`;

const TagBoxRow = styled.div`
  padding-bottom: 50px;
  display: flex;
  gap: 8px;
`;

const SearchTag = styled.div`
  height: 38px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 3px;
  background-color: ${(props) => props.theme.color.white};

  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    cursor: pointer;
  }

  & > div {
    cursor: pointer;
  }
`;

const NewSearchTag = styled(SearchTag)`
  background-color: ${(props) => props.theme.color.secondaryLight};
  border: 1px solid ${(props) => props.theme.color.secondary};
  cursor: pointer;
  & > span {
    color: ${(props) => props.theme.color.secondary};
  }
`;

const ResultsRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const CenterText = styled.p`
  margin-top: 136px;
  text-align: center;
  color: ${(props) => props.theme.color.gray300};
  font-size: 16px;
`;

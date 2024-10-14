import styled from "styled-components";
import { HomeTitle, InputBox } from "../home/Home";
import CustomInput from "../../../components/mobile/CustomInput";
import { useState } from "react";
import XIcon from "../../../assets/icons/XIcon";
import { getSearchPlaceList } from "../../../utils/axios";
import { placeApiProps } from "../../../types/home";
import testImg from "../../../assets/images/testImg.png";
import StarIcon from "../../../assets/icons/StarIcon";
import { useUserStore } from "../../../store/user.store";
import { realTimeWords } from "../../../utils/staticDatas";
import TwoButtonsModal from "../../../components/mobile/TwoButtonsModal";

export default function Search() {
  const userStore = useUserStore();
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState<placeApiProps[]>([]);
  const [deleteEvery, setDeleteEvery] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData([]);
    setSearch(e.target.value);
  };

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      getSearchPlace();
      userStore.addSearchData(search);
    }
  };

  const getSearchPlace = async () => {
    await getSearchPlaceList({ searchString: search + "", page: 1 }).then(
      (res) => {
        setSearchData(res?.data.data);
      }
    );
  };

  const handleDeleteEvery = () => {
    userStore.clearSearchData();
    setDeleteEvery(false);
  };

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
              <span onClick={() => setDeleteEvery(true)}>모두 삭제</span>
            )}
          </SubTitle>
          <TagBoxRow>
            {userStore.getSearchData()?.map((s) => (
              <SearchTag key={s} onClick={() => userStore.deleteSearchData(s)}>
                <span>{s}</span>
                <XIcon stroke="#1a1a1a" />
              </SearchTag>
            ))}
          </TagBoxRow>

          <SubTitle>실시간 검색 여행지</SubTitle>
          <TagBoxRow>
            {realTimeWords.map((r) => (
              <NewSearchTag key={r}>
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
              <ResultsCard key={result.id}>
                <img src={testImg} alt="result" />

                <div>
                  <p>{result.name}</p>
                  <span>
                    <StarIcon />
                    {result.rating}
                  </span>
                </div>

                <p>{result.subName}</p>
              </ResultsCard>
            ))}
          </ResultsRow>
        </>
      )}

      {!!search && searchData.length === 0 && (
        <CenterText>검색결과가 없습니다</CenterText>
      )}

      {deleteEvery && (
        <TwoButtonsModal
          text="검색 기록을 모두 삭제하시겠습니까?"
          onClick={handleDeleteEvery}
          onClose={() => setDeleteEvery(false)}
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
  }

  & > svg {
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

const ResultsCard = styled.div`
  width: 224px;
  height: 190px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};

  & > img {
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    width: 100%;
    height: 50%;
    object-fit: cover;
  }

  & > div {
    padding: 16px 16px 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > p {
      color: ${(props) => props.theme.color.gray900};
      font-size: 16px;
      font-weight: 700;
    }

    & > span {
      display: flex;
      align-items: center;
      gap: 2px;
      color: ${(props) => props.theme.color.gray500};
      font-size: 12px;
    }
  }

  & > p {
    padding-top: 12px;
    color: ${(props) => props.theme.color.gray700};
    font-size: 14px;
    padding-left: 16px;
  }
`;

const CenterText = styled.p`
  margin-top: 136px;
  text-align: center;
  color: ${(props) => props.theme.color.gray300};
  font-size: 16px;
`;

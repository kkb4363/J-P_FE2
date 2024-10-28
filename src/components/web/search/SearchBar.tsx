import styled, { keyframes } from "styled-components";
import { HomeTitle, InputBox } from "../../../pages/web/home/Home";
import CustomInput from "../../CustomInput";
import ResultsCard from "./ResultsCard";
import useSearchHook from "../../../hooks/useSearch";
import { useModalStore } from "../../../store/modal.store";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const { setCurrentModal } = useModalStore();
  const { search, searchData, handleInput, handleInputEnter } = useSearchHook();

  const handleMore = () => {
    setCurrentModal("");
    navigate("/search");
  };

  return (
    <SearchBarContainer>
      <HomeTitle>어디로 떠날까요?</HomeTitle>

      <SearchInputBox>
        <CustomInput
          text="여행지를 입력해주세요"
          value={search + ""}
          width="500px"
          onChange={handleInput}
          onkeydown={handleInputEnter}
        />
      </SearchInputBox>

      <SearchResultBox>
        <div>
          <h1>검색결과</h1>
          <span onClick={handleMore}>더보기</span>
        </div>

        <SearchResultRow>
          {searchData?.map((result) => (
            <ResultsCard
              name={result.name}
              subName={result.subName}
              rating={result.rating}
              key={result.id}
            />
          ))}
        </SearchResultRow>
      </SearchResultBox>
    </SearchBarContainer>
  );
}

const modalAnimation = keyframes`
    from {
    transform: translateY(-100px);
  }
  to {
    transform: translateY(0);
  }

`;

const SearchBarContainer = styled.div`
  animation: ${modalAnimation} 0.2s linear;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  height: 532px;
  background-color: ${(props) => props.theme.color.white};
  z-index: 2;
  padding: 0 120px;
`;

const SearchInputBox = styled(InputBox)`
  margin: 31px 0 35px 0;
`;

const SearchResultBox = styled.div`
  width: 1000px;

  & > div:first-child {
    display: flex;
    justify-content: space-between;
    & > h1 {
      margin: 0 0 24px 0;
      color: ${(props) => props.theme.color.gray900};
      font-size: 24px;
      font-weight: 700;
    }
    & > span {
      cursor: pointer;
      color: ${(props) => props.theme.color.gray700};
      font-size: 20px;
    }
  }
`;

const SearchResultRow = styled.div`
  display: flex;
  gap: 33px;
`;

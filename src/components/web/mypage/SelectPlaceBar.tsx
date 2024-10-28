import styled, { keyframes } from "styled-components";
import { HomeTitle, InputBox } from "../../../pages/web/home/Home";
import CustomInput from "../../CustomInput";
import useSearchHook from "../../../hooks/useSearch";
import AddPlaceCard from "./AddPlaceCard";
import PrimaryButton from "../../PrimaryButton";
import { scrollHidden } from "../../../assets/styles/home.style";

export default function SelectPlaceBar() {
  const { search, searchData, handleInput, handleInputEnter } = useSearchHook();

  return (
    <SelectPlaceBarContainer>
      <HomeTitle>장소 등록</HomeTitle>

      <SearchInputBox>
        <CustomInput
          text="장소를 입력해주세요"
          value={search + ""}
          width="500px"
          onChange={handleInput}
          onkeydown={handleInputEnter}
        />
      </SearchInputBox>

      <CardCol>
        <AddPlaceCard />
        <AddPlaceCard />
        <AddPlaceCard />
      </CardCol>

      <ButtonBox>
        <PrimaryButton
          blue={true}
          text="완료"
          onClick={() => {}}
          width="190px"
        />
      </ButtonBox>
    </SelectPlaceBarContainer>
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

const SelectPlaceBarContainer = styled.div`
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
  margin: 31px 0 42px 0;
`;

const CardCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 140px;
  gap: 8px;
  ${scrollHidden};
  overflow-y: auto;
`;

const ButtonBox = styled.div`
  margin-top: 44px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

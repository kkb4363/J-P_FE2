import styled from "styled-components";
import BellIcon from "../../icons/BellIcon";
import CustomInput from "../../components/mobile/CustomInput";

export default function Home() {
  // onboading page vs home page

  return (
    <HomeContainer>
      <HomeHeader>
        <div>Logo</div>
        <BellIcon />
      </HomeHeader>

      <CustomInput text="여행지를 입력해주세요" />
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  // Todo: mobile 화면 보호 적용
  padding: 4px 18px 18px 18px;
  width: 100vw;
  height: 100vh;
`;

const HomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
`;

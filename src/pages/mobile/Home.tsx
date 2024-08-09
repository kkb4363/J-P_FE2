import styled from "styled-components";
import CustomInput from "../../components/mobile/CustomInput";
import BellIcon from "../../icons/BellIcon";

export default function Home() {
  return (
    <>
      <HomeHeader>
        <div>Logo</div>
        <BellIcon />
      </HomeHeader>

      <CustomInput text="여행지를 입력해주세요" />

      <HomeBody></HomeBody>
    </>
  );
}

const HomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
`;

const HomeBody = styled.div`
  flex: 1;
  background-color: tan;
`;

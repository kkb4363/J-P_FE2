import styled from "styled-components";
import testImg from "../../../assets/images/testImg.png";
import PencilIcon from "../../../assets/icons/PencilIcon";
import { Outlet, useNavigate } from "react-router-dom";
import { webMypageTabs } from "../../../utils/staticDatas";
import Container from './../../../components/web/Container';

export default function MypageLayout() {
  const navigate = useNavigate();
  return (
    <Container>
      <h1>마이페이지</h1>

      <ProfileBox>
        <img src={testImg} alt="프로필이미지" />
        <ProfileTextCol>
          <p>닉네임</p>
          <span>
            <PencilIcon />
            프로필 수정
          </span>
        </ProfileTextCol>
      </ProfileBox>

      <TabRow>
        {webMypageTabs.map((tab) => (
          <Tab key={tab.route} onClick={() => navigate(tab.route)}>
            <tab.icon width="24" height="24" stroke="#1a1a1a" />
            <span>{tab.label}</span>
          </Tab>
        ))}
      </TabRow>

      <OutletBox>
        <Outlet />
      </OutletBox>
    </Container>
  );
}

const ProfileBox = styled.div`
  margin-top: 61px;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  & > img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
`;

const ProfileTextCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
  }

  & > span {
    display: flex;
    align-items: center;
    gap: 5px;
    color: ${(props) => props.theme.color.gray700};
    font-size: 14px;
    cursor: pointer;
  }
`;

const TabRow = styled.div`
  margin-top: 91px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 61px;
  padding-bottom: 49px;
  border-bottom: 1px solid ${(props) => props.theme.color.gray200};
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
  }
`;

const OutletBox = styled.div`
  margin-top: 45px;
`;

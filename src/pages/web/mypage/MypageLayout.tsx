import styled from "styled-components";
import PencilIcon from "../../../assets/icons/PencilIcon";
import { Outlet, useNavigate } from "react-router-dom";
import { webMypageTabs } from "../../../utils/staticDatas";
import Container from "./../../../components/web/Container";
import { useEffect } from "react";
import { getMyProfile } from "../../../utils/axios";
import ProfileNoImg from "../../../components/ProfileNoImg";
import { UserType, useUserStore } from "../../../store/user.store";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export default function MypageLayout() {
  const userStore = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    getMyProfile().then((res) => {
      userStore.setUserName(res?.data.nickname);
      userStore.setUserType(res?.data.mbti as UserType);
      userStore.setUserProfile(res?.data.profile);
    });
  }, []);

  return (
    <Container>
      <h1>마이페이지</h1>

      <ProfileBox>
        {!!userStore.getUserProfile() ? (
          <img src={userStore.getUserProfile()} alt="프로필이미지" />
        ) : (
          <ProfileNoImg width="100px" height="100px" />
        )}

        <ProfileTextCol>
          <p>
            {!!cookies.get("userToken")
              ? userStore.getUserName()
              : "로그인이 필요합니다"}
          </p>
          {!!cookies.get("userToken") && (
            <span onClick={() => navigate("/home/edit")}>
              <PencilIcon />
              프로필 수정
            </span>
          )}
        </ProfileTextCol>
      </ProfileBox>

      {!!cookies.get("userToken") && (
        <>
          <TabRow>
            {webMypageTabs.map((tab) => {
              const isActive = location.pathname.split("/")[3] === tab.route;
              return (
                <Tab
                  $isActive={isActive}
                  key={tab.route}
                  onClick={() => navigate(tab.route)}
                >
                  <tab.icon
                    width="24"
                    height="24"
                    stroke={isActive ? "#1a1a1a" : "#999"}
                  />
                  <span>{tab.label}</span>
                </Tab>
              );
            })}
          </TabRow>

          <OutletBox>
            <Outlet />
          </OutletBox>
        </>
      )}
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
    user-select: none;
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
  padding-bottom: 16px;
  border-bottom: 1px solid ${(props) => props.theme.color.gray200};
`;

const Tab = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding-bottom: 16px;
  border-bottom: 1px solid
    ${(props) => (props.$isActive ? props.theme.color.main : "none")};
  margin-bottom: -16px;

  & > span {
    color: ${(props) =>
      props.$isActive ? props.theme.color.gray900 : props.theme.color.gray400};
    font-size: 16px;
    font-weight: 700;
  }
`;

const OutletBox = styled.div`
  margin-top: 24px;
`;

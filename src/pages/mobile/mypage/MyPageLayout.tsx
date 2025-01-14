import styled from "styled-components";
import BellIcon from "../../../assets/icons/BellIcon";
import CustomHeader from "../../../components/mobile/CustomHeader";
import PenIcon from "../../../assets/icons/PenIcon";
import { mypageTabs } from "../../../utils/staticDatas";
import { useEffect, useState } from "react";
import { scrollHidden } from "../../../assets/styles/home.style";
import { Outlet, useNavigate } from "react-router-dom";
import { UserType, useUserStore } from "../../../store/user.store";
import { Cookies } from "react-cookie";
import ProfileNoImg from "../../../components/ProfileNoImg";
import { getMyProfile } from "../../../service/axios";
import SettingIcon from "../../../assets/icons/SettingIcon";

const cookies = new Cookies();

export default function MyPageLayout() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const [currentTab, setCurrentTab] = useState("");

  const getTabSvgColor = ($isActive: boolean) => {
    return $isActive ? "#1a1a1a" : "#999999";
  };

  const handleCurrentTab = (tab: string) => {
    setCurrentTab(tab);
    navigate(tab);
  };

  useEffect(() => {
    getMyProfile().then((res) => {
      userStore.setUserName(res?.data.nickname);
      userStore.setUserType(res?.data.mbti as UserType);
      userStore.setUserProfile(res?.data.profile);
    });
  }, []);

  return (
    <>
      <CustomHeader hidePrevIcon={true} title="마이페이지">
        <SettingRow>
          <div>
            <BellIcon />
          </div>
          <div onClick={() => navigate("/home/setting")}>
            <SettingIcon />
          </div>
        </SettingRow>
      </CustomHeader>

      <MyPageHeader>
        {!!userStore.getUserProfile() ? (
          <img src={userStore.getUserProfile()} alt="프로필이미지" />
        ) : (
          <ProfileNoImg width="80px" height="80px" />
        )}
        {!!cookies.get("userToken") ? (
          <div>
            <p>{userStore.getUserName()}</p>
            <span onClick={() => navigate("/home/editProfile")}>
              <PenIcon />
              프로필 수정
            </span>
          </div>
        ) : (
          <span>로그인이 필요합니다.</span>
        )}
      </MyPageHeader>

      {!!cookies.get("userToken") && (
        <>
          <MypageTabRow>
            {mypageTabs.map((tab) => (
              <MypageTab
                $isActive={currentTab === tab.route}
                key={tab.label}
                onClick={() => handleCurrentTab(tab.route)}
              >
                <tab.icon
                  width="18"
                  height="18"
                  stroke={getTabSvgColor(currentTab === tab.route)}
                />
                내 {tab.label}
              </MypageTab>
            ))}
          </MypageTabRow>

          <MypageOutletBox>
            <Outlet />
          </MypageOutletBox>
        </>
      )}
    </>
  );
}

const SettingRow = styled.aside`
  display: flex;
  align-items: center;
`;

const MyPageHeader = styled.header`
  min-height: 140px;
  display: flex;
  gap: 20px;
  padding: 0 0 0 16px;
  align-items: center;

  & > img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 700;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;

    & > p {
      font-size: 16px;
      font-weight: 700;
      color: ${(props) => props.theme.color.gray900};
    }

    & > span {
      display: flex;
      gap: 5px;
      font-size: 14px;
      font-weight: 400;
      color: ${(props) => props.theme.color.gray700};
    }
  }
`;

const MypageTabRow = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MypageTab = styled.article<{ $isActive: boolean }>`
  min-height: 35px;
  height: 35px;
  color: ${(props) =>
    props.$isActive ? props.theme.color.gray900 : props.theme.color.gray400};
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  height: 100%;
  flex: 1;

  padding-bottom: 16px;
  border-bottom: 1px solid
    ${(props) =>
      props.$isActive ? props.theme.color.main : props.theme.color.gray200};
`;

const MypageOutletBox = styled.main`
  height: calc(100% - 60px - 140px - 35px);
  overflow: auto;
  ${scrollHidden};
  padding: 16px;
`;

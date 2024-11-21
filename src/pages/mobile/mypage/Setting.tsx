import styled from "styled-components";
import CustomHeader from "../../../components/mobile/CustomHeader";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import { Cookies, useCookies } from "react-cookie";
import { useUserStore } from "../../../store/user.store";
import { useNavigate } from "react-router-dom";

export default function Setting() {
  const cookies = new Cookies();
  const [, , removeCookie] = useCookies();
  const userStore = useUserStore();
  const navigate = useNavigate();

  const handleLoginOut = () => {
    if (!!cookies.get("userToken")) {
      removeCookie("userToken", { path: "/" });
      userStore.setUserName("");
      userStore.setUserProfile("");
      navigate("/");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <CustomHeader title="설정" />

      <SettingSection>
        <SettingCol>
          <li onClick={handleLoginOut}>
            <LogoutIcon />
            {!!cookies.get("userToken") ? "로그아웃" : "로그인"}
          </li>
        </SettingCol>
      </SettingSection>
    </>
  );
}

const SettingSection = styled.section`
  padding: 0 29px;
`;

const SettingCol = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 38px;

  & > li {
    display: flex;
    align-items: center;
    gap: 8px;

    color: ${(props) => props.theme.color.gray800};
    font-size: 14px;
    font-weight: 700;
  }
`;

import CustomHeader from "../../../components/mobile/CustomHeader";
import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MapIcon from "../../../assets/icons/MapIcon";
import ListIcon from "../../../assets/icons/ListIcon";

export default function AddPlaceLayout() {
  const param = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <CustomHeader title="장소 추가">
        {param.pathname.includes("map") ? (
          <ListIcon handleClick={() => navigate(-1)} />
        ) : (
          <MapIcon handleClick={() => navigate("map")} />
        )}
      </CustomHeader>

      <Body>
        <Outlet />
      </Body>
    </>
  );
}

const Body = styled.div`
  height: calc(100dvh - 50px - 20px);
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

export const NextButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;

  & > button {
    width: 190px;
    height: 45px;
    border-radius: 16px;
    border: 1px solid ${(props) => props.theme.color.secondary};
    background-color: ${(props) => props.theme.color.secondary};
    color: ${(props) => props.theme.color.white};
    font-size: 14px;
    font-weight: 700;
  }
`;

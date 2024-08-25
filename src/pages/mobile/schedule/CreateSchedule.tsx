import CustomHeader from "../../../components/mobile/CustomHeader";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

export default function CreateSchedule() {
  return (
    <>
      <CustomHeader title="일정"></CustomHeader>

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

import CustomHeader from "../../../components/mobile/CustomHeader";
import styled from "styled-components";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useState } from "react";

type JPType = "J" | "P";

export default function ScheduleLayout() {
  const param = useLocation();
  const [jpState, setJpState] = useState<JPType>("J");

  return (
    <>
      <CustomHeader title="일정">
        {param.pathname.includes("details") && (
          <JPToggle>
            <J onClick={() => setJpState("P")} $isActive={jpState === "J"}>
              <span>J</span>
            </J>
            <div />
            <P onClick={() => setJpState("J")} $isActive={jpState === "P"}>
              <span>P</span>
            </P>
          </JPToggle>
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

const JPToggle = styled.div`
  width: 48px;
  height: 30px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: 0px 4px 4px 0px rgba(50, 50, 71, 0.08),
    0px 4px 8px 0px rgba(50, 50, 71, 0.06);

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const J = styled.div<{ $isActive: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.main};
  justify-content: center;
  align-items: center;
  display: ${({ $isActive }) => ($isActive ? "flex" : "none")};

  & > span {
    color: ${(props) => props.theme.color.white};
    font-size: 12px;
    font-weight: 700;
  }
`;

const P = styled(J)`
  background-color: ${(props) => props.theme.color.secondary};
`;

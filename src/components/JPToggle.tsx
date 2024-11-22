import styled from "styled-components";
import { useJPStore } from "../store/JPType.store";

export default function JPToggle() {
  const { jpState, setJpState } = useJPStore();

  const handleJPState = () => {
    if (jpState === "J") {
      setJpState("P");
    } else {
      setJpState("J");
    }
  };

  return (
    <JPToggleContainer onClick={handleJPState}>
      <J $isActive={jpState === "J"}>
        <span>J</span>
      </J>
      <div />
      <P $isActive={jpState === "P"}>
        <span>P</span>
      </P>
    </JPToggleContainer>
  );
}

const JPToggleContainer = styled.div`
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
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.main};
  place-content: center;
  display: ${({ $isActive }) => ($isActive ? "grid" : "none")};

  & > span {
    margin-top: 1px;
    color: ${(props) => props.theme.color.white};
    font-size: 12px;
    font-weight: 700;
    user-select: none;
  }

  cursor: pointer;
`;

const P = styled(J)`
  background-color: ${(props) => props.theme.color.secondary};
`;

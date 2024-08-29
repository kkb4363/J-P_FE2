import styled from "styled-components";
import CalendarCheckIcon from "../../../assets/icons/CalendarCheckIcon";

export default function Travel() {
  return (
    <>
      <TravelHeader>
        <span>목록</span>
      </TravelHeader>

      <TravelList>
        <p>2024년</p>
        <TravelCard>
          <span>제주</span>
          <div>
            <CalendarCheckIcon />
            <span>12.29 ~ 12.23</span>
          </div>
          <span>공개</span>
        </TravelCard>
        <TravelCard>
          <span>제주</span>
          <div>
            <CalendarCheckIcon />
            <span>12.29 ~ 12.23</span>
          </div>
          <span>공개</span>
        </TravelCard>
      </TravelList>

      <TravelList>
        <p>2023년</p>
        <TravelCard>
          <span>제주</span>
          <div>
            <CalendarCheckIcon />
            <span>12.29 ~ 12.23</span>
          </div>
          <span>공개</span>
        </TravelCard>
      </TravelList>
    </>
  );
}

export const TravelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;

  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: 20px;
    font-weight: 700;
  }
`;

const TravelList = styled.div`
  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 700;
    padding: 16px 0 6px 0;
  }

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TravelCard = styled.div`
  min-height: 60px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  display: flex;
  align-items: center;

  & > span {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > span:last-child {
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 3;

    & > span {
      color: ${(props) => props.theme.color.gray700};
      font-size: 14px;
      font-weight: 400;
    }
  }
`;

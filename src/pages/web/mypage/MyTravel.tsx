import styled from "styled-components";
import { MyPageTitle } from "./MyReviews";
import MyTravelCard from "../../../components/web/mypage/MyTravelCard";
import { useEffect } from "react";
import { getMySchedules } from "../../../utils/axios";

export default function MyTravel() {
  useEffect(() => {
    getMySchedules().then((res) => console.log(res));
  }, []);

  return (
    <div>
      <MypageTitleWithButton>목록</MypageTitleWithButton>

      <TitleWithTravelBox>
        <p>2024년</p>
        <div>
          <MyTravelCard />
          <MyTravelCard />
        </div>
      </TitleWithTravelBox>

      <TitleWithTravelBox>
        <p>2024년</p>
        <div>
          <MyTravelCard />
        </div>
      </TitleWithTravelBox>
    </div>
  );
}

export const MypageTitleWithButton = styled(MyPageTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 42px;

  & > div {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;

    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;

    & > div:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      border: 2px solid ${(props) => props.theme.color.gray900};
    }
  }
`;

const TitleWithTravelBox = styled.div`
  margin-top: 30px;
  width: 650px;

  & > div {
    display: flex;
    gap: 16px;
  }

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
  }
`;

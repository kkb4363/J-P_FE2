import styled from "styled-components";
import { MyPageTitle } from "./MyReviews";

export default function MyTravel() {
  return (
    <div>
      <MypageTitleWithButton>목록</MypageTitleWithButton>

      <TitleWithTravelBox>
        <p>2024년</p>
        <div>
          <TravelBox>
            <div>
              <p>제주</p>
              <span>03.21 ~ 03.24 | 3박4일 여행</span>
            </div>

            <div>수정</div>
          </TravelBox>
          <TravelBox>
            <div>
              <p>제주</p>
              <span>03.21 ~ 03.24 | 3박4일 여행</span>
            </div>

            <div>수정</div>
          </TravelBox>
        </div>
      </TitleWithTravelBox>

      <TitleWithTravelBox>
        <p>2024년</p>
        <div>
          <TravelBox>
            <div>
              <p>제주</p>
              <span>03.21 ~ 03.24 | 3박4일 여행</span>
            </div>

            <div>수정</div>
          </TravelBox>
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

const TravelBox = styled.div`
  display: flex;
  height: 94px;
  width: 313px;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 30px;

    & > p {
      color: ${(props) => props.theme.color.gray900};
      font-size: 14px;
      font-weight: 700;
    }

    & > span {
      color: ${(props) => props.theme.color.gray900};
      font-size: 14px;
      font-weight: 400;
    }
  }

  & > div:last-child {
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
    cursor: pointer;
  }
`;

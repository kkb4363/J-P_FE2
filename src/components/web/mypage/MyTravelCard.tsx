import styled from "styled-components";

export default function MyTravelCard() {
  return (
    <MyTravelCardContainer>
      <div>
        <p>제주</p>
        <span>03.21 ~ 03.24 | 3박4일 여행</span>
      </div>

      <div>수정</div>
    </MyTravelCardContainer>
  );
}

const MyTravelCardContainer = styled.div`
  display: flex;
  height: 94px;
  width: 313px;
  min-height: 94px;
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

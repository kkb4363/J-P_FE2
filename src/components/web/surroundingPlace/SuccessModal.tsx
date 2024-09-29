import styled from "styled-components";
import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";

export default function SuccessModal() {
  return (
    <SuccessModalContainer>
      <h1>일정에 추가 되었습니다.</h1>
      <div>
        <span>내 일정 보기</span>
        <ArrowRightIcon stroke="#6979f8" />
      </div>
    </SuccessModalContainer>
  );
}

const SuccessModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  & > h1 {
    color: ${(props) => props.theme.color.gray900};
    font-size: 24px;
    font-weight: 700;
  }

  & > div {
    display: flex;
    gap: 3px;
    align-items: center;
    cursor: pointer;

    & > span {
      color: ${(props) => props.theme.color.secondary};
      font-size: 20px;
      font-weight: 700;
    }
  }
`;

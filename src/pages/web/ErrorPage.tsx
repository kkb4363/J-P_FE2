import styled from "styled-components";
import ErrorIcon from "../../assets/icons/ErrorIcon";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <ErrorPageContainer>
      <ErrorIcon />
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>
        찾으려는 페이지 주소가 잘못 입력되었거나 주소 변경 또는 삭제로 사용하실
        수 없습니다.
      </p>
      <button onClick={() => navigate("/home")}>
        <span>홈으로 가기</span>
      </button>
    </ErrorPageContainer>
  );
}

const ErrorPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h1 {
    margin: 58px 0 16px 0;
    color: ${(props) => props.theme.color.gray900};
    font-size: 32px;
    font-weight: 700;
  }

  & > p {
    color: ${(props) => props.theme.color.gray500};
    font-size: 20px;
    font-weight: 700;
  }

  & > button {
    margin-top: 90px;
    display: flex;
    height: 44px;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 2px;
    border-radius: 30px;
    border: 1px solid ${(props) => props.theme.color.gray700};
    background: ${(props) => props.theme.color.white};

    & > span {
      color: ${(props) => props.theme.color.gray700};
      font-size: 14px;
      font-weight: 700;
    }
  }
`;

import styled from "styled-components";
import { TravelHeader } from "./Travel";
import EditIcon from "../../../assets/icons/EditIcon";
import testImg from "../../../assets/images/testImg1.png";

export default function TravelLog() {
  return (
    <>
      <TravelLogHeader>
        <span>목록</span>

        <div>
          <EditIcon />
          <span>작성하기</span>
        </div>
      </TravelLogHeader>

      <TravelLogGridBox>
        <TravelLogCard>
          <p>제주</p>
          <span>3.21 ~ 3.24</span>
          <div>공개</div>
        </TravelLogCard>
        <TravelLogCard>
          <p>제주</p>
          <span>3.21 ~ 3.24</span>
          <div>공개</div>
        </TravelLogCard>
        <TravelLogCard>
          <p>제주</p>
          <span>3.21 ~ 3.24</span>
          <div>공개</div>
        </TravelLogCard>
      </TravelLogGridBox>
    </>
  );
}

const TravelLogHeader = styled(TravelHeader)`
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    & > span {
      color: ${(props) => props.theme.color.gray900};
      font-size: 14px;
      font-weight: 700;
    }
  }
`;

const TravelLogGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  padding: 8px 0;
  gap: 16px;
`;

const TravelLogCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  position: relative;
  width: 100%;
  min-width: 150px;
  min-height: 130px;
  border-radius: 16px;

  gap: 12px;
  background: no-repeat center url(${testImg});
  background-size: cover;

  & > p {
    color: ${(props) => props.theme.color.white};
    font-size: 16px;
    font-weight: 700;
  }

  & > span {
    color: ${(props) => props.theme.color.white};
    font-size: 14px;
    font-weight: 600;
  }

  & > div {
    position: absolute;
    right: 6px;
    top: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 30px;

    color: ${(props) => props.theme.color.gray900};
    font-size: 10px;
    font-weight: 500;
    padding: 4px 8px;
  }
`;

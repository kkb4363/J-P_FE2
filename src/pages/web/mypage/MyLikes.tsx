import styled from "styled-components";
import { MyPageTitle } from "./MyReviews";
import testImg from "../../../assets/images/testImg.png";

export default function MyLikes() {
  return (
    <div>
      <MyPageTitle>내 찜 목록</MyPageTitle>
      <TabRow>
        <Tab $isActive={true}>전체</Tab>
        <Tab $isActive={false}>여행지</Tab>
        <Tab $isActive={false}>도시</Tab>
      </TabRow>

      <ImgGridBox>
        <ImgBox>
          <img src={testImg} alt="like" />
          <div>
            <p>양평 두물머리</p>
            <span>경기 양평</span>
          </div>
        </ImgBox>
        <ImgBox>
          <img src={testImg} alt="like" />
          <div>
            <p>양평 두물머리</p>
            <span>경기 양평</span>
          </div>
        </ImgBox>
        <ImgBox>
          <img src={testImg} alt="like" />
          <div>
            <p>양평 두물머리</p>
            <span>경기 양평</span>
          </div>
        </ImgBox>
      </ImgGridBox>
    </div>
  );
}

const TabRow = styled.div`
  margin: 24px 0 24px 0;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Tab = styled.div<{ $isActive: boolean }>`
  color: ${(props) =>
    props.$isActive ? props.theme.color.gray900 : props.theme.color.gray500};
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;

const ImgGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const ImgBox = styled.div`
  width: 164px;
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 13px;

  & > img {
    width: 100%;
    height: 130px;
    border-radius: 16px;
    object-fit: cover;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 4px;

    & > p {
      color: ${(props) => props.theme.color.gray900};
      font-size: 14px;
      font-weight: 700;
    }

    & > span {
      color: ${(props) => props.theme.color.gray600};
      font-size: 12px;
      font-weight: 700;
    }
  }
`;

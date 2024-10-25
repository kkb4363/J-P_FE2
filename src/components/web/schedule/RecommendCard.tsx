import testImg from "../../../assets/images/testImg3.png";
import styled from "styled-components";
import CustomProfile from "../../CustomProfile";

export default function RecommendCard() {
  return (
    <RecommendCardContainer>
      <img src={testImg} alt="이미지없음" />
      <RecommendCardTextCol>
        <CustomProfile
          src={testImg}
          fontSize="14px"
          nickname="Minah"
          content="1박 2일"
        />
        <p>남해로 힐링 여행 떠나기</p>
        <RecommendCardTagRow>
          <span>#한려해상국립공원</span>
          <span>#바람흔적미술관</span>
        </RecommendCardTagRow>
      </RecommendCardTextCol>
    </RecommendCardContainer>
  );
}

const RecommendCardContainer = styled.div`
  width: 250px;
  height: 237px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};

  & > img {
    width: 218px;
    height: 108px;
    border-radius: 16px;
    object-fit: cover;
  }
`;

const RecommendCardTextCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 108px;

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
  }
`;

const RecommendCardTagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > span {
    color: ${(props) => props.theme.color.secondary};
    font-size: 14px;
  }
`;

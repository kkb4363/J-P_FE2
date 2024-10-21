import { useEffect, useState } from "react";
import styled from "styled-components";
import testImg from "../../../assets/images/testImg3.png";
import LikeCommentBox from "../../../components/LikeCommentBox";
import CustomProfile from "../../../components/mobile/CustomProfile";
import { getMyReviews } from "../../../utils/axios";
import { TravelHeader } from "./Travel";

export default function Review() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMyReviews().then((res) => {
      setReviews(res?.data.data);
    });
  }, []);

  return (
    <>
      <TravelHeader>
        <span>내 작성 리뷰 2</span>
      </TravelHeader>

      <ReviewCardCol>
        <ReviewCard>
          <ProfileBox>
            <CustomProfile
              src={testImg}
              fontSize="12px"
              nickname="arami10"
              content="24.3.26"
            />
            <span>수정</span>
          </ProfileBox>

          <TextBox>
            전주 한옥마을, 벽화마을, 남부시장 먹방 여행오랜만에 한옥마을에서
            힐링하고 갑니다~ 조용하고 혼자 편안히 휴식을 취하기 아주 좋은
            곳이에요
          </TextBox>

          <LikeCommentBox likeCnt={6} commentCnt={2} />
        </ReviewCard>
        <ReviewCard>
          <ProfileBox>
            <CustomProfile
              src={testImg}
              fontSize="12px"
              nickname="arami10"
              content="24.3.26"
            />
            <span>수정</span>
          </ProfileBox>

          <TextBox>
            전주 한옥마을, 벽화마을, 남부시장 먹방 여행오랜만에 한옥마을에서
            힐링하고 갑니다~ 조용하고 혼자 편안히 휴식을 취하기 아주 좋은
            곳이에요
          </TextBox>

          <LikeCommentBox likeCnt={6} commentCnt={2} />
        </ReviewCard>
      </ReviewCardCol>
    </>
  );
}

const ReviewCardCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 24px;
`;

const ReviewCard = styled.div`
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;

  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};
  overflow: hidden;
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span {
    color: ${(props) => props.theme.color.gray500};
    font-size: 12px;
    font-weight: 400;
  }
`;

const TextBox = styled.div`
  height: 28px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  color: ${(props) => props.theme.color.gray900};
  font-size: 14px;
  font-weight: 400;
`;

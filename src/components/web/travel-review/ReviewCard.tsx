import styled from "styled-components";
import { ReviewProps } from "../../../types/travelreview";
import CustomProfile from "../../CustomProfile";
import MarkIcon from "../../../assets/icons/MarkIcon";
import StarIcon from "../../../assets/icons/StarIcon";
import { useNavigate } from "react-router-dom";
import TwoImageBox from "./TwoImageBox";
import LikeCommentBox from "../../LikeCommentBox";
import IconBox from "../../IconBox";

interface Props {
  item: ReviewProps;
}

export default function ReviewCard({ item }: Props) {
  const navigate = useNavigate();
  return (
    <ReviewCardContainer onClick={() => navigate(`/home/review/${item.id}`)}>
      <ReviewHeader>
        <ReviewPlaceBox>
          <MarkIcon stroke="#6979F8" width="18" height="18" />
          <span>{item.subject}</span>
        </ReviewPlaceBox>
        <IconBox>
          <StarIcon />
          <span>{item.star}</span>
        </IconBox>
      </ReviewHeader>
      <ReviewBody>
        <CustomProfile
          src={item.userCompactResDto.profile}
          nickname={item.userCompactResDto.nickname}
          content="24.2.3"
        />
        <ContentText>{item.content}</ContentText>
      </ReviewBody>
      <TwoImageBox images={item.fileInfos} />
      <LikeCommentBox
        fillLike={item.isLiked}
        likeCnt={item.likeCnt}
        commentCnt={item.commentCnt}
      />
    </ReviewCardContainer>
  );
}

const ReviewCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 46px;
  gap: 16px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};
  cursor: pointer;
  min-width: 786px;
  min-height: 362px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReviewPlaceBox = styled.div`
  width: fit-content;
  display: flex;
  gap: 2px;
  align-items: center;
  padding: 4px 10px;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.gray700};
  border-radius: 16px;

  & > span {
    font-size: 14px;
    color: ${(props) => props.theme.color.gray700};
    white-space: nowrap;
  }
`;

const ReviewBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContentText = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 140%;
  word-wrap: break-word;
`;

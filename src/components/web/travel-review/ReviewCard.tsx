import styled from "styled-components";
import { reviewApiProps } from "../../../types/home";
import { testImageList } from "../../../utils/staticDatas";
import {
  IconBox,
  LikeCommentBox,
} from "../../../assets/styles/travelReview.style";
import CustomProfile from "../../mobile/CustomProfile";
import ImageView from "../ImageView";
import MarkIcon from "../../../assets/icons/MarkIcon";
import StarIcon from "../../../assets/icons/StarIcon";
import LikeIcon from "../../../assets/icons/LikeIcon";
import CommentIcon from "../../../assets/icons/CommentIcon";

interface Props {
  item: reviewApiProps;
}

export default function ReviewCard({ item }: Props) {
  return (
    <ReviewCardContainer>
      <ReviewHeader>
        <ReviewPlaceBox>
          <MarkIcon stroke="#6979F8" width="18" height="18" />
          <span>오대산 선재길</span>
        </ReviewPlaceBox>
        <IconBox>
          <StarIcon />
          <span>{item.star}</span>
        </IconBox>
      </ReviewHeader>
      <ReviewBody>
        <CustomProfile
          src="/src/assets/images/testImg.png"
          nickname={item.userCompactResDto.nickname}
          content="24.2.3"
        />
        <ContentText>{item.content}</ContentText>
        <MoreText>더보기</MoreText>
      </ReviewBody>
      <ReviewImageBox>
        {testImageList.slice(0, 2).map((url, i) => (
          <ImageWrapper key={i}>
            <ImageView src={url} alt="review img" width="100%" height="191px" />
            {i === 1 && (
              <ImageOverlay>
                <span>{`+ ${testImageList.length - 1}`}</span>
              </ImageOverlay>
            )}
          </ImageWrapper>
        ))}
      </ReviewImageBox>
      <LikeCommentBox>
        <IconBox>
          <LikeIcon />
          <span>{item.likeCnt}</span>
        </IconBox>
        <IconBox>
          <CommentIcon stroke="#808080" />
          <span>{item.commentCnt}</span>
        </IconBox>
      </LikeCommentBox>
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

const MoreText = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.color.gray300};
  cursor: pointer;
`;

const ReviewImageBox = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  border-radius: 16px;

  display: grid;
  place-items: center;
  & > span {
    font-weight: 700;
    font-size: 12px;
    color: ${(props) => props.theme.color.white};
  }
`;

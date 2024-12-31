import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as R from "../../../assets/styles/travelReview.style";
import { TravelogProps } from "../../../types/travelreview";
import { formatDayNights } from "../../../utils/dayNights";
import { testLogTags } from "../../../utils/staticDatas";
import CustomProfile from "../../CustomProfile";
import HashtagsBox from "../../HashtagsBox";
import ImageView from "../../ImageView";
import LikeCommentBox from "../../LikeCommentBox";

interface Props {
  item: TravelogProps;
  divRef?: (node: HTMLDivElement) => void;
}

export default function TravelogueCard({ item, divRef }: Props) {
  const navigate = useNavigate();
  const { nights, days } = formatDayNights(
    item.scheduleStartDate,
    item.scheduleEndDate
  );

  return (
    <TravelogueCardContainer ref={divRef}>
      <R.ProfileHeader>
        <CustomProfile
          src={item.userCompactResDto.profile}
          nickname={item.userCompactResDto.nickname}
          content={`${nights}박 ${days}일 여행`}
        />
      </R.ProfileHeader>
      <HashtagsBox hashTags={testLogTags} />
      <TravelogueTitleBox>
        <p>{item.subject}</p>
        <span onClick={() => navigate(`/home/travelogue/${item.id}`)}>
          자세히보기
        </span>
      </TravelogueTitleBox>
      <ImageView
        src={item.fileInfos?.[0]?.fileUrl}
        alt="Travelogue"
        width="100%"
        height="191px"
        bottomText={
          item.fileInfos.length > 1
            ? `+${item.fileInfos.length - 1}`
            : undefined
        }
      />
      <LikeCommentBox
        fillLike={item.isLiked}
        likeCnt={item.likeCnt}
        commentCnt={item.commentCnt}
      />
    </TravelogueCardContainer>
  );
}

const TravelogueCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0;
  position: relative;

  &:first-child {
    padding: 0 0 16px;
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.color.gray200};
  }
`;

const TravelogueTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 28.5px;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 700;
  }

  & > span {
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
    line-height: 120%;
  }
`;

import styled from "styled-components";
import ImageView from "../ImageView";
import CustomProfile from "../../CustomProfile";
import LikeIcon from "../../../assets/icons/LikeIcon";
import CommentIcon from "../../../assets/icons/CommentIcon";
import { TravelogProps } from "../../../types/travelreview";
import { useNavigate } from "react-router-dom";

interface Props {
  item: TravelogProps;
}

export default function TripCard({ item }: Props) {
  const navigate = useNavigate();

  return (
    <TripCardContainer onClick={() => navigate(`/home/travelogue/${item?.id}`)}>
      <ImageView
        width="110px"
        height="100px"
        src={item?.fileInfos[0]?.fileUrl}
        alt="trip-img"
      />

      <TripCardInfoCol>
        <TagRow>
          <div>#산책</div>
          <div>#도보여행</div>
        </TagRow>

        <p>{item?.subject}</p>

        <UserRow>
          <CustomProfile
            src={item?.fileInfos?.[0]?.fileUrl}
            nickname={item?.userCompactResDto?.nickname}
          />

          <HeartCommentRow>
            <li>
              <LikeIcon
                stroke={item?.isLiked ? "#FFC814" : "#808080"}
                fill={item?.isLiked ? "#ffc814" : "none"}
              />
              {item?.likeCnt}
            </li>
            <li>
              <CommentIcon />
              {item?.commentCnt}
            </li>
          </HeartCommentRow>
        </UserRow>
      </TripCardInfoCol>
    </TripCardContainer>
  );
}

const TripCardContainer = styled.aside`
  width: 390px;
  height: 134px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};
  padding: 17px;

  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const TripCardInfoCol = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
  }
`;

const TagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  & > div {
    padding: 3px 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 16px;
    border: 1px solid ${(props) => props.theme.color.gray700};
    background-color: ${(props) => props.theme.color.white};

    color: ${(props) => props.theme.color.gray700};
    font-size: 12px;
  }
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeartCommentRow = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;

  & > li {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.gray300};
    gap: 3px;
  }
`;

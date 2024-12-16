import styled from "styled-components";
import CustomProfile from "../../CustomProfile";
import { TravelogProps } from "../../../types/travelreview";
import { formatDayNights } from "../../../utils/dayNights";
import { useNavigate } from "react-router-dom";

interface Props {
  data: TravelogProps;
}

export default function RecommendCard({ data }: Props) {
  const navigate = useNavigate();

  const travelInfo = formatDayNights(
    data?.scheduleStartDate,
    data?.scheduleEndDate
  );

  return (
    <RecommendCardContainer
      onClick={() => navigate(`/home/travelogue/${data?.id}`)}
    >
      <img src={data?.fileInfos[0]?.fileUrl} alt="recommended-travelogue" />
      <RecommendCardTextCol>
        <CustomProfile
          src={data?.userCompactResDto?.profile}
          fontSize="14px"
          nickname={data?.userCompactResDto?.nickname}
          content={`${travelInfo.nights}박 ${travelInfo.days}일`}
        />
        <p>{data?.subject}</p>
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
  cursor: pointer;
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

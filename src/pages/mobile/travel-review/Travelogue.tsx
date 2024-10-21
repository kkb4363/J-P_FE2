import styled from "styled-components";
import TravelogueCard from "../../../components/mobile/travelReview/TravelogueCard";

interface Props {
  sort: string;
}

export default function Travelogue({ sort }: Props) {
  // [TODO]: api 연동 후 데이터 가져와서 연결

  return (
    <TravelogueContainer>
      <TravelogueCard />
      <TravelogueCard />
      <TravelogueCard />
      <TravelogueCard />
    </TravelogueContainer>
  );
}

const TravelogueContainer = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  padding: 0 16px;
  margin: 16px 0 6px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  white-space: nowrap;
`;

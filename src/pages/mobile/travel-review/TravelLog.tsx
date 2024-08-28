import styled from "styled-components";
import TravelLogCard from "../../../components/mobile/TravelLogCard";

interface Props {
  sort: string;
}

export default function TravelLog({ sort }: Props) {
  // [TODO]: api 연동 후 데이터 가져와서 연결

  return (
    <TravelLogContainer>
      <TravelLogCard />
      <TravelLogCard />
      <TravelLogCard />
      <TravelLogCard />
    </TravelLogContainer>
  );
}

const TravelLogContainer = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  padding: 0 16px;
  margin: 16px 0 6px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  white-space: nowrap;
`;

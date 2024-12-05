import styled from "styled-components";
import TravelogueCard from "../../../components/mobile/travelReview/TravelogueCard";
import { ReviewProps } from "../../../types/travelreview";

interface Props {
  sort: string;
}

export default function Travelogue({ sort }: Props) {
    const [data, setData] = useState<ReviewProps[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    const requestApi = async () => {
      setLoading(true);

      await getReviews({ page, sort }).then((res) => {
        setData(res?.data.data);
        setHasMore(res?.data.data.length > 0);
        setLoading(false);
      });
  };

  useEffect(() => { 

  })



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

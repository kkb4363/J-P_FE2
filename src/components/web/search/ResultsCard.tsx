import styled from "styled-components";
import StarIcon from "../../../assets/icons/StarIcon";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../../store/modal.store";
import { SearchPlaceProps } from "../../../types/search";

interface Props {
  data: SearchPlaceProps;
}

export default function ResultsCard({ data }: Props) {
  const navigate = useNavigate();
  const { setCurrentModal } = useModalStore();

  const handleClick = (id: string) => {
    setCurrentModal("");
    navigate(`/home/details/${id}`);
  };

  return (
    <ResultsCardContainer onClick={() => handleClick(data?.placeId)}>
      <img src={data.photoUrl} alt="result" />

      <div>
        <p>{data.name}</p>
        <span>
          <StarIcon />
          {data.rating}
        </span>
      </div>

      <p>{data.subName}</p>
    </ResultsCardContainer>
  );
}

const ResultsCardContainer = styled.div`
  width: 224px;
  height: 190px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};
  cursor: pointer;
  & > img {
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    width: 100%;
    height: 50%;
    object-fit: cover;
  }

  & > div {
    padding: 16px 16px 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > p {
      color: ${(props) => props.theme.color.gray900};
      font-size: 16px;
      font-weight: 700;
    }

    & > span {
      display: flex;
      align-items: center;
      gap: 2px;
      color: ${(props) => props.theme.color.gray500};
      font-size: 12px;
    }
  }

  & > p {
    padding-top: 12px;
    color: ${(props) => props.theme.color.gray700};
    font-size: 14px;
    padding-left: 16px;
  }
`;

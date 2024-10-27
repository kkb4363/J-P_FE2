import styled from "styled-components";
import testImg from "../../../assets/images/testImg1.png";
import StarIcon from "../../../assets/icons/StarIcon";

interface Props {
  name: string;
  rating: number;
  subName: string;
}

export default function ResultsCard({ name, rating, subName }: Props) {
  return (
    <ResultsCardContainer>
      <img src={testImg} alt="result" />

      <div>
        <p>{name}</p>
        <span>
          <StarIcon />
          {rating}
        </span>
      </div>

      <p>{subName}</p>
    </ResultsCardContainer>
  );
}

const ResultsCardContainer = styled.div`
  width: 224px;
  height: 190px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};

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

import { useEffect, useState } from "react";
import styled from "styled-components";
import { getSurroundingPlace } from "../../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { NearByPlaceProps } from "../../../types/home.details";
import SurroundingPlaceCard from "../../../components/web/home/SurroundingPlaceCard";
import CustomSkeleton from "../../../components/mobile/CustomSkeleton";

export default function SurrondingPlace() {
  const navigate = useNavigate();
  const param = useParams();
  const [isRec, setIsRec] = useState(true);

  const [surrondingPlace, setSurroundingPlace] = useState<NearByPlaceProps[]>(
    []
  );

  const getSurroundPlace = async () => {
    getSurroundingPlace({ lat: param?.lat + "", lng: param?.lng + "" }).then(
      (res) => {
        setSurroundingPlace(res?.data.results);
      }
    );
  };

  useEffect(() => {
    if (param.lng && param.lat) {
      getSurroundPlace();
    }
  }, [param?.lng, param?.lat]);

  return (
    <>
      <Header>
        <p>주변 여행지 추천</p>
      </Header>
      <ChipBox>
        <Chip $isActive={isRec} onClick={() => setIsRec(true)}>
          추천순
        </Chip>
        <Chip $isActive={!isRec} onClick={() => setIsRec(false)}>
          인기순
        </Chip>
      </ChipBox>
      <SurrondingCardGridBox>
        {surrondingPlace?.length === 0
          ? Array.from({ length: 15 }).map((_, index) => (
              <CustomSkeleton
                key={index}
                width="224px"
                height="190px"
                borderRadius="16px"
              />
            ))
          : surrondingPlace
              ?.slice(0, 15)
              ?.map((place) => (
                <SurroundingPlaceCard
                  key={place.placeId}
                  imgSrc={place?.photoUrls[0]}
                  title={place?.name}
                  rating="4.9"
                />
              ))}
      </SurrondingCardGridBox>
      <MoreButtonBox>
        <MoreButton
          onClick={() =>
            navigate(`/surroundingMore/${param?.lng}/${param?.lat}`)
          }
        >
          <span>더보기</span>
        </MoreButton>
      </MoreButtonBox>
    </>
  );
}

const Header = styled.div`
  width: calc(100% + 240px);
  height: 200px;
  margin-left: -120px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://cdn.discordapp.com/attachments/1202805588258459698/1289474545144561716/image.png?ex=66f8f440&is=66f7a2c0&hm=0c22bff6e9d212a151830aabd6ec93f12543bbdce43d167e22e59151a48ffa8c&");
  background-repeat: no-repeat;
  background-size: cover;
  & > p {
    color: ${(props) => props.theme.color.white};
    font-size: 32px;
    font-weight: 700;
  }
`;

const ChipBox = styled.div`
  margin: 32px 0 37px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`;

const Chip = styled.div<{ $isActive: boolean }>`
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 30px;
  border: 1px solid
    ${(props) =>
      props.$isActive ? props.theme.color.gray700 : props.theme.color.gray400};
  color: ${(props) =>
    props.$isActive ? props.theme.color.gray700 : props.theme.color.gray300};
`;

const SurrondingCardGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 50px;
`;

const MoreButtonBox = styled.div`
  margin-top: 83px;
  display: flex;
  justify-content: center;
`;

const MoreButton = styled.button`
  padding: 12px 50px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};
  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
  }
`;

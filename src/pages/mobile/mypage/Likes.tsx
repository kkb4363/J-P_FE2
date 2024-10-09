import styled from "styled-components";
import { mypageLikesTabs } from "../../../utils/staticDatas";
import { useEffect, useState } from "react";
import { TravelogueGridBox } from "./Travelogue";
import { CarouselWithText } from "../../../assets/styles/home.style";
import testImg from "../../../assets/images/testImg3.png";
import CarouselTitleBox from "../../../components/mobile/CarouselTitleBox";
import HeartIcon from "../../../assets/icons/HeartIcon";
import { getMyLikes } from "../../../utils/axios";

export default function Likes() {
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    getMyLikes().then((res) => console.log(res));
  });

  return (
    <>
      <LikesTabRow>
        {mypageLikesTabs.map((tab) => (
          <LikesTab
            key={tab.value}
            $isActive={currentTab === tab.value}
            onClick={() => setCurrentTab(tab.value)}
          >
            <span>{tab.label}</span>
          </LikesTab>
        ))}
      </LikesTabRow>

      <TravelogueGridBox>
        <LikeBox>
          <img src={testImg} alt="likes" />
          <CarouselTitleBox name="양평 두물머리" subName="경기 양평" />
          <Heart>
            <HeartIcon width="24" height="24" fill="#ff5757" stroke="#ff5757" />
          </Heart>
        </LikeBox>
        <LikeBox>
          <img src={testImg} alt="likes" />
          <CarouselTitleBox name="양평 두물머리" subName="경기 양평" />
          <Heart>
            <HeartIcon width="24" height="24" fill="#ff5757" stroke="#ff5757" />
          </Heart>
        </LikeBox>
        <LikeBox>
          <img src={testImg} alt="likes" />
          <CarouselTitleBox name="양평 두물머리" subName="경기 양평" />
          <Heart>
            <HeartIcon width="24" height="24" fill="#ff5757" stroke="#ff5757" />
          </Heart>
        </LikeBox>
      </TravelogueGridBox>
    </>
  );
}

const LikesTabRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 8px 0;
`;

const LikesTab = styled.div<{ $isActive: boolean }>`
  & > span {
    color: ${(props) =>
      props.$isActive ? props.theme.color.gray900 : props.theme.color.gray400};
    font-size: 16px;
    font-weight: 700;
  }
`;

const LikeBox = styled(CarouselWithText)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.06),
      0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  }

  position: relative;
`;

const Heart = styled.div`
  position: absolute;
  top: 14px;
  right: 12px;

  & > svg {
    width: 24px !important;
    height: 24px !important;
  }
`;

import styled from "styled-components";
import { webMyLikeTabs } from "../../../utils/staticDatas";
import { useEffect, useState } from "react";
import { TravelogueGridBox } from "./Travelogue";
import { CarouselWithText } from "../../../assets/styles/home.style";
import CarouselTitleBox from "../../../components/mobile/CarouselTitleBox";
import HeartIcon from "../../../assets/icons/HeartIcon";
import { getLikes } from "../../../utils/axios";
import { MyLikeProps } from "../../../types/mypage";
import CustomSkeleton from "../../../components/CustomSkeleton";
import { useNavigate } from "react-router-dom";

export default function Likes() {
  const navigate = useNavigate();

  const [isLoading, SetIsLoading] = useState(true);
  const [likes, setLikes] = useState<MyLikeProps[]>([]);
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    getLikes({
      likeType: webMyLikeTabs.find((t) => t.value === currentTab)?.likeType,
      placeType: webMyLikeTabs.find((t) => t.value === currentTab)?.placeType,
    }).then((res) => {
      if (res) {
        setLikes(res?.data.data);
        SetIsLoading(false);
      }
    });
  }, [currentTab]);

  return (
    <>
      <LikesTabRow>
        {webMyLikeTabs.map((tab) => (
          <LikesTab
            key={tab.value}
            $isActive={currentTab === tab.value}
            onClick={() => setCurrentTab(tab.value)}
          >
            <span>{tab.title}</span>
          </LikesTab>
        ))}
      </LikesTabRow>

      <TravelogueGridBox>
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <CustomSkeleton
                key={idx}
                width="156px"
                height="152px"
                borderRadius="16px"
              />
            ))
          : likes?.map((like) => (
              <LikeBox
                key={like.id}
                onClick={() => navigate(`/home/${like.targetId}`)}
              >
                <img src={like?.fileUrl} alt="like" />
                <CarouselTitleBox
                  name={like.targetName}
                  subName={like.targetAddress}
                />
                <Heart>
                  <HeartIcon
                    width="24"
                    height="24"
                    fill="#ff5757"
                    stroke="#ff5757"
                  />
                </Heart>
              </LikeBox>
            ))}
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

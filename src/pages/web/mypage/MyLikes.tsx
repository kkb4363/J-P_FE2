import styled from "styled-components";
import { MyPageTitle } from "./MyReviews";
import HeartIcon from "../../../assets/icons/HeartIcon";
import { useEffect, useState } from "react";
import { getLikes } from "../../../service/axios";
import { MyLikeProps } from "../../../types/mypage";
import { useNavigate } from "react-router-dom";
import CustomSkeleton from "../../../components/CustomSkeleton";
import { webMyLikeTabs } from "../../../utils/staticDatas";

export default function MyLikes() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState<MyLikeProps[]>([]);
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    getLikes({
      likeType: webMyLikeTabs.find((t) => t.value === currentTab)?.likeType,
      placeType: webMyLikeTabs.find((t) => t.value === currentTab)?.placeType,
    }).then((res) => {
      if (res) {
        if (currentTab === "diary") {
          const diaries = res?.data.data.filter(
            (d: MyLikeProps) => d.likeTargetType === "DIARY"
          );
          setLikes(diaries);
          return setIsLoading(false);
        }

        setLikes(res?.data.data);
        setIsLoading(false);
      }
    });
  }, [currentTab]);

  const handleLike = (type: string, id: string) => {
    if (type === "DIARY") navigate(`/home/travelogue/${id}`);
    else navigate(`/home/details/${id}`);
  };

  return (
    <div>
      <MyPageTitle>내 찜 목록</MyPageTitle>
      <TabRow>
        {webMyLikeTabs.map((tab) => (
          <Tab
            key={tab.value}
            $isActive={currentTab === tab.value}
            onClick={() => setCurrentTab(tab.value)}
          >
            {tab.title}
          </Tab>
        ))}
      </TabRow>

      <ImgGridBox>
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <CustomSkeleton
                key={idx}
                width="160px"
                height="130px"
                borderRadius="16px"
              />
            ))
          : likes?.map((like) => (
              <ImgBox
                key={like.id}
                onClick={() => handleLike(like.likeTargetType, like.targetId)}
              >
                <HeartIconBox>
                  <HeartIcon
                    width="24"
                    height="24"
                    stroke="#ff5757"
                    fill="#ff5757"
                  />
                </HeartIconBox>
                <img
                  src={like.fileUrl}
                  alt={like.fileUrl ? like.targetName : "이미지 없음"}
                />
                <div>
                  <p>
                    {like.likeTargetType === "DIARY"
                      ? like.targetSubject
                      : like.targetName}
                  </p>
                  <span>{like.targetAddress}</span>
                </div>
              </ImgBox>
            ))}
      </ImgGridBox>
    </div>
  );
}

const TabRow = styled.div`
  margin: 24px 0 24px 0;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Tab = styled.div<{ $isActive: boolean }>`
  color: ${(props) =>
    props.$isActive ? props.theme.color.gray900 : props.theme.color.gray500};
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;

const ImgGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const ImgBox = styled.div`
  width: 165px;
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  position: relative;
  cursor: pointer;

  & > img {
    width: 100%;
    height: 130px;
    border-radius: 16px;
    object-fit: cover;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 4px;

    & > p {
      color: ${(props) => props.theme.color.gray900};
      font-size: 14px;
      font-weight: 700;
    }

    & > span {
      color: ${(props) => props.theme.color.gray600};
      font-size: 12px;
      font-weight: 700;
    }
  }
`;

const HeartIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 15px;
  top: 10px;
`;

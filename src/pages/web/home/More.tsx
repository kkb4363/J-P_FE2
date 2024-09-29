import styled from "styled-components";
import { HomeTabType, useDisplayStore } from "../../../store/display.store";
import { webHomeTabs } from "../../../utils/staticDatas";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../utils/axios";
import { placeApiProps } from "../../../types/home";
import PlaceCard from "../../../components/web/home/PlaceCard";
import CustomSkeleton from "../../../components/mobile/CustomSkeleton";

export default function More() {
  const navigate = useNavigate();
  const { getHomeTab, setHomeTab } = useDisplayStore();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleTab = (t: HomeTabType) => {
    setHomeTab(t);
  };

  const requestApi = async () => {
    try {
      const data = await axiosInstance.get(
        `/place/page?page=1&placeType=${getHomeTab()}`
      );
      setData(data.data.data);
      setLoading(false);
    } catch (error) {
      console.error("cardSlide api error=", error);
    }
  };

  const handleClick = (placeId: string) => {
    getHomeTab() === "CITY"
      ? navigate(`/city/${placeId}`)
      : navigate(`/${placeId}`);
  };

  useEffect(() => {
    setLoading(true);
    requestApi();
  }, [getHomeTab()]);

  return (
    <>
      <MoreTitle>
        {webHomeTabs.filter((tab) => tab.value === getHomeTab())[0]?.title}
      </MoreTitle>
      <TabRow>
        {webHomeTabs.map((tab) => (
          <Tab
            key={tab.value}
            $isActive={getHomeTab() === tab.value}
            onClick={() => handleTab(tab.value as HomeTabType)}
          >
            <span>{tab.label}</span>
          </Tab>
        ))}
      </TabRow>
      <CardGridBox>
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <CustomSkeleton
                key={index}
                width="100%"
                height="250px"
                borderRadius="16px"
              />
            ))
          : data?.map((item: placeApiProps) => (
              <PlaceCard
                key={item.id}
                bottomText={getHomeTab() === "CITY" ? item.name : ""}
                topText={getHomeTab() === "THEME" ? "여행지" : ""}
                title={getHomeTab() !== "CITY" ? item.name : ""}
                subTitle={getHomeTab() !== "CITY" ? item.subName : ""}
                handleClick={() => handleClick(`${item.placeId}`)}
              />
            ))}
      </CardGridBox>
    </>
  );
}

const MoreTitle = styled.h1`
  margin-top: 60px;
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.color.gray900};
  font-size: 32px;
  font-weight: 700;
`;

const TabRow = styled.div`
  margin-top: 32px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Tab = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  cursor: pointer;
  border-radius: 30px;
  border: 1px solid
    ${(props) =>
      props.$isActive ? props.theme.color.main : props.theme.color.gray200};
  background-color: ${(props) =>
    props.$isActive ? props.theme.color.mainLight : props.theme.color.white};

  & > span {
    color: ${(props) =>
      props.$isActive ? props.theme.color.main : props.theme.color.gray400};
    font-size: 16px;
    font-weight: 700;
  }
`;

const CardGridBox = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
`;

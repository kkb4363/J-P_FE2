import { useNavigate } from "react-router-dom";
import CustomHeader from "../../../components/mobile/CustomHeader";
import {
  scrollHidden,
  ReviewCol as SuggestionCol,
} from "../../../assets/styles/home.style";
import { SuggestionBox, SuggestTextCol } from "./Schedule";
import ImageView from "../../../components/ImageView";
import styled from "styled-components";
import CustomProfile from "../../../components/CustomProfile";
import { TravelogProps } from "../../../types/travelreview";
import { useEffect, useState } from "react";
import { getAllDiaries } from "../../../service/axios";

export default function TravelMore() {
  const navigate = useNavigate();
  const [recommendTravelogues, setRecommendTravelogues] = useState<
    TravelogProps[]
  >([]);

  useEffect(() => {
    getAllDiaries(1, "HOT").then((res) => {
      if (res) {
        setRecommendTravelogues(res?.data.data);
      }
    });
  }, []);

  return (
    <>
      <CustomHeader title="여행 일정 추천" handleClick={() => navigate(-1)} />
      <TravelMoreBody>
        <SuggestionCol>
          {recommendTravelogues?.map((r) => (
            <SuggestionBox
              key={r.id}
              onClick={() => navigate(`/home/travelogue/${r?.id}`)}
            >
              <ImageView
                src={r?.fileInfos?.[0]?.fileUrl}
                alt="여행 일정 추천 이미지"
                width="80px"
                height="80px"
              />

              <SuggestTextCol>
                <CustomProfile
                  src={r?.userCompactResDto?.profile}
                  nickname={r?.userCompactResDto?.nickname}
                  content={r?.createdAt}
                  fontSize="12px"
                />

                <p>{r?.subject}</p>

                <div>
                  <span>#태그 </span>
                  <span>#api 추가되면 해야함</span>
                </div>
              </SuggestTextCol>
            </SuggestionBox>
          ))}
        </SuggestionCol>
      </TravelMoreBody>
    </>
  );
}

const TravelMoreBody = styled.div`
  padding: 0 20px;
  height: calc(100% - 50px - 20px);
  overflow-y: auto;
  ${scrollHidden};
`;

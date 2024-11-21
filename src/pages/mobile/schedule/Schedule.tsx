import styled from "styled-components";
import CustomHeader from "../../../components/mobile/CustomHeader";
import ScheduleIcon from "../../../assets/icons/ScheduleIcon";
import {
  InfoRow,
  InfoText,
  MoreText,
  scrollHidden,
  ReviewCol,
} from "../../../assets/styles/home.style";
import testImg from "../../../assets/images/testImg.png";
import ImageView from "../../../components/ImageView";
import BellIcon from "../../../assets/icons/BellIcon";
import { useNavigate } from "react-router-dom";
import CustomProfile from "../../../components/CustomProfile";
import { useEffect, useState } from "react";
import { getMySchedules } from "../../../service/axios";
import { toast } from "react-toastify";
import { useUserStore } from "../../../store/user.store";
import { ScheduleApiProps } from "../../../types/schedule";
import MyTravelCard from "../../../components/MyTravelCard";

export default function Schedule() {
  const navigate = useNavigate();
  const { getUserName } = useUserStore();

  const [mySchedules, setMySchedules] = useState<ScheduleApiProps[]>([]);

  const handleScheduleCreate = () => {
    if (!getUserName()) {
      toast(<span>로그인이 필요합니다.</span>);
    } else {
      navigate("/schedule");
    }
  };

  useEffect(() => {
    getMySchedules().then((res) => {
      if (res) {
        setMySchedules(res?.data?.data);
      }
    });
  }, []);

  return (
    <ScheduleContainer>
      <CustomHeader title="일정" hidePrevIcon={true}>
        <ScheduleLayout onClick={handleScheduleCreate}>
          <ScheduleIcon />
          <span>일정 생성</span>
        </ScheduleLayout>
      </CustomHeader>

      <ScheduleBody>
        <InfoRow>
          <InfoText>내 일정</InfoText>
        </InfoRow>

        {mySchedules?.length === 0 ? (
          <NoSchedule>
            <ScheduleIcon stroke="#b8b8b8" />
            <span>일정이 없어요. 새로운 여행 일정을 추가해요!</span>
          </NoSchedule>
        ) : (
          <ScheduleCardCol>
            {mySchedules
              ?.filter((p) => p.status !== "COMPLETED")
              .reverse()
              .map((t: any) => (
                <MyTravelCard
                  width="100%"
                  height="100px"
                  key={t.id}
                  title={t.title}
                  startDate={t.startDate}
                  endDate={t.endDate}
                  isOpen={t.isOpen}
                  handleClick={() => navigate(`/schedule/details/${t.id}`)}
                />
              ))}
          </ScheduleCardCol>
        )}

        <InfoRow>
          <InfoText>여행 일정 추천</InfoText>
          <MoreText onClick={() => navigate("/home/travels")}>더보기</MoreText>
        </InfoRow>

        <SuggestionCol>
          <SuggestionBox>
            <ImageView
              src={testImg}
              alt="여행 일정 추천 이미지"
              width="80px"
              height="80px"
            />

            <SuggestTextCol>
              <CustomProfile
                src={testImg}
                nickname="Minah"
                content="1박 2일"
                fontSize="12px"
              />

              <p>남해로 힐링 여행 떠나기</p>

              <div>
                <span>#한려해상국립공원</span>
                <span>#바람흔적미술관</span>
              </div>
            </SuggestTextCol>
          </SuggestionBox>
        </SuggestionCol>
      </ScheduleBody>

      <AlarmButton>
        <BellIcon stroke="#fff" width="18" height="18" />
        <span>초대 알림</span>
      </AlarmButton>
    </ScheduleContainer>
  );
}

const ScheduleContainer = styled.div`
  overflow: auto;
  ${scrollHidden};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ScheduleLayout = styled.div`
  min-width: 60px;
  display: flex;
  gap: 3px;
  align-items: center;

  & > span {
    color: ${(props) => props.theme.color.secondary};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
  }
`;

export const ScheduleBody = styled.div`
  padding: 0 20px;
  height: calc(100% - 50px - 70px);
`;

const SuggestionCol = styled(ReviewCol)``;

export const SuggestionBox = styled.div`
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  display: flex;
  align-items: center;
  gap: 16px;
  height: 100px;
  padding: 0 12px;
`;

export const SuggestTextCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  overflow: hidden;

  & > div:first-child {
    display: flex;
    gap: 6px;
    align-items: center;
    color: ${(props) => props.theme.color.gray900};
    font-size: 12px;
    & > img {
      width: 18px;
      height: 18px;
      border-radius: 9px;
    }
    & > span {
      color: ${(props) => props.theme.color.gray500};
      font-size: 12px;
    }
  }

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-weight: 700;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > div:last-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    gap: 3px;
    align-items: center;

    & > span {
      color: ${(props) => props.theme.color.secondary};
      font-size: 12px;
      font-weight: 400;
    }
  }
`;

const AlarmButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 70px;
  margin: auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 8px 12px;
  min-height: 44px;
  background-color: ${(props) => props.theme.color.main};
  border-radius: 30px;
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.08),
    0px 4px 10px 0px rgba(0, 0, 0, 0.08);

  & > span {
    color: ${(props) => props.theme.color.white};
    font-size: 14px;
    font-weight: 600;
  }
`;

const ScheduleCardCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 208px;
  overflow-y: scroll;
  ${scrollHidden};
`;

const NoSchedule = styled.div`
  padding: 32px 0 70px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  & > span {
    color: ${(props) => props.theme.color.gray300};
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
  }
`;

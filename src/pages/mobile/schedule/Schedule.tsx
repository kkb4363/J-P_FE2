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
import ImageView from "../../../components/ImageView";
import BellIcon from "../../../assets/icons/BellIcon";
import { useNavigate } from "react-router-dom";
import CustomProfile from "../../../components/CustomProfile";
import { useEffect, useState } from "react";
import {
  deleteSchedule,
  getAllDiaries,
  getScheduleList,
} from "../../../service/axios";
import { toast } from "react-toastify";
import { ScheduleApiProps } from "../../../types/schedule";
import MyTravelCard from "../../../components/MyTravelCard";
import { Cookies } from "react-cookie";
import OneButtonModal from "../../../components/OneButtonModal";
import TwoButtonsModal from "../../../components/TwoButtonsModal";
import TrashIcon from "../../../assets/icons/TrashIcon";
import { TravelogProps } from "../../../types/travelreview";

const cookies = new Cookies();

export default function Schedule() {
  const navigate = useNavigate();

  const [mySchedules, setMySchedules] = useState<ScheduleApiProps[]>([]);

  // 지난 일정 제외
  const filteredSchedules = mySchedules?.filter(
    (p) => p.status !== "COMPLETED"
  );

  // 일정 삭제
  const [isDelete, setIsDelete] = useState(false);
  const [selectId, setSelectId] = useState<number>();
  const [openModal, setOpenModal] = useState({
    deleteSchedule: false,
    deleteSuccess: false,
  });

  const handleScheduleCreate = () => {
    if (!cookies.get("userToken")) {
      toast(<span>로그인이 필요합니다.</span>);
    } else {
      navigate("/schedule");
    }
  };

  const handleCardClick = (id: number) => {
    if (isDelete) {
      setSelectId(id);
    } else {
      navigate(`/schedule/details/${id}`);
    }
  };

  const handleDelete = () => {
    if (isDelete) {
      setOpenModal((p) => ({ ...p, deleteSchedule: true }));
    } else {
      setIsDelete(true);
    }
  };

  const handleDeleteClick = () => {
    if (selectId) {
      deleteSchedule(selectId).then((res) => {
        if (res?.data) {
          const newSchedules = mySchedules.filter(
            (prev) => prev.id !== selectId
          );
          setIsDelete(false);
          setMySchedules(newSchedules);
          setOpenModal({ deleteSchedule: false, deleteSuccess: true });
        }
      });
    }
  };

  useEffect(() => {
    getScheduleList().then((res) => {
      if (res) {
        setMySchedules(res?.data?.data);
      }
    });
  }, []);

  useEffect(() => {
    if (isDelete) {
      setSelectId(filteredSchedules[0]?.id);
    }
  }, [isDelete]);

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
      <ScheduleContainer>
        <CustomHeader title="일정" hidePrevIcon={true}>
          <CreateScheduleBtn onClick={handleScheduleCreate}>
            <ScheduleIcon />
            <span>일정 생성</span>
          </CreateScheduleBtn>
        </CustomHeader>

        <ScheduleSection>
          <InfoRow>
            <InfoText>내 일정</InfoText>
            <DeleteText onClick={handleDelete}>
              {isDelete && <TrashIcon width={16} height={16} />}
              {isDelete ? "삭제" : "편집"}
            </DeleteText>
          </InfoRow>

          {filteredSchedules?.length === 0 ? (
            <NotScheduleSection>
              <ScheduleIcon stroke="#b8b8b8" />
              <span>일정이 없어요. 새로운 여행 일정을 추가해요!</span>
            </NotScheduleSection>
          ) : (
            <ScheduleCardCol>
              {filteredSchedules?.reverse().map((t: any) => (
                <MyTravelCard
                  key={t.id}
                  width="100%"
                  height="100px"
                  title={t.title}
                  startDate={t.startDate}
                  endDate={t.endDate}
                  isOpen={t.isOpen}
                  isSelect={selectId === t.id}
                  handleClick={() => handleCardClick(t.id)}
                />
              ))}
            </ScheduleCardCol>
          )}

          <InfoRow>
            <InfoText>여행 일정 추천</InfoText>
            <MoreText onClick={() => navigate("/home/travels")}>
              더보기
            </MoreText>
          </InfoRow>

          <SuggestionCol>
            {recommendTravelogues?.map((r) => (
              <SuggestionBox
                key={r.id}
                onClick={() => navigate(`/home/travelogue/${r?.id}`)}
              >
                <ImageView
                  src={r?.fileInfos?.[0]?.fileUrl}
                  alt="추천이미지"
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
        </ScheduleSection>

        <AlarmButton>
          <BellIcon stroke="#fff" width="18" height="18" />
          <span>초대 알림</span>
        </AlarmButton>
      </ScheduleContainer>

      {openModal.deleteSchedule && (
        <TwoButtonsModal
          isMobile={true}
          width="320px"
          height="230px"
          text="일정을 삭제할까요?"
          onClick={handleDeleteClick}
          onClose={() => setOpenModal((p) => ({ ...p, deleteSchedule: false }))}
        />
      )}

      {openModal.deleteSuccess && (
        <OneButtonModal
          isMobile={true}
          width="320px"
          height="230px"
          noCloseBtn
          buttonText="확인"
          onClick={() => setOpenModal((p) => ({ ...p, deleteSuccess: false }))}
        >
          <DeleteSuccessText>일정이 삭제되었습니다.</DeleteSuccessText>
        </OneButtonModal>
      )}
    </>
  );
}

const ScheduleContainer = styled.section`
  overflow: auto;
  ${scrollHidden};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CreateScheduleBtn = styled.button`
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

export const ScheduleSection = styled.section`
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
  margin-bottom: 20px;
`;

const NotScheduleSection = styled.div`
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

const DeleteSuccessText = styled.p`
  color: ${(props) => props.theme.color.gray900};
  font-size: 16px;
  font-weight: 700;
`;

const DeleteText = styled.div`
  color: ${(props) => props.theme.color.gray500};
  font-size: 12px;

  display: flex;
  align-items: center;
`;

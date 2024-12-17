import styled from "styled-components";
import ScheduleSlider from "./ScheduleSlider";
import RecommendCard from "./RecommendCard";
import { ScheduleApiProps } from "../../../types/schedule";
import TrashIcon from "../../../assets/icons/TrashIcon";
import { useEffect, useState } from "react";
import { deleteSchedule, getAllDiaries } from "../../../service/axios";
import TwoButtonsModal from "../../TwoButtonsModal";
import OneButtonModal from "../../OneButtonModal";
import { LoadingText } from "../../../pages/web/onboarding/Survey";
import { TravelogProps } from "../../../types/travelreview";

interface Props {
  schedules: ScheduleApiProps[];
  setSchedules: (s: ScheduleApiProps[]) => void;
}

export default function UpcomingSchedule({ schedules, setSchedules }: Props) {
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();

  const [openModal, setOpenModal] = useState({
    deleteSchedule: false,
    deleteSuccess: false,
  });

  const handleDelete = () => {
    if (isDelete) {
      setOpenModal((p) => ({ ...p, deleteSchedule: true }));
    } else {
      setIsDelete(true);
    }
  };

  const handleDeleteClick = () => {
    if (deleteId) {
      deleteSchedule(deleteId).then((res) => {
        if (res?.data) {
          const newSchedules = schedules.filter((prev) => prev.id !== deleteId);
          setIsDelete(false);
          setSchedules(newSchedules);
          setOpenModal({ deleteSchedule: false, deleteSuccess: true });
        }
      });
    }
  };

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
      <>
        {schedules?.length !== 0 ? (
          <>
            <SubTitleWithMore>
              <h2>내 일정</h2>

              <div>
                <span onClick={handleDelete}>
                  {isDelete && <TrashIcon width={16} height={16} />}
                  {isDelete ? "삭제" : "편집"}
                </span>

                {isDelete && (
                  <span onClick={() => setIsDelete(false)}>취소</span>
                )}
              </div>
            </SubTitleWithMore>

            <ScheduleCardBox>
              <ScheduleSlider
                schedules={schedules}
                isDelete={isDelete}
                setDeleteId={setDeleteId}
              />
            </ScheduleCardBox>
          </>
        ) : (
          <LoadingText>로딩중...</LoadingText>
        )}

        <SubTitleWithMore>
          <h2>여행 일정 추천</h2>
          <span>더보기</span>
        </SubTitleWithMore>

        <RecommendCardBox>
          {recommendTravelogues?.map((r) => (
            <RecommendCard data={r} key={r.id} />
          ))}
        </RecommendCardBox>
      </>

      {openModal.deleteSchedule && (
        <TwoButtonsModal
          isMobile={false}
          width="400px"
          height="350px"
          text="일정을 삭제할까요?"
          onClick={handleDeleteClick}
          onClose={() => setOpenModal((p) => ({ ...p, deleteSchedule: false }))}
        />
      )}

      {openModal.deleteSuccess && (
        <OneButtonModal
          isMobile={false}
          width="400px"
          height="330px"
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

const SubTitleWithMore = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  & > h2 {
    color: ${(props) => props.theme.color.gray900};
    font-size: 24px;
    font-weight: 700;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 6px;

    & > span {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.color.gray300};
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
    }
  }
`;

const ScheduleCardBox = styled.section`
  margin-bottom: 104px;
  width: 100%;
`;

const RecommendCardBox = styled.section`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 70px;
`;

const DeleteSuccessText = styled.p`
  color: ${(props) => props.theme.color.gray900};
  font-size: 20px;
  font-weight: 700;
`;

import styled from "styled-components";
import { TravelHeader } from "./Travel";
import EditIcon from "../../../assets/icons/EditIcon";
import { useEffect, useState } from "react";
import { getMyDiaries } from "../../../service/axios";
import { MyTravelogueProps } from "../../../types/mypage";
import SelectTravelSheet from "../../../components/mobile/bottomSheets/SelectTravelSheet";
import { useNavigate } from "react-router-dom";

export default function Travelogue() {
  const navigate = useNavigate();
  const [open, setOpen] = useState({
    writeSheet: false,
  });

  const [diaries, setDiaries] = useState<MyTravelogueProps[]>([]);

  const handleEdit = (id: number) => {
    navigate(`/home/writeTravelogue/edit`, {
      state: {
        diaryId: id,
      },
    });
  };

  useEffect(() => {
    getMyDiaries().then((res) => {
      if (res) {
        setDiaries(res?.data.data);
      }
    });
  }, []);

  return (
    <>
      <TravelogueHeader>
        <span>목록</span>

        <div onClick={() => setOpen((p) => ({ ...p, writeSheet: true }))}>
          <EditIcon />
          <span>작성하기</span>
        </div>
      </TravelogueHeader>

      <TravelogueGridBox>
        {diaries?.map((d: MyTravelogueProps) => (
          <TravelogueCard
            key={d.id}
            $imgSrc={d?.fileInfos[0]?.fileUrl}
            onClick={() => handleEdit(d.id)}
          >
            <p>{d.subject}</p>
            <span>
              {`${d.scheduleStartDate.split("-")[1]}.${
                d.scheduleStartDate.split("-")[2]
              } ~ ${d.scheduleEndDate.split("-")[1]}.${
                d.scheduleEndDate.split("-")[2]
              }`}
            </span>
            <div>{d.isPublic ? "공개" : "비공개"}</div>
          </TravelogueCard>
        ))}
      </TravelogueGridBox>

      <SelectTravelSheet
        isOpen={open.writeSheet}
        onClose={() => setOpen((p) => ({ ...p, writeSheet: false }))}
      />
    </>
  );
}

const TravelogueHeader = styled(TravelHeader)`
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    & > span {
      color: ${(props) => props.theme.color.gray900};
      font-size: 14px;
      font-weight: 700;
    }
  }
`;

export const TravelogueGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  padding: 16px 0 8px 0;
  gap: 16px;
`;

const TravelogueCard = styled.div<{ $imgSrc?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.06),
    0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 150px;
  min-height: 160px;

  gap: 12px;

  border-radius: 16px;
  background-image: url(${(props) => props.$imgSrc && props.$imgSrc});
  background-color: ${(props) => !props.$imgSrc && props.theme.color.gray300};
  background-position: center;
  background-size: cover;

  & > p {
    color: ${(props) => props.theme.color.white};
    font-size: 16px;
    font-weight: 700;
  }

  & > span {
    color: ${(props) => props.theme.color.white};
    font-size: 14px;
    font-weight: 400;
  }

  & > div {
    position: absolute;
    right: 6px;
    top: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 30px;

    color: ${(props) => props.theme.color.gray900};
    font-size: 10px;
    font-weight: 500;
    min-height: 20px;
    padding: 0 8px;
    white-space: nowrap;
  }
`;

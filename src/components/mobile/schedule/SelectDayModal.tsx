import { DayProps } from "../../../types/schedule";
import MoveDaySlider from "../../MoveDaySlider";
import OneButtonModal from "../../OneButtonModal";

interface Props {
  onClick: () => void;
  onClose: () => void;
  dayResDtos: DayProps[];
  selectDay: number;
  setSelectDay: (id: number) => void;
}

export default function SelectDayModal({
  onClick,
  onClose,
  dayResDtos,
  selectDay,
  setSelectDay,
}: Props) {
  return (
    <OneButtonModal
      isMobile
      key={"날짜 선택 모달"}
      title="날짜 선택"
      buttonText="다음"
      onClick={onClick}
      onClose={onClose}
    >
      <MoveDaySlider
        isMobile
        dayResDtos={dayResDtos}
        selectDay={selectDay}
        setSelectDay={setSelectDay}
      />
    </OneButtonModal>
  );
}

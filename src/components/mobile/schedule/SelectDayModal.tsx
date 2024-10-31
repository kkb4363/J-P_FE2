import { testDayList } from "../../../utils/staticDatas";
import MoveDaySlider from "../../MoveDaySlider";
import OneButtonModal from "../../OneButtonModal";

interface Props {
  onClick: () => void;
  onClose: () => void;
}

export default function SelectDayModal({ onClick, onClose }: Props) {
  return (
    <OneButtonModal
      isMobile
      key={"날짜 선택 모달"}
      title="날짜 선택"
      buttonText="다음"
      onClick={onClick}
      onClose={onClose}
    >
      <MoveDaySlider isMobile dayList={testDayList} currentDay={1} />
    </OneButtonModal>
  );
}
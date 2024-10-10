import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import * as D from "../../../assets/styles/scheduleDetail.style";

export default function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <D.ArrowBox className="left" onClick={onClick}>
      <ArrowLeftIcon stroke="#6979F8" />
    </D.ArrowBox>
  );
}

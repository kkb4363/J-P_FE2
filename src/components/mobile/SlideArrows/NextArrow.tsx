import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";
import * as D from "../../../assets/styles/scheduleDetail.style";

export default function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <D.ArrowBox className="right" onClick={onClick}>
      <ArrowRightIcon stroke="#6979F8" />
    </D.ArrowBox>
  );
}

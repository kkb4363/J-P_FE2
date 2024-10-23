import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";
import { ArrowBox } from "./PrevArrow";

export default function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <ArrowBox className="right" onClick={onClick}>
      <ArrowRightIcon stroke="#6979F8" />
    </ArrowBox>
  );
}

import OneButtonModal from "../../OneButtonModal";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";
import styled from "styled-components";

interface Props {
  onClick: () => void;
  onClose: () => void;
}

export default function SelectDayModal({ onClick, onClose }: Props) {
  return (
    <OneButtonModal
      key={"날짜 선택 모달"}
      title="날짜 선택"
      buttonText="다음"
      onClick={onClick}
      onClose={onClose}
      width="440px"
      height="320px"
      fontSize="24px"
    >
      <SelectDayRow>
        <LeftArrow>
          <ArrowLeftIcon stroke="#6979f8" />
        </LeftArrow>
        <Date $isActive={true}>
          <p>Day 1</p>
          <span>4.16(목)</span>
        </Date>
        <Date $isActive={false}>
          <p>Day 2</p>
          <span>4.17(금)</span>
        </Date>
        <Date $isActive={false}>
          <p>Day 3</p>
          <span>4.18(토)</span>
        </Date>
        <RightArrow>
          <ArrowRightIcon stroke="#6979f8" width="14" height="14" />
        </RightArrow>
      </SelectDayRow>
    </OneButtonModal>
  );
}

const SelectDayRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 400px;
  position: relative;
  margin: 60px auto 0 auto;
`;

const LeftArrow = styled.div`
  position: absolute;
  left: 0;
  cursor: pointer;
`;

const RightArrow = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;
`;

const Date = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 12px 14px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid
    ${(props) =>
      props.$isActive
        ? props.theme.color.secondary
        : props.theme.color.gray200};

  & > p {
    color: ${(props) =>
      props.$isActive
        ? props.theme.color.secondary
        : props.theme.color.gray700};
    font-size: 14px;
    font-weight: 700;
  }

  & > span {
    color: ${(props) =>
      props.$isActive
        ? props.theme.color.secondary
        : props.theme.color.gray400};
    font-size: 14px;
    font-weight: 500;
  }
`;

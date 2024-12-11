import styled from "styled-components";
import { PlanDetailsProps } from "../types/schedule";
import { mobilityList } from "../utils/staticDatas";

interface Props {
  isWeb?: boolean;
  transport: string[];
  isPlanMemoEdit: boolean;
  setData: React.Dispatch<React.SetStateAction<PlanDetailsProps>>;
}
export default function TransportBox({
  isWeb = false,
  transport,
  isPlanMemoEdit,
  setData,
}: Props) {
  const handleTransportClick = (item: string) => {
    if (isPlanMemoEdit) {
      setData((prev) => {
        const isItemInTransport = prev.mobility.includes(item);

        return {
          ...prev,
          mobility: isItemInTransport
            ? prev.mobility.filter(
                (transportItem: string) => transportItem !== item
              )
            : [...prev.mobility, item],
        };
      });
    }
  };

  return (
    <TransportBoxContainer $isWeb={isWeb}>
      {isPlanMemoEdit &&
        mobilityList.map((item, i) => (
          <TransPortItem
            key={i}
            onClick={() => handleTransportClick(item)}
            $isWeb={isWeb}
            $select={transport.includes(item)}
          >
            {item}
          </TransPortItem>
        ))}
      {!isPlanMemoEdit &&
        (transport.length > 0 ? (
          transport.map((item, idx) => (
            <TransPortItem key={idx} $isWeb={isWeb} $select={true}>
              {item}
            </TransPortItem>
          ))
        ) : (
          <p>선택된 아이템이 없습니다</p>
        ))}
    </TransportBoxContainer>
  );
}

const TransportBoxContainer = styled.div<{ $isWeb: boolean }>`
  display: flex;
  gap: 8px;

  & > p {
    color: ${(props) => props.theme.color.gray900};
    margin: 5px 0;
    font-size: ${({ $isWeb }) => !$isWeb && "14px"};
  }
`;

const TransPortItem = styled.div<{ $isWeb: boolean; $select: boolean }>`
  padding: ${({ $isWeb }) => ($isWeb ? "10px 11px" : "10px")};
  border-radius: 30px;
  font-size: ${({ $isWeb }) => !$isWeb && "14px"};
  white-space: nowrap;
  background-color: ${(props) => props.theme.color.white};
  border: 1px solid
    ${(props) =>
      props.$select ? props.theme.color.secondary : props.theme.color.gray200};
  color: ${(props) =>
    props.$select ? props.theme.color.secondary : props.theme.color.gray500};
  user-select: none;
`;

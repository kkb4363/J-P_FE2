import { ComponentClass } from "react";
import { SortableContainer, SortableContainerProps } from "react-sortable-hoc";
import { planItemProps } from "../../../types/schedule";
import { PlanItem } from "../PlanItem";
import styled from "styled-components";

interface Props {
  planItems: planItemProps[];
  isEdit: boolean;
	jpState: string;
  setIsDetailsMode: () => void;
}

export const PlanList: ComponentClass<SortableContainerProps & Props> =
  SortableContainer(
    ({ planItems, isEdit, jpState,  setIsDetailsMode }: Props) => {
      return (
        <PlanListContainer>
          {planItems.map((item, index) => (
            <PlanItem
              key={index}
              index={index}
              id={index}
							isEdit={isEdit}
              setIsDetailsMode={setIsDetailsMode}
              planItem={item}
              jpState={jpState}
            />
          ))}
        </PlanListContainer>
      );
    }
  );

const PlanListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 13px 7px;
`;
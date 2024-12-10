import { useSortable } from "@dnd-kit/sortable";
import styled from "styled-components";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  url: string;
  isChecked: boolean;
  data: any;
}

export default function SortablePhoto(props: Props) {
  const sortable = useSortable({ id: props.data.name });
  const { attributes, setNodeRef, listeners, transform, transition } = sortable;
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <ImgEditImg
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      {...style}
      $isChecked={props.isChecked}
      src={props.url}
      alt="travelogue-image-edit"
    />
  );
}

const ImgEditImg = styled.img<{ $isChecked: boolean }>`
  border: ${(props) =>
    props.$isChecked && `2px solid ${props.theme.color.secondary}`};
`;

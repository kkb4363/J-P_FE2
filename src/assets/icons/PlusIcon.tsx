interface Props {
  fill?: string;
  stroke?: string;
}

const PlusIcon = ({ fill = "none", stroke = "#4D4D4D" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={fill}
    >
      <path
        d="M8 4L8 12M12 8L4 8"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PlusIcon;

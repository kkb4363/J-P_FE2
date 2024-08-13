interface Props {
  fill?: string;
  stroke?: string;
}

const ArrowLeftIcon = ({ fill = "none", stroke = "#1a1a1a" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path
        d="M15 17L10 12L15 7"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeftIcon;

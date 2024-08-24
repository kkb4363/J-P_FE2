interface Props {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
}

const ArrowRightIcon = ({
  fill = "none",
  stroke = "white",
  width = "8",
  height = "13",
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 8 13"
      fill={fill}
    >
      <path
        d="M1.5 1.5L6.5 6.5L1.5 11.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRightIcon;

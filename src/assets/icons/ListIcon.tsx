interface Props {
  fill?: string;
  stroke?: string;
  handleClick?: () => void;
}

const ListIcon = ({
  fill = "none",
  stroke = "#6979F8",
  handleClick,
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
      onClick={handleClick}
    >
      <path
        d="M8.71961 6H21.5996M8.71961 12.48H21.5996M8.71961 18.96H21.5996M3.59961 6V6.0128M3.59961 12.48V12.4928M3.59961 18.96V18.9728"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ListIcon;

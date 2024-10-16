interface Props {
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
}

const SearchIcon = ({
  fill = "none",
  stroke = "#4D4D4D",
  strokeWidth = "2",
}: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.9269 17.04L20.4 20.4M19.28 11.44C19.28 15.7699 15.7699 19.28 11.44 19.28C7.11009 19.28 3.60001 15.7699 3.60001 11.44C3.60001 7.11006 7.11009 3.59998 11.44 3.59998C15.7699 3.59998 19.28 7.11006 19.28 11.44Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SearchIcon;

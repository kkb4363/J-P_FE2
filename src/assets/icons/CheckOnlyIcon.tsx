interface Props {
  fill?: string;
  stroke?: string;
}

const CheckOnlyIcon = ({ fill = "none", stroke = "white" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path
        d="M16.8002 8.40002L9.64068 15.6L7.2002 13.1457"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckOnlyIcon;

interface Props {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
}

const CalendarIcon = ({
  fill = "none",
  stroke = "#4D4D4D",
  width = "25",
  height = "24",
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 8.91425H19.25M7.05952 3V4.54304M17.25 3V4.54285M20.25 7.24285V18.3C20.25 19.7912 19.0561 21 17.5833 21H6.91667C5.44391 21 4.25 19.7912 4.25 18.3V7.24285C4.25 5.75168 5.44391 4.54285 6.91667 4.54285H17.5833C19.0561 4.54285 20.25 5.75168 20.25 7.24285Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CalendarIcon;

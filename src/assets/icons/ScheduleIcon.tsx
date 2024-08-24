interface Props {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
}

const ScheduleIcon = ({
  fill = "none",
  stroke = "#6979F8",
  width = "18",
  height = "18",
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill={fill}
    >
      <path
        d="M4.125 6.68569H14.625M5.48214 2.25V3.40728M13.125 2.25V3.40714M13.125 3.40714H5.625C4.38236 3.40714 3.375 4.44327 3.375 5.72141V13.4357C3.375 14.7139 4.38236 15.75 5.625 15.75H13.125C14.3676 15.75 15.375 14.7139 15.375 13.4357L15.375 5.72141C15.375 4.44327 14.3676 3.40714 13.125 3.40714ZM7.5 11.3143L8.625 12.4714L11.25 9.77142"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ScheduleIcon;

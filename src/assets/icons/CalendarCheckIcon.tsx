interface Props {
  fill?: string;
  stroke?: string;
}

const CalendarCheckIcon = ({ fill = "none", stroke = "#1a1a1a" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill={fill}
    >
      <path
        d="M4.79199 7.18569H15.292M6.14914 2.75V3.90728M13.792 2.75V3.90714M13.792 3.90714H6.29199C5.04935 3.90714 4.04199 4.94327 4.04199 6.22141V13.9357C4.04199 15.2139 5.04935 16.25 6.29199 16.25H13.792C15.0346 16.25 16.042 15.2139 16.042 13.9357L16.042 6.22141C16.042 4.94327 15.0346 3.90714 13.792 3.90714ZM8.16699 11.8143L9.29199 12.9714L11.917 10.2714"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CalendarCheckIcon;

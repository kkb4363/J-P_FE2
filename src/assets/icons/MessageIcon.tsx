interface Props {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
}

const MessageIcon = ({
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
        d="M7.69999 7.19999H16.1M7.69999 12H12.5M12.1869 16.5913L7.17825 21.6V16.5913H5.29999C3.97451 16.5913 2.89999 15.5168 2.89999 14.1913V4.79999C2.89999 3.47451 3.97451 2.39999 5.29999 2.39999H19.7C21.0255 2.39999 22.1 3.47451 22.1 4.79999V14.1913C22.1 15.5168 21.0255 16.5913 19.7 16.5913H12.1869Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MessageIcon;

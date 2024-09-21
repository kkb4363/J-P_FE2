interface Props {
  stroke?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
}

const TrashIcon = ({ stroke = "#B8B8B8", strokeWidth = 1.5, width = 18, height = 21 }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 21"
      fill="none"
    >
      <path
        d="M1 4.67647H17M6 1.5H12M7 15.2647V8.91177M11 15.2647V8.91177M12.5 19.5H5.5C4.39543 19.5 3.5 18.5519 3.5 17.3824L3.0434 5.77937C3.01973 5.17783 3.47392 4.67647 4.04253 4.67647H13.9575C14.5261 4.67647 14.9803 5.17783 14.9566 5.77937L14.5 17.3824C14.5 18.5519 13.6046 19.5 12.5 19.5Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrashIcon;

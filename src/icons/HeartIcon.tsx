interface Props {
  fill?: string;
  stroke?: string;
}

const HeartIcon = ({ fill = "none", stroke = "#B8B8B8" }: Props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1024_5713)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.53012 4.1376C3.13021 3.53769 3.94399 3.20068 4.79252 3.20068C5.64104 3.20068 6.45483 3.53769 7.05492 4.1376L7.99252 5.0744L8.93012 4.1376C9.22531 3.83197 9.57841 3.58818 9.96882 3.42048C10.3592 3.25277 10.7791 3.16449 11.204 3.1608C11.6289 3.15711 12.0503 3.23807 12.4436 3.39897C12.8368 3.55987 13.1941 3.79748 13.4946 4.09794C13.795 4.39839 14.0326 4.75568 14.1935 5.14895C14.3544 5.54222 14.4354 5.96359 14.4317 6.38848C14.428 6.81338 14.3397 7.23328 14.172 7.62369C14.0043 8.01411 13.7605 8.36721 13.4549 8.6624L7.99252 14.1256L2.53012 8.6624C1.93021 8.06231 1.5932 7.24853 1.5932 6.4C1.5932 5.55147 1.93021 4.73769 2.53012 4.1376V4.1376Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1024_5713">
          <rect
            width="16"
            height="16"
            fill={fill}
            transform="translate(-0.00747681)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HeartIcon;

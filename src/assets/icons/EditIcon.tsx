interface Props {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
}

const EditIcon = ({
  fill = "none",
  stroke = "#1a1a1a",
  width = "16",
  height = "17",
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 17"
      fill={fill}
    >
      <path
        d="M7.39885 3.03579H3.60785C2.35162 3.03579 1.33325 4.05413 1.33325 5.31031V12.8921C1.33325 14.1483 2.35162 15.1667 3.60785 15.1667H11.1898C12.4461 15.1667 13.4644 14.1483 13.4644 12.8921L13.4644 9.10123M5.12425 11.3757L7.88282 10.8199C8.02926 10.7904 8.16373 10.7183 8.26933 10.6126L14.4447 4.4341C14.7407 4.13788 14.7405 3.65771 14.4442 3.36173L13.1361 2.05509C12.8399 1.75923 12.3599 1.75943 12.064 2.05554L5.88798 8.2347C5.78259 8.34015 5.71062 8.47434 5.68108 8.62048L5.12425 11.3757Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EditIcon;

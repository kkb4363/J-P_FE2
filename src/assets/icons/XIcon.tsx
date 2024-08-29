interface Props {
  fill?: string;
  stroke?: string;
  handleClick?: () => void;
}

const XIcon = ({ fill = "none", stroke = "white", handleClick }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={fill}
    >
      <path
        d="M13.3337 6.66663L6.66699 13.3333M13.3337 13.3333L6.66699 6.66662"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default XIcon;

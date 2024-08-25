interface Props {
  fill?: string;
  stroke?: string;
}

const PenIcon = ({ fill = "none", stroke = "#1a1a1a" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={fill}
    >
      <path
        d="M9.19976 13.0344H13.1998M2.7998 13.0344L5.71046 12.4479C5.86498 12.4168 6.00686 12.3407 6.11828 12.2292L12.6341 5.70982C12.9465 5.39725 12.9463 4.8906 12.6336 4.57829L11.2533 3.19957C10.9408 2.88739 10.4344 2.88761 10.1221 3.20005L3.60565 9.72008C3.49444 9.83135 3.4185 9.97294 3.38734 10.1271L2.7998 13.0344Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PenIcon;

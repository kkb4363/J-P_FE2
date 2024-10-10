interface Props { 
	stroke?: string
}
const EatIcon = ({stroke = "#6978F8"}: Props) => {
	return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M3.2 16V8.68C2.29333 8.49333 1.53351 8.12 0.920533 7.56C0.307555 7 0.000711111 6.34667 0 5.6V0H2.13333V5.6H3.2V0H5.33333V5.6H6.4V0H8.53333V5.6C8.53333 6.34667 8.22684 7 7.61387 7.56C7.00089 8.12 6.24071 8.49333 5.33333 8.68V16H3.2ZM13.8667 16V9.6H10.6667V4C10.6667 2.89333 11.1868 1.95013 12.2272 1.1704C13.2676 0.390667 14.5252 0.000533333 16 0V16H13.8667Z"
        fill={stroke}
      />
    </svg>
  );
}

export default EatIcon
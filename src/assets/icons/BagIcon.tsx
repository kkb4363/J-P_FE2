interface Props { 
	stroke?: string;
}

const BagIcon = ({ stroke = "#6979F8" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M11.6998 6.3V4.05C11.6998 2.55883 10.491 1.35 8.9998 1.35C7.50864 1.35 6.2998 2.55883 6.2998 4.05V6.3M3.54526 16.65H14.4543C15.4183 16.65 16.1998 15.8831 16.1998 14.937L15.0816 5.84997C15.0816 4.9039 14.3002 4.13696 13.3362 4.13696H4.44526C3.48127 4.13696 2.6998 4.9039 2.6998 5.84997L1.7998 14.937C1.7998 15.8831 2.58127 16.65 3.54526 16.65Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BagIcon;
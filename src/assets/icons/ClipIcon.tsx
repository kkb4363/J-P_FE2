interface Props {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
}

const ClipIcon = ({ fill = "none", stroke = "#6979F8" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={fill}
    >
      <path
        d="M11.6736 5.42203L6.94031 10.1553C6.37748 10.7181 5.46494 10.7181 4.90211 10.1553C4.3381 9.59125 4.33945 8.67639 4.90513 8.11405L8.57562 4.46523L9.4974 3.54345C10.619 2.42189 12.4374 2.42189 13.5589 3.54345C14.6805 4.66501 14.6805 6.48341 13.5589 7.60497L12.651 8.51289L9.21 11.9539C7.43005 13.808 4.73297 14.0901 2.84723 12.2798C0.984587 10.4917 1.3003 7.81085 3.18363 5.92752L6.61108 2.49955"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ClipIcon;

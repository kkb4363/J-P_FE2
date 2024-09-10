interface Props { 
  stroke?: string;
}

const FileCheckIcon = ({ stroke = "#6979F8" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
    >
      <path
        d="M7.72483 16.7H4.12482C3.13071 16.7 2.32482 15.8941 2.32483 14.9L2.3249 4.10004C2.32491 3.10593 3.13079 2.30005 4.1249 2.30005H12.2251C13.2192 2.30005 14.0251 3.10594 14.0251 4.10005V9.05005M10.4251 14.15L12.0751 15.8L15.6751 12.1999M5.47511 5.90005H10.8751M5.47511 8.60005H10.8751M5.47511 11.3H8.17511"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FileCheckIcon;

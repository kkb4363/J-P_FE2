interface Props {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
}

const UserIcon = ({ fill = "none", stroke = "#6979F8" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 18 18"
      fill={fill}
    >
      <path
        d="M3.5 15C3.88431 14.5696 5.68421 12.5889 6.21167 12.5889H11.7887C12.553 12.5889 14.1133 14.2307 14.5 14.8095M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9ZM11.8657 6.2733C11.8657 4.74704 10.5773 3.5 9.00024 3.5C7.42326 3.5 6.13478 4.74704 6.13478 6.2733C6.13478 7.79956 7.42326 9.0466 9.00024 9.0466C10.5772 9.0466 11.8657 7.79956 11.8657 6.2733Z"
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
};

export default UserIcon;

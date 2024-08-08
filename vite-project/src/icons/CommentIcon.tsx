interface Props {
  fill?: string;
  stroke?: string;
}

const CommentIcon = ({ fill = "none", stroke = "#B8B8B8" }: Props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.4818 10.4237C13.8094 9.68253 13.9914 8.86252 13.9914 8C13.9914 4.68629 11.3053 2 7.99195 2C4.67856 2 1.99252 4.68629 1.99252 8C1.99252 11.3137 4.67856 14 7.99195 14C9.05873 14 10.0605 13.7215 10.9285 13.2334L13.9925 13.9994L13.4818 10.4237Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CommentIcon;

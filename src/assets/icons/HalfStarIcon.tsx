interface Props {
  fill?: string;
  stroke?: string;
  width?: string;
  height?: string;
}
export const HalfStarIcon = ({
  fill = "#FFD990",
  stroke = "#FFD990",
  width = "16",
  height = "16",
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="half">
          <rect x="0" y="0" width="8" height="16" />
        </clipPath>
      </defs>
      <path
        d="M7.66335 1.80928C7.80106 1.53025 8.19895 1.53025 8.33666 1.80928L10.1193 5.42136C10.174 5.53217 10.2797 5.60896 10.402 5.62673L14.3882 6.20596C14.6961 6.2507 14.819 6.62912 14.5962 6.84631L11.7118 9.65793C11.6233 9.74417 11.583 9.86844 11.6038 9.99022L12.2848 13.9603C12.3374 14.267 12.0155 14.5008 11.74 14.356L8.1747 12.4816C8.06533 12.4241 7.93467 12.4241 7.8253 12.4816L4.25996 14.356C3.98455 14.5008 3.66265 14.267 3.71525 13.9603L4.39617 9.99022C4.41705 9.86844 4.37668 9.74417 4.2882 9.65793L1.40378 6.84631C1.18096 6.62912 1.30391 6.2507 1.61184 6.20596L5.59801 5.62673C5.72029 5.60896 5.82599 5.53217 5.88068 5.42136L7.66335 1.80928Z"
        fill={fill}
        stroke={stroke}
        strokeLinejoin="round"
        clipPath="url(#half)"
      />
    </svg>
  );
};

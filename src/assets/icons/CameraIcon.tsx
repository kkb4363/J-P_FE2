interface Props {
  fill?: string;
  stroke?: string;
}

const CameraIcon = ({ fill = "#B8B8B8", stroke = "#E6E6E6" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={fill}
    >
      <path
        d="M6 5.09995V5.84995C6.26675 5.84995 6.51343 5.70827 6.64783 5.47785L6 5.09995ZM7.4 2.69995V1.94995C7.13325 1.94995 6.88657 2.09163 6.75216 2.32205L7.4 2.69995ZM12.6 2.69995L13.2478 2.32205C13.1134 2.09163 12.8667 1.94995 12.6 1.94995V2.69995ZM14 5.09995L13.3522 5.47785C13.4866 5.70827 13.7332 5.84995 14 5.84995V5.09995ZM2.75 15.2999V7.09995H1.25V15.2999H2.75ZM4 5.84995H6V4.34995H4V5.84995ZM6.64783 5.47785L8.04783 3.07785L6.75216 2.32205L5.35217 4.72205L6.64783 5.47785ZM7.4 3.44995H12.6V1.94995H7.4V3.44995ZM11.9522 3.07785L13.3522 5.47785L14.6478 4.72205L13.2478 2.32205L11.9522 3.07785ZM14 5.84995H16V4.34995H14V5.84995ZM17.25 7.09995V15.3H18.75V7.09995H17.25ZM17.25 15.3C17.25 15.9903 16.6904 16.5499 16 16.5499V18.0499C17.5188 18.0499 18.75 16.8187 18.75 15.3H17.25ZM16 5.84995C16.6904 5.84995 17.25 6.40959 17.25 7.09995H18.75C18.75 5.58117 17.5188 4.34995 16 4.34995V5.84995ZM2.75 7.09995C2.75 6.40959 3.30964 5.84995 4 5.84995V4.34995C2.48122 4.34995 1.25 5.58117 1.25 7.09995H2.75ZM4 16.5499C3.30964 16.5499 2.75 15.9903 2.75 15.2999H1.25C1.25 16.8187 2.48122 18.0499 4 18.0499V16.5499ZM12.25 10.7C12.25 11.9426 11.2426 12.95 10 12.95V14.45C12.0711 14.45 13.75 12.771 13.75 10.7H12.25ZM10 12.95C8.75736 12.95 7.75 11.9426 7.75 10.7H6.25C6.25 12.771 7.92893 14.45 10 14.45V12.95ZM7.75 10.7C7.75 9.45731 8.75736 8.44995 10 8.44995V6.94995C7.92893 6.94995 6.25 8.62888 6.25 10.7H7.75ZM10 8.44995C11.2426 8.44995 12.25 9.45731 12.25 10.7H13.75C13.75 8.62888 12.0711 6.94995 10 6.94995V8.44995ZM16 16.5499H4V18.0499H16V16.5499Z"
        fill={fill}
      />
    </svg>
  );
};

export default CameraIcon;

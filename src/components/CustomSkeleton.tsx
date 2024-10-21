import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled, { keyframes } from "styled-components";

interface Props {
  width?: string;
  height?: string;
  borderRadius?: string;
  [x: string]: any;
}

export default function CustomSkeleton({
  width = "100%",
  height = "100%",
  borderRadius = "4px",
  ...props
}: Props) {
  return (
    <AnimatedSkeleton
      width={width}
      height={height}
      borderRadius={borderRadius}
      {...props}
    />
  );
}

const customAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const AnimatedSkeleton = styled(Skeleton)<Props>`
  animation: ${customAnimation} 1.8s ease-in-out infinite;
  background: linear-gradient(to right, #eeeeee 0%, #dddddd 50%, #eeeeee 100%);
  background-size: 400% 100%;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
`;

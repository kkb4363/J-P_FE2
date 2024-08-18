import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
    <Skeleton
      width={width}
      height={height}
      borderRadius={borderRadius}
      {...props}
    />
  );
}

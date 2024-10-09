import { useEffect, useState } from "react";

interface Props {
  imgSrc: string;
}

export default function useImgLoading({ imgSrc }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => setLoading(false);
  }, [imgSrc]);

  return { loading };
}

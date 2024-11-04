import { useRef, useState } from "react";

export default function useImageUploadHook() {
  const imgRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState("");
  const [newImg, setNewImg] = useState(null);

  const handleImageChange = (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setImgSrc(URL.createObjectURL(selectedFile));
      setNewImg(selectedFile);
    }
  };

  const handleClick = () => {
    if (imgRef.current) {
      return imgRef.current.click();
    }
  };

  return { imgRef, imgSrc, newImg, handleImageChange, handleClick };
}

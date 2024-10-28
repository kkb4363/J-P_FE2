import { useRef, useState } from "react";
import testImg from "../assets/images/testImg.png";

export default function useImageUploadHook() {
  const imgRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState(testImg);
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

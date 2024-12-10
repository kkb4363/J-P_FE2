import { useRef } from "react";
import { useWriteReviewStore } from "../store/writeReview.store";

export default function useImagesUploadHook() {
  const { getSelectedImg, setSelectedImg } = useWriteReviewStore();

  const imageRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: any) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length + getSelectedImg().length > 10) {
      alert("이미지는 최대 10장까지 업로드 가능합니다");
      return;
    }

    const prevImage = getSelectedImg();

    const newImage = [...prevImage, ...selectedFiles];

    setSelectedImg(newImage);
  };

  const handleButtonClick = () => {
    imageRef.current?.click();
  };

  const handleImageDelete = (lastModified: number) => {
    const newImages = getSelectedImg().filter(
      (prev: File) => prev.lastModified !== lastModified
    );
    setSelectedImg(newImages);
  };

  return {
    imageRef,
    images: getSelectedImg(),
    handleImageChange,
    handleButtonClick,
    handleImageDelete,
  };
}

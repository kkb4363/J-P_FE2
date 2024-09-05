import { useEffect, useRef, useState } from "react";

interface Props {
  handleCloseCallback: () => void;
}

export const useModal = ({ handleCloseCallback }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
      handleCloseCallback();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return { isOpen, openModal, closeModal, modalRef };
};

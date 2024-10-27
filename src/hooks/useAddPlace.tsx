import { useState } from "react";

export default function useAddPlaceHook() {
  const [list, setList] = useState<number[]>([]);

  const handleAdd = (id: number) => {
    setList((prevList) => [...prevList, id]);
  };

  const handleRemove = (id: number) => {
    const newList = list.filter((prev) => prev !== id);
    setList(newList);
  };

  const [openModal, setOpenModal] = useState({
    selectDay: false,
    selectTime: false,
  });

  const handleDaySelect = () => {
    setOpenModal((p) => ({ ...p, selectDay: false, selectTime: true }));
  };

  return {
    list,
    handleAdd,
    handleRemove,
    openModal,
    setOpenModal,
    handleDaySelect,
  };
}

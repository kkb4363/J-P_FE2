import { useState } from "react";
import { GooglePlaceProps } from "../types/home.details";

export default function useAddPlaceHook() {
  const [list, setList] = useState<GooglePlaceProps[]>([]);
  const [selectDay, setSelectDay] = useState<number>(1);
  const [selectTime, setSelectTime] = useState<string>();

  const handleAdd = (place: GooglePlaceProps) => {
    setList((prevList) => [...prevList, place]);
  };

  const handleRemove = (placeId: string) => {
    const newList = list.filter((prev) => prev.placeId !== placeId);
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
    selectDay,
    setSelectDay,
    selectTime,
    setSelectTime,
    handleAdd,
    handleRemove,
    openModal,
    setOpenModal,
    handleDaySelect,
  };
}

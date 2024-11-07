import { useState } from "react";
import { useUserStore } from "../store/user.store";
import { placeApiProps } from "../types/home";
import { getSearchPlaceList } from "../utils/axios";

export default function useSearchHook() {
  const userStore = useUserStore();
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState<placeApiProps[]>([]);
  const [deleteEveryOpen, setDeleteEveryOpen] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData([]);
    setSearch(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userStore.addSearchData(search);
    getSearchPlace();
  };

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      getSearchPlace();
      userStore.addSearchData(search);
    }
  };

  const handleRecentWordClick = async (s: string) => {
    await getSearchPlaceList({ searchString: s + "", page: 1 }).then((res) => {
      setSearchData(res?.data.data);
      setSearch(s);
      userStore.addSearchData(s);
    });
  };

  const getSearchPlace = async () => {
    await getSearchPlaceList({ searchString: search + "", page: 1 }).then(
      (res) => {
        setSearchData(res?.data.data);
      }
    );
  };

  const handleDeleteEvery = () => {
    userStore.clearSearchData();
    setDeleteEveryOpen(false);
  };

  const handleDeleteOpen = () => {
    setDeleteEveryOpen((p) => !p);
  };

  return {
    search,
    searchData,
    setSearch,
    handleInput,
    handleInputEnter,
    handleInputSubmit,
    handleDeleteEvery,
    deleteEveryOpen,
    handleDeleteOpen,
    handleRecentWordClick,
  };
}

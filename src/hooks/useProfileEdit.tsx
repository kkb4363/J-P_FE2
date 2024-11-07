import React, { useRef, useState } from "react";
import { useUserStore } from "../store/user.store";
import { useNavigate } from "react-router-dom";
import { updateUser, uploadProfileImg } from "../utils/axios";

interface Props {
  newImg: any;
}

export default function useProfileEditHook({ newImg }: Props) {
  const newNameRef = useRef<HTMLInputElement>(null);
  const userStore = useUserStore();
  const navigate = useNavigate();

  const [newName, setNewName] = useState("");

  const canSubmit =
    (!!newName && newName !== userStore.getUserName()) || newImg !== null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewName(e.target.value);
  };

  const handleNameDelete = () => {
    if (newNameRef?.current) {
      newNameRef.current.value = "";
      setNewName("");
    }
  };

  const handleSubmit = () => {
    const oldName = userStore.getUserName();
    const promises = [];

    if (!!newName && newName !== oldName) {
      promises.push(
        updateUser({ name: newName, type: userStore.getUserType() })
      );
    }

    if (newImg) {
      promises.push(uploadProfileImg({ file: newImg }));
      // promises.push(deleteProfileImg().then((res) => console.log(res)));
    }

    Promise.all(promises).then((res) => {
      if (res) {
        if (newName !== oldName) {
          userStore.setUserName(newName);
          navigate(-1);
        }

        const imgRes = res.find((res) => res?.data?.data);
        if (imgRes) {
          userStore.setUserProfile(imgRes.data.data);
          navigate(-1);
        }
      }
    });
  };
  return {
    newNameRef,
    canSubmit,
    handleNameChange,
    handleNameDelete,
    handleSubmit,
  };
}

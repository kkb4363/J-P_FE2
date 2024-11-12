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
      if (newImg.size > 1024 * 1024) {
        return alert("이미지 용량은 1MB 이하로 업로드해주세요.");
      }
      promises.push(uploadProfileImg({ file: newImg }));
    }

    Promise.all(promises).then((res) => {
      if (res) {
        if (newName !== oldName) {
          userStore.setUserName(newName);
        }

        const imgRes = res?.find((r) => r?.data?.data);
        if (imgRes) {
          userStore.setUserProfile(imgRes?.data.data);
        }

        if (newName !== oldName || imgRes) {
          navigate(-1);
        }
      }
    });
  };

  // promises.push(deleteProfileImg().then((res) => console.log(res)));

  return {
    newNameRef,
    canSubmit,
    handleNameChange,
    handleNameDelete,
    handleSubmit,
  };
}

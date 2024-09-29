import axios from "axios";
import { UserInfoProps } from "./axios.type";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
});

export const updateUser = async ({ name, type }: UserInfoProps) => {
  try {
    const body = {
      nickname: name,
      mbti: type,
    };
    const res = await axiosInstance.patch("/user", body, {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.error("유저 정보 업데이트 에러=", err);
  }
};

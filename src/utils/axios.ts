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
    console.error("유저 정보 업데이트 API 에러", err);
  }
};

export const getPlaceList = async ({
  type,
  page = 1,
  elementCnt = 10,
  cityType,
}: {
  type: string;
  page?: number;
  elementCnt?: number;
  cityType?: string | null;
}) => {
  try {
    if (!!cityType) {
      const res = await axiosInstance.get(
        `/place/page?page=${page}&placeType=${type}&elementCnt=${elementCnt}&cityType=${cityType}`
      );
      if (res.status === 200) {
        return res;
      }
    } else {
      const res = await axiosInstance.get(
        `/place/page?page=${page}&placeType=${type}&elementCnt=${elementCnt}`
      );
      if (res.status === 200) {
        return res;
      }
    }
  } catch (err) {
    console.error("장소 페이지 조회 API 에러", err);
  }
};

export const getPlaceDetail = async ({ placeId }: { placeId: string }) => {
  try {
    const res = await axiosInstance.get(`/place/details/${placeId}`);

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("장소 상세 페이지 API 에러", err);
  }
};

export const getReviews = async ({ placeId }: { placeId: string }) => {
  try {
    const res = await axiosInstance.get(
      `/reviews?page=1&sort=HOT&placeId=${placeId}`
    );

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("리뷰 조회 API 에러", err);
  }
};

export const getSurroundingPlace = async ({
  lat,
  lng,
}: {
  lat: string;
  lng: string;
}) => {
  try {
    const res = await axiosInstance(
      `/googleplace/nearby-search/page?lat=${lat}&lng=${lng}&radius=10`
    );

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("주변 장소 API 에러", err);
  }
};

export const getGooglePlaceDetail = async ({
  placeId,
}: {
  placeId: string;
}) => {
  try {
    const res = await axiosInstance.get(
      `/googleplace/details?placeId=${placeId}`
    );

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("구글플레이스 상세 정보 API 에러", err);
  }
};

export const getMyReviews = async () => {
  try {
    const res = await axiosInstance.get("/my/reviews?page=1", {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });
  } catch (err) {
    console.error("내 리뷰 조회 API 에러", err);
  }
};

export const getSearchPlaceList = async ({
  searchString,
  page = 1,
}: {
  searchString: string;
  page?: number;
}) => {
  try {
    const res = await axiosInstance.get(
      `/place/page?page=${page}&searchString=${searchString}`
    );

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("검색 장소 페이징 조회 API 에러", err);
  }
};

export const getMyLikes = async () => {
  try {
    const res = await axiosInstance.get("/like/page/my?page=1", {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("내 찜 목록 조회 API 에러", err);
  }
};

export const getMyProfile = async () => {
  try {
    const res = await axiosInstance.get("/user/me", {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("내 프로필 조회 API 에러", err);
  }
};

export const getMySchedules = async () => {
  try {
    const res = await axiosInstance.get("/schedules/my?page=1", {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("내 일정 리스트 조회 API 에러", err);
  }
};

export const getRecommendSchedules = async () => {
  try {
    const res = await axiosInstance.get("/schedules?page=1", {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("추천 일정 리스트 조회 API 에러", err);
  }
};

export const setLike = async ({ type, id }: { type: string; id: string }) => {
  try {
    const res = await axiosInstance.post(
      `/like/${type}/${id}`,
      {},
      {
        headers: {
          Authorization: cookies.get("userToken"),
        },
      }
    );

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("좋아요/찜 API 에러", err);
  }
};

export const getLikes = async () => {
  try {
    const res = await axiosInstance.get("/like/page/my?page=1", {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("좋아요/찜 조회 API 에러", err);
  }
};

export const uploadProfileImg = async ({ file }: { file: File }) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axiosInstance.post(`/profile/upload`, formData, {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("유저 프로필 사진 업로드 API 에러", err);
  }
};

export const deleteProfileImg = async () => {
  try {
    const res = await axiosInstance.delete("/profile/delete", {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("유저 프로필 사진 삭제 API 에러", err);
  }
};

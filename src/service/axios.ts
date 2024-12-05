import axios from "axios";
import { Cookies } from "react-cookie";
import { UserInfoProps } from "../types/axios.type";
import { DayLocationProps } from "../types/res.dto";
import { PlanDetailsProps } from "../types/schedule";

const cookies = new Cookies();

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
});

export const refreshToken = async () => {
  try {
    const res = await axiosInstance.post(
      `/auth/refresh`,
      {},
      {
        headers: {
          Authorization: cookies.get("userToken"),
          withCredentials: true,
        },
      }
    );

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("엑세스 토큰 재발급 API 에러", err);
  }
};

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
    const res = await axiosInstance.get(`/place/details/${placeId}`, {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });

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

    if (res.status === 200) {
      return res;
    }
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

export const getLikes = async ({
  likeType,
  placeType,
}: {
  likeType?: string;
  placeType?: string;
}) => {
  try {
    if (!!likeType) {
      if (likeType === "PLACE") {
        const res = await axiosInstance.get(
          `/like/page/my?likeType=${likeType}&placeType=${placeType}&page=1`,
          {
            headers: {
              Authorization: cookies.get("userToken"),
            },
          }
        );

        if (res.status === 200) {
          return res;
        }
      } else {
        const res = await axiosInstance.get(
          `/like/page/my?likeType=${likeType}&page=1`,
          {
            headers: {
              Authorization: cookies.get("userToken"),
            },
          }
        );

        if (res.status === 200) {
          return res;
        }
      }
    }

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

export const createSchedule = async (schedule: {
  startDate: string;
  endDate: string;
  placeId: string;
}) => {
  try {
    const res = await axiosInstance.post(`/schedule`, schedule, {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });
    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("일정 초기 생성 API 에러", err);
  }
};

export const getScheduleList = async () => {
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

export const getSchedule = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/schedule/${id}`, {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });
    if (res.status == 200) {
      return res;
    }
  } catch (err) {
    console.error("일정 상세조회 API 에러", err);
  }
};

export const getGoogleSearchPlaceList = async (
  contents: string,
  nextPageToken?: string
) => {
  try {
    const url = nextPageToken
      ? `/googleplace/text-search/page?contents=${contents}&nextPageToken=${nextPageToken}`
      : `/googleplace/text-search/page?contents=${contents}`;
    const res = await axiosInstance.get(url);
    if (res.status == 200) {
      return res.data;
    }
  } catch (err) {
    console.error("구글 플레이스 장소 검색 API 에러", err);
  }
};

export const addPlaceToSchedule = async (
  dayId: number,
  mbti: string,
  places: {
    time: string;
    location: { lat: number; lng: number };
    placeId: string;
    name: string;
  }[]
) => {
  try {
    const res = await axiosInstance.post(
      `/schedule/location/${dayId}?mbti=${mbti}`,
      places,
      {
        headers: {
          Authorization: cookies.get("userToken"),
        },
      }
    );
    if (res.status == 200) {
      return res;
    }
  } catch (err) {
    console.error("일정 장소 추가 API 에러", err);
  }
};

export const moveScheduleDate = async (
  locationId: number,
  body: {
    newDayId: number;
    time: string;
  }
) => {
  try {
    const res = await axiosInstance.put(
      `/schedule/location/${locationId}`,
      body,
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
    console.error("일정 장소 날짜 이동 API 에러", err);
  }
};

export const editSchedule = async (dayId: number, body: DayLocationProps[]) => {
  try {
    const res = await axiosInstance.put(`/schedule/day/${dayId}`, body, {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });
    if (res.status == 200) {
      return res;
    }
  } catch (err) {
    console.error("일정 편집 API 에러", err);
  }
};

export const deletePlaceFromSchedule = async (locationId: number) => {
  try {
    const res = await axiosInstance.delete(`/schedule/location/${locationId}`, {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });
    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("일정 장소 삭제 API 에러", err);
  }
};

export const getDaylistFromSchedule = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/schedule/days/${id}`, {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });
    if (res.status == 200) {
      return res;
    }
  } catch (err) {
    console.error("Day 리스트 조회 API 에러", err);
  }
};

export const deleteSchedule = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/schedule/${id}`, {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });
    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("일정 삭제 API 에러", err);
  }
};

export const getPlan = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/schedule/location/${id}`, {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });
    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("장소 상세조회 API 에러", err);
  }
};

export const editPlan = async (id: number, body: PlanDetailsProps) => {
  try {
    const res = await axiosInstance.put(`/schedule/location/plan/${id}`, body, {
      headers: {
        Authorization: cookies.get("userToken"),
      },
    });
    if (res.status == 200) {
      return res;
    }
  } catch (err) {
    console.error("플랜 편집 API 에러", err);
  }
};

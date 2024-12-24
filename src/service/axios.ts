import axios from "axios";
import { Cookies } from "react-cookie";
import { UserInfoProps } from "../types/mypage";
import { DayLocationProps, PlanDetailsProps } from "../types/schedule";

const cookies = new Cookies();

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookies.get("userToken");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const refreshToken = async () => {
  try {
    const res = await axiosInstance.post(`/auth/refresh`, {});

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
    const res = await axiosInstance.patch("/user", body);
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

export const getReviews = async ({
  page,
  sort,
  placeId,
}: {
  page: number;
  sort: string;
  placeId?: string;
}) => {
  try {
    const url = placeId
      ? `/reviews?page=${page}&sort=${sort}&placeId=${placeId}`
      : `/reviews?page=${page}&sort=${sort}`;

    const res = await axiosInstance.get(url);

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("리뷰 조회 API 에러", err);
  }
};

export const getReviewDetail = async (reviewId: number) => {
  try {
    const res = await axiosInstance.get(`/review/${reviewId}`);

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error(err);
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
    const res = await axiosInstance.get("/my/reviews?page=1");

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
    const res = await axiosInstance.get("/user/me");

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("내 프로필 조회 API 에러", err);
  }
};

export const getRecommendSchedules = async () => {
  try {
    const res = await axiosInstance.get("/schedules?page=1");

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("추천 일정 리스트 조회 API 에러", err);
  }
};

export const setLike = async ({
  actionType,
  targetType,
  id,
}: {
  actionType: string;
  targetType: string;
  id: string;
}) => {
  try {
    const res = await axiosInstance.post(
      `/like/${actionType}/${targetType}/${id}`,
      {}
    );

    if (res.status === 200 || res.status === 201) {
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
          `/like/page/my?likeTargetType=${likeType}&placeType=${placeType}&page=1`
        );

        if (res.status === 200) {
          return res;
        }
      } else {
        const res = await axiosInstance.get(
          `/like/page/my?likeType=${likeType}&page=1`
        );

        if (res.status === 200) {
          return res;
        }
      }
    }

    const res = await axiosInstance.get("/like/page/my?page=1");

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
    const res = await axiosInstance.post(`/profile/upload`, formData);

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("유저 프로필 사진 업로드 API 에러", err);
  }
};

export const deleteProfileImg = async () => {
  try {
    const res = await axiosInstance.delete("/profile/delete");

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
    const res = await axiosInstance.post(`/schedule`, schedule);
    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("일정 초기 생성 API 에러", err);
  }
};

export const getScheduleList = async () => {
  try {
    const res = await axiosInstance.get("/schedules/my?page=1");

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("내 일정 리스트 조회 API 에러", err);
  }
};

export const getSchedule = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/schedule/${id}`);
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
  places: {
    time: string;
    location: { lat: number; lng: number };
    placeId: string;
    name: string;
  }[],
  jpState: string
) => {
  try {
    const res = await axiosInstance.post(
      `/schedule/location/${dayId}?mbti=${jpState}`,
      places
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
    time?: string;
  },
  jpState: string
) => {
  try {
    const res = await axiosInstance.put(
      `/schedule/location/${locationId}?mbti=${jpState}`,
      body
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
    const res = await axiosInstance.put(`/schedule/day/${dayId}`, body);
    if (res.status == 200) {
      return res;
    }
  } catch (err) {
    console.error("일정 편집 API 에러", err);
  }
};

export const deletePlaceFromSchedule = async (locationId: number) => {
  try {
    const res = await axiosInstance.delete(`/schedule/location/${locationId}`);
    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("일정 장소 삭제 API 에러", err);
  }
};

export const getDaylistFromSchedule = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/schedule/days/${id}`);
    if (res.status == 200) {
      return res;
    }
  } catch (err) {
    console.error("Day 리스트 조회 API 에러", err);
  }
};

export const deleteSchedule = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/schedule/${id}`);
    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("일정 삭제 API 에러", err);
  }
};

export const getPlan = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/schedule/location/${id}`);
    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("장소 상세조회 API 에러", err);
  }
};

export const editPlan = async (id: number, body: PlanDetailsProps) => {
  try {
    const res = await axiosInstance.put(`/schedule/location/plan/${id}`, body);
    if (res.status == 200) {
      return res;
    }
  } catch (err) {
    console.error("플랜 편집 API 에러", err);
  }
};

export const getAllDiaries = async (
  page: number,
  sort: string,
  placeId?: string
) => {
  try {
    let res;

    if (placeId) {
      res = await axiosInstance.get(
        `/diaries?page=${page}&sort=${sort}&placeId=${placeId}`
      );
    } else {
      res = await axiosInstance.get(`/diaries?page=${page}&sort=${sort}`);
    }

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("전체 여행기 조회 API 에러", err);
  }
};

export const getMyDiaries = async () => {
  try {
    const res = await axiosInstance.get(`/my/diaries?page=1`);

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("내 여행기 조회 API 에러", err);
  }
};

export const createDiary = async (form: any, id: number) => {
  try {
    const res = await axiosInstance.post(`/${id}/diary`, form);

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("여행기 작성 API 에러", err);
  }
};

export const createReview = async (form: any) => {
  try {
    const res = await axiosInstance.post(`/review`, form);

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("리뷰 작성 API 에러", err);
  }
};

export const uploadFiles = async (files: any[], category: string) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    const res = await axiosInstance.post(`/upload/files/${category}`, formData);

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("파일 업로드 API 에러", err);
  }
};

export const getDiaryDetail = async (id: number) => {
  try {
    const res = await axiosInstance.get(`/diary/${id}`);

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("여행기 상세 조회 API 에러", err);
  }
};

export const updateDiary = async (form: any, id: number) => {
  try {
    const res = await axiosInstance.patch(`/diary/${id}`, form);

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("여행기 수정 API 에러", err);
  }
};

export const updateReview = async (form: any, id: number) => {
  try {
    const res = await axiosInstance.patch(`/review/${id}`, form);

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("리뷰 수정 API 에러", err);
  }
};

export const setComment = async ({
  targetId,
  commentType,
  content,
}: {
  targetId: number;
  commentType: string;
  content: string;
}) => {
  try {
    const body = {
      content: content,
    };

    const res = await axiosInstance.post(
      `/comment/${targetId}?commentType=${commentType}`,
      body
    );

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("댓글 작성 API 에러", err);
  }
};

export const setCommentReply = async ({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}) => {
  try {
    const body = {
      content: content,
    };

    const res = await axiosInstance.post(`/reply/${commentId}`, body);

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("대댓글 작성 API 에러", err);
  }
};

export const updateComment = async ({
  type,
  id,
  content,
}: {
  type: "reply" | "comment";
  id: number;
  content: string;
}) => {
  try {
    const body = {
      content: content,
    };

    let res;

    if (type === "comment") {
      res = await axiosInstance.patch(`/comment/${id}`, body);
    } else {
      res = await axiosInstance.patch(`/reply/${id}`, body);
    }

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("대/댓글 수정 API 에러", err);
  }
};

export const deleteComment = async ({
  type,
  id,
}: {
  type: "reply" | "comment";
  id: number;
}) => {
  try {
    let res;

    if (type === "comment") res = await axiosInstance.delete(`/comment/${id}`);
    else res = await axiosInstance.delete(`/reply/${id}`);

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error("대/댓글 삭제 API 에러", err);
  }
};

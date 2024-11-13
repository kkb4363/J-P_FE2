import { commentResDto, userCompactResDto } from "./res.dto";

export interface PlaceDetailAPiProps {
  description: string;
  formattedAddress: string;
  id: number;
  isLiked: boolean;
  likeCount: number;
  location: {
    lat: number;
    lng: number;
  };
  name: string;
  photoUrls: string[];
  placeId: string;
  placeType: string;
  tags: string[];
}

export interface GooglePlaceProps {
  placeId: string;
  name: string;
  shortAddress: string;
  formattedAddress: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating: number;
  userRatingsTotal: number;
  photoUrl: string;
}

// 04. [구글 플레이스] /googleplace/details
export interface SelectPlaceProps {
  businessStatus: string;
  fullAddress: string;
  formattedPhoneNumber: string;
  location: {
    lat: number;
    lng: number;
  };
  name: string;
  openNow: boolean;
  photoUrls: string[];
  placeId: string;
  website: string;
  weekdayText: string[];
  rating: number;
  shortAddress: string;
}

export interface ReviewDetailApiProps {
  id: number;
  subject: string;
  content: string;
  userCompactResDto: userCompactResDto;
  placeId: string;
  star: number;
  likeCnt: number;
  viewCnt: number;
  createdAt: string;
  commentResDtoList: commentResDto[];
}

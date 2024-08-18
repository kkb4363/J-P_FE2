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

export interface NearByPlaceProps {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  photoUrls: string[];
  placeId: string;
  rating: number;
  userRatingsTotal: number;
  vicinity: string;
}

export interface ReviewProps {
  commentCnt: number;
  content: string;
  createdAt: string;
  id: number;
  likeCnt: number;
  placeId: string;
  star: number;
  subject: string;
  userCompactResDto: {
    id: number;
    nickname: string;
    picture: string;
  };
}

// 04. [구글 플레이스] /googleplace/details
export interface SelectPlaceProps {
  businessStatus: string;
  formattedAddress: string;
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
}

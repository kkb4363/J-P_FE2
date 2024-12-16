export interface GoogleSearchProps {
  placeId: string;
  name: string;
  formattedAddress: string;
  geometry: {
    lat: number;
    lng: number;
  };
  rating: number;
  userRatingsTotal: number;
  photoUrls: string;
}

export interface SearchPlaceProps {
  id: number;
  name: string;
  photoUrl: string;
  placeId: string;
  placeType: string;
  rating: number;
  subName: string;
  themeType: any;
}

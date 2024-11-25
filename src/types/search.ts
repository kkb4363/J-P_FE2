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

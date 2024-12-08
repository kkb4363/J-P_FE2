export interface ReactMultiCarouselProps {
  [key: string]: {
    breakpoint: { max: number; min: number };
    items: number;
    slidesToSlide: number;
  };
}

export interface GoogleMapProps {
  width: string;
  height: string;
  style?: React.CSSProperties;
  lat?: number;
  lng?: number;
  handleMarkerClick?: (id: string) => void;
  focusCenterId?: string;
}

export interface FilterProps {
  name: string;
  state: string;
}

export interface TestCostProps {
  type: {
    icon: ({ stroke }: { stroke?: string }) => JSX.Element;
    id: string;
    label: string;
  };
  name: string;
  cost: number;
}

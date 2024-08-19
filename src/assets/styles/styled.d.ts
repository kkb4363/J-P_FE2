import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      main: string;
      mainLight: string;
      secondary: string;
      secondaryLight: string;
      pointRed: string;
      pointYellow: string;
      pointCoral: string;
      white: string;
      black: string;
      background: string;
      gray200: string;
      gray300: string;
      gray400: string;
      gray500: string;
      gray600: string;
      gray700: string;
      gray800: string;
      gray900: string;
    };
  }
}

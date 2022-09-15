import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      beige: string;
      blue: string;
      orange: string;
      peach: string;
      lightgray: string;
      gray: string;
    };
    device: {
      mobile: string;
    };
  }
}

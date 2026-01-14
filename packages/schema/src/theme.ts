import type { RadiusKey, SpacingKey } from "./styles";

export interface ForgeUITheme {
  colors: {
    brand: Record<string, string>;
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    background: {
      primary: string;
      surface: string;
    };
    status: {
      success: string;
      warning: string;
      error: string;
    };
  };
  spacing: Record<SpacingKey, string>;
  radius: Record<RadiusKey, string>;
  typography: {
    fonts: {
      heading: string;
      body: string;
      mono: string;
    };
    scales: Record<string, string>;
  };
}

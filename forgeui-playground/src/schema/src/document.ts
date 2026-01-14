
import type { AssetDefinition } from "./assets";
import type { ForgeUINode } from "./node";
import type { ForgeUITheme } from "./theme";

export interface ForgeUIDocument {
  version: string;
  metadata: DocumentMetadata;
  settings: DocumentSettings;
  theme: ForgeUITheme;
  assets: Record<string, AssetDefinition>;
  definitions: Record<string, ForgeUINode>;
  pages: ForgeUIPage[];
  state: Record<string, any>;
  root: ForgeUINode;
}

export interface ForgeUIPage {
  id: string;
  name: string;
  path: string;
  root: ForgeUINode;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  }
}

export type DocumentSettings = {
  responsiveBreakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  baseFontSize: number;
};

export type DocumentMetadata = {
  name: string;
  description?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
};
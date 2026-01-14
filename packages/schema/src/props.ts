export type ContentPrimitive =
  | "Text"
  | "Image"
  | "Button"
  | "Progress"
  | "Shape";

export interface TextProps {
  content: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export interface ImageProps {
  assetId: string;
  objectFit?: "cover" | "contain" | "fill";
}

export interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  isDisabled?: boolean;
  leftIcon?: string;
  rightIcon?: string;
}

export interface ProgressProps {
  value: number;
  max?: number;
  variant?: "linear" | "radial";
  thickness?: number;
}

export interface ShapeProps {
  type: "rect" | "circle" | "triangle";
  fill?: string;
}

export type NodeProps =
  | TextProps
  | ImageProps
  | ButtonProps
  | ProgressProps
  | ShapeProps;

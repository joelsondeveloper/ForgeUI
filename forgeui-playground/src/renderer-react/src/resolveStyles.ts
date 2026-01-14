import { resolveToken } from "./resolveTheme";
import { mergeTokens } from "./mergeStyles";
import { DEFAULTS } from "./defaults";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export function resolveStyles(
  nodeType: string,
  styles: any = {},
  theme: any = {},
  props: any = {}
) {
  const resolved: any = {};

  const getV = (value: any) => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return isMobile
        ? value.mobile || value.desktop
        : value.desktop || value.mobile;
    }
    return value;
  };

  // --- LÓGICA DE VARIANTES (ESTILOS GLOBAIS) ---
  // Busca por 'as' (ex: h1, p) ou pelo tipo do nó (ex: Button)
  const typographyKey = props.as || nodeType;
  const themeTypographyVariant = theme.typography?.variants?.[typographyKey] || {};
  const themeVisualVariant = theme.visual?.variants?.[nodeType] || {};

  // Merge Hierárquico: Default -> Tema -> Local
  const visual = mergeTokens(DEFAULTS.visual, mergeTokens(themeVisualVariant, styles?.visual));
  const typography = mergeTokens(DEFAULTS.typography, mergeTokens(themeTypographyVariant, styles?.typography));
  const layout = mergeTokens(DEFAULTS.layout, styles?.layout);

  // --- 1. BACKGROUND, GRADIENTS & FILTERS ---
  const bgRaw = getV(visual.backgroundColor);
  const gradientResolved = handleGradient(bgRaw, theme.colors);

  if (gradientResolved) {
    resolved.background = gradientResolved;
  } else {
    resolved.backgroundColor = resolveToken(bgRaw, theme.colors, "transparent");
  }

  // Visual Avançado
  resolved.opacity = getV(visual.opacity) ?? 1;
  resolved.backdropFilter = getV(visual.backdropFilter) || "none";
  resolved.filter = getV(visual.filter) || "none";
  resolved.mixBlendMode = getV(visual.mixBlendMode) || "normal";
  resolved.cursor = getV(visual.cursor) || (nodeType === "Button" ? "pointer" : "default");
  
  // Background Props extras
  if (visual.backgroundSize) resolved.backgroundSize = getV(visual.backgroundSize);
  if (visual.backgroundPosition) resolved.backgroundPosition = getV(visual.backgroundPosition);
  if (visual.backgroundRepeat) resolved.backgroundRepeat = getV(visual.backgroundRepeat);

  // --- 2. BORDERS & SHAPES ---
  resolved.borderRadius = resolveToken(getV(visual.borderRadius), theme.radius, "0");
  resolved.border = getV(visual.border) || "none";
  resolved.borderWidth = getV(visual.borderWidth);
  resolved.borderStyle = getV(visual.borderStyle);
  resolved.borderColor = resolveToken(getV(visual.borderColor), theme.colors, "transparent");
  resolved.boxShadow = getV(visual.boxShadow) || "none";
  resolved.outline = getV(visual.outline) || "none";

  // --- 3. ANIMATIONS & TRANSFORMS ---
  resolved.transition = getV(visual.transition) || "all 0.2s ease-in-out";
  resolved.transform = getV(visual.transform) || "none";
  resolved.transformOrigin = getV(visual.transformOrigin) || "center";
  resolved.willChange = getV(visual.willChange) || "auto";

  // --- 4. TYPOGRAPHY ---
  const textColorRaw = getV(typography.color);
  const textGradient = handleGradient(textColorRaw, theme.colors);

  if (textGradient) {
    resolved.backgroundImage = textGradient;
    resolved.WebkitBackgroundClip = "text";
    resolved.WebkitTextFillColor = "transparent";
    resolved.display = "inline-block";
  } else {
    resolved.color = resolveToken(textColorRaw, theme.colors, "inherit");
  }

  resolved.fontSize = resolveToken(getV(typography.fontSize), theme.typography?.size, "inherit");
  resolved.fontWeight = getV(typography.fontWeight) || (nodeType === "Button" ? "700" : "400");
  resolved.lineHeight = getV(typography.lineHeight) || "1.5";
  resolved.letterSpacing = getV(typography.letterSpacing) || "normal";
  resolved.textAlign = getV(typography.textAlign) || "left";
  if (typography.textTransform) resolved.textTransform = getV(typography.textTransform);
  if (typography.textDecoration) resolved.textDecoration = getV(typography.textDecoration);
  if (typography.whiteSpace) resolved.whiteSpace = getV(typography.whiteSpace);

  // --- 5. POSITIONING ---
  resolved.position = getV(layout.position) || "relative";
  if (layout.top !== undefined) resolved.top = getV(layout.top);
  if (layout.right !== undefined) resolved.right = getV(layout.right);
  if (layout.bottom !== undefined) resolved.bottom = getV(layout.bottom);
  if (layout.left !== undefined) resolved.left = getV(layout.left);
  resolved.zIndex = getV(layout.zIndex) || "auto";

  // --- 6. LAYOUT (FLEX & GRID) ---
  if (props?.direction || layout.display === "flex") {
    resolved.display = "flex";
    resolved.flexDirection = getV(props?.direction) || "column";
    
    const alignMap: any = { start: "flex-start", end: "flex-end", center: "center", stretch: "stretch", baseline: "baseline" };
    const justifyMap: any = { start: "flex-start", end: "flex-end", center: "center", "space-between": "space-between", "space-around": "space-around", "space-evenly": "space-evenly" };
    
    resolved.alignItems = alignMap[getV(props.align)] || alignMap[getV(layout.alignItems)] || "stretch";
    resolved.justifyContent = justifyMap[getV(props.justify)] || justifyMap[getV(layout.justifyContent)] || "flex-start";
    resolved.flexWrap = getV(props.wrap) || getV(layout.flexWrap) || "nowrap";
    resolved.gap = resolveShorthand(getV(props.gap || layout.gap), theme.spacing, "0px");
  }

  if (props?.columns || layout.display === "grid") {
    resolved.display = "grid";
    resolved.gridTemplateColumns = getV(props.columns || layout.gridTemplateColumns);
    resolved.gridTemplateRows = getV(props.rows || layout.gridTemplateRows);
    resolved.gap = resolveShorthand(getV(props.gap || layout.gap), theme.spacing, "0px");
  }

  // Child Layout Props
  if (layout.flexGrow !== undefined) resolved.flexGrow = getV(layout.flexGrow);
  if (layout.flexShrink !== undefined) resolved.flexShrink = getV(layout.flexShrink);
  if (layout.flexBasis) resolved.flexBasis = getV(layout.flexBasis);
  if (layout.alignSelf) resolved.alignSelf = getV(layout.alignSelf);
  if (layout.gridColumn) resolved.gridColumn = getV(layout.gridColumn);
  if (layout.gridRow) resolved.gridRow = getV(layout.gridRow);
  if (layout.gridArea) resolved.gridArea = getV(layout.gridArea);

  // --- 7. BOX MODEL ---
  resolved.overflow = getV(layout.overflow) || getV(visual.overflow) || "visible";
  resolved.boxSizing = getV(layout.boxSizing) || "border-box";
  resolved.aspectRatio = getV(layout.aspectRatio);

  if (layout.height) resolved.height = getV(layout.height);
  if (layout.minHeight) resolved.minHeight = getV(layout.minHeight);
  if (layout.maxHeight) resolved.maxHeight = getV(layout.maxHeight);
  if (layout.minWidth) resolved.minWidth = getV(layout.minWidth);

  resolved.padding = resolveShorthand(getV(layout.padding), theme.spacing, "0px");

  const widthValue = getV(layout.width);
  if (widthValue) {
    if (typeof widthValue === "string" && widthValue.includes("px")) {
      resolved.width = "100%";
      resolved.maxWidth = widthValue;
    } else {
      resolved.width = widthValue;
    }
  }

  if (resolved.position === "absolute" && !layout.width) {
    resolved.width = "fit-content";
  }

  const marginValue = getV(layout.margin);
  if (marginValue && marginValue !== "none") {
    resolved.margin = resolveShorthand(marginValue, theme.spacing, "0px");
  } else if (resolved.maxWidth && resolved.position !== "absolute") {
    resolved.marginLeft = "auto";
    resolved.marginRight = "auto";
  }

  return resolved;
}

function resolveShorthand(value: any, theme: any, fallback: string) {
  if (!value || value === "none") return fallback;
  if (typeof value !== "string") return resolveToken(value, theme, fallback);

  return value
    .split(" ")
    .map((part) => resolveToken(part, theme, part))
    .join(" ");
}

function handleGradient(value: any, themeColors: any) {
  if (!value || typeof value !== "string") return null;
  if (!value.includes("gradient")) return null;

  return value.replace(/([a-z0-9]+\.[a-z0-9]+)/gi, (match) => {
    const keys = match.split(".");
    let color = themeColors;
    for (const key of keys) {
      if (color && color[key]) color = color[key];
      else return match;
    }
    return typeof color === "string" ? color : match;
  });
}
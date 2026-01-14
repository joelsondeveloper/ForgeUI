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

  const visual = mergeTokens(DEFAULTS.visual, styles?.visual);
  const typography = mergeTokens(DEFAULTS.typography, styles?.typography);
  const layout = mergeTokens(DEFAULTS.layout, styles?.layout);

  resolved.backgroundColor = resolveToken(
    getV(visual.backgroundColor),
    theme.colors,
    "transparent"
  );
  resolved.borderRadius = resolveToken(
    getV(visual.borderRadius),
    theme.radius,
    "0"
  );
  resolved.border = getV(visual.border);
  resolved.boxShadow = getV(visual.boxShadow);


  resolved.fontSize = resolveToken(
    getV(typography.fontSize),
    theme.typography?.size,
    "inherit"
  );
  resolved.color = resolveToken(
    getV(typography.color),
    theme.colors,
    "inherit"
  );
  resolved.fontWeight = getV(typography.fontWeight) || (nodeType === "button" ? "700" : "400");
  resolved.lineHeight = getV(typography.lineHeight) || "1.5";
  resolved.letterSpacing = getV(typography.letterSpacing) || "normal";
  resolved.textAlign = getV(typography.textAlign) || "left";

  if (layout.position) resolved.position = getV(layout.position);
  if (layout.top) resolved.top = getV(layout.top);
  if (layout.right) resolved.right = getV(layout.right);
  if (layout.bottom) resolved.bottom = getV(layout.bottom);
  if (layout.left) resolved.left = getV(layout.left);
  if (layout.zIndex) resolved.zIndex = getV(layout.zIndex);

  if (props?.direction) {
    resolved.display = "flex";
    resolved.flexDirection = getV(props?.direction);
    const alignMap: any = {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      stretch: "stretch",
    };
    resolved.alignItems = alignMap[getV(props.align)] || "stretch";

    const justifyMap: any = {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      "space-between": "space-between",
    };
    resolved.justifyContent = justifyMap[getV(props.justify)] || "flex-start";
    resolved.gap = resolveToken(getV(props.gap), theme.spacing, "0px");
    resolved.flex = getV(props.wrap) || "wrap";
  }

  if (layout.height) resolved.height = getV(layout.height);
  if (layout.minHeight) resolved.minHeight = getV(layout.minHeight);
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

  if (resolved.position === 'absolute' && !layout.width) {
      resolved.width = 'fit-content';
  }

  const marginValue = getV(layout.margin);
  if (marginValue && marginValue !== "none") {
    resolved.margin = resolveShorthand(marginValue, theme.spacing, "0px");
  } else if (resolved.maxWidth && resolved.position !== 'absolute') {
    resolved.marginLeft = "auto";
    resolved.marginRight = "auto";
  }

  if (props?.columns) {
  resolved.display = "grid";
  resolved.gridTemplateColumns = getV(props.columns); 
  resolved.gap = resolveShorthand(getV(props.gap), theme.spacing, "0px");
}

  return resolved;
}

function resolveShorthand(value: any, theme: any, fallback: string) {
    if (!value || value === 'none') return fallback

    if (typeof value !== 'string') return resolveToken(value, theme, fallback)
    
    return value
        .split(' ') // Divide por espaço
        .map(part => resolveToken(part, theme, part)) // Traduz cada parte ou mantém o valor original
        .join(' '); // Junta de volta
}
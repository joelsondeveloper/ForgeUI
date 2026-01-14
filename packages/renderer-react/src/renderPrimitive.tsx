import { primitivesMap } from "./primitives";
import { resolveStyles } from "./resolveStyles";
import { primitiveHandlers } from "./primitives/handlers";

export function renderPrimitive(node: any, document: any, onStateChange?: any) {

  const handler = primitiveHandlers[node.type];
  if (!handler) {
    return null;
  }
  const { children, as, ...extraProps } = handler(node, document, onStateChange);

  const Element = as || primitivesMap[node.type] || "div";

  if (!Element) {
    return null;
  }

  const style = resolveStyles( node.type, node.styles, document.theme, node.props);

  if (node.type === "Button") {
    Object.assign(style, {
      cursor: "pointer",
      border: style.border || "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease",
      ...style,
    });

    extraProps.onMouseOver = (e: any) =>
      (e.currentTarget.style.opacity = "0.8");
    extraProps.onMouseOut = (e: any) => (e.currentTarget.style.opacity = "1");
  }

  if (node.type === "Image") {
    const asset = document.assets[node.props.assetId];
    extraProps.src = asset?.source.previewUrl;

    extraProps.onError = (e: any) => {
      e.target.src =
        "https://placehold.co/400";
    };

    if (!style.width) style.width = "100%";
    style.height = style.height || "auto";
    style.display = "block";
    style.objectFit = node.props.objectFit || "contain";
  }

  if (node.type === "Text") {
    style.margin = style.margin || "0px";
    style.lineHeight = style.lineHeight || "1.2";
  }

  return (
    <Element style={style} {...extraProps} data-forge-id={node.id}>
      {children}
    </Element>
  );
}

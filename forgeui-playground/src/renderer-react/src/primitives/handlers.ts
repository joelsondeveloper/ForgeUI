import { renderNode } from "../renderNode";

export const primitiveHandlers: Record<
  string,
  (node: any, document: any, onStateChange: any) => any
> = {
  Text: (node) => ({ children: node.props.content, as: node.props.as }),
  Button: (node) => ({ children: node.props.label }),
  Image: (node, doc) => {
    const asset = doc?.assets?.[node.props.assetId];
    return {
      src: asset?.source?.previewUrl || "https://via.placeholder.com/32?text=?",
      alt: asset?.meta?.alt || "",
    };
  },

  Stack: (node, doc, onStateChange) => ({
    children: node.children?.map((child: any) =>
      renderNode(child, doc, onStateChange)
    ),
  }),
  Box: (node, doc, onStateChange) => ({
    children: node.children?.map((child: any) =>
      renderNode(child, doc, onStateChange)
    ),
  }),
  Grid: (node, doc, onStateChange) => ({
    children: node.children?.map((child: any) =>
      renderNode(child, doc, onStateChange)
    ),
  }),
};

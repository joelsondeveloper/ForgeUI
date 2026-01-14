import { renderNode } from "../renderNode";

export const primitiveHandlers: Record<string, (node: any, document: any, onStateChange: any) => any> = {
    Text: (node) => ({ children: node.props.content, as: node.props.as }),
    Button: (node) => ({ children: node.props.label }),
    Image: (node, doc) => ({ src: doc.assets[node.props.assetId]?.source.previewUrl }),
    
    Stack: (node, doc, onStateChange) => ({
        children: node.children?.map((child: any) => renderNode(child, doc, onStateChange))
    }),
    Box: (node, doc, onStateChange) => ({
        children: node.children?.map((child: any) => renderNode(child, doc, onStateChange))
    }),
    Grid: (node, doc, onStateChange) => ({
        children: node.children?.map((child: any) => renderNode(child, doc, onStateChange))
    }),
};
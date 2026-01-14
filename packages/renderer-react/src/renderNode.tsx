
import { renderPrimitive } from "./renderPrimitive";
import type { ForgeUIDocument} from '../../schema/src/document'
import type { ForgeUINode } from '../../schema/src/node'
import { NodeWrapper } from "./NodeWrapper";

export function renderNode(node: ForgeUINode, document: ForgeUIDocument, onStateChange?: (key: string, value: any) => void): React.ReactNode {

  if (!node) return null;

  if (node.condition) {
    const { key, value, operator } = node.condition;
    const currentState = document.state?.[key];

    if (
      (operator === "==" && currentState !== value) ||
      (operator === "!=" && currentState === value)
    ) {
      return null;
    }
  }

  if (node.type === "PatternInstance" && node.patternRef) {
    const definition = document.definitions[node.patternRef];
    if (!definition) return null;

    const instanceOverrides = node.props || {};
    const customizedPattern = applyOverrides(definition, instanceOverrides);

    return renderNode(customizedPattern, document, onStateChange);
  }

  return (
    <NodeWrapper key={node.id} node={node} onStateChange={onStateChange}>
      {renderPrimitive(node, document, onStateChange)}
    </NodeWrapper>
  );
}

function applyOverrides(node: any, overrides: any): any {
  const newNode = { 
    ...node,
    props: node.props ? { ...node.props } : {} 
  };

  if (overrides[node.id]) {
    const propsToMerge = overrides[node.id];

    newNode.props = { 
      ...newNode.props, 
      ...propsToMerge 
    };

    if (propsToMerge.styles) {
        newNode.styles = { ...newNode.styles, ...propsToMerge.styles };
    }
  }

  if (newNode.children && Array.isArray(newNode.children)) {
    newNode.children = newNode.children.map((child: any) => 
      applyOverrides(child, overrides)
    );
  }

  return newNode;
}
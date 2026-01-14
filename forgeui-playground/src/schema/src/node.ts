
import type { InteractionEvents } from './interactions';
import type { StyleTokens } from './styles';
import type { MotionConfiguration } from './motion';
import type { ContentPrimitive } from './props';
import type { LayoutPrimitive } from './layout';

export type NodeProps = Record<string, any>;

export type PrimitiveType =
  | LayoutPrimitive
  | ContentPrimitive
  | 'PatternInstance'

export interface ForgeUINode {
  id: string;
  type: PrimitiveType;
  name?: string;
  patternRef?: string;
  props: NodeProps;
  interactions?: InteractionEvents; // Novo sistema de interações
  styles?: StyleTokens;
  motion?: MotionConfiguration;
  children?: ForgeUINode[];
  metadata?: {
    isLocked?: boolean;
    isHidden?: boolean;
    isCollapsed?: boolean;
  }
  condition?: {
    key: string;
    operator: '==' | '!=';
    value: any;
  }
}
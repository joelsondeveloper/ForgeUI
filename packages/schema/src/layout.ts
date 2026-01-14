import type { Responsive } from "./styles"

export type LayoutPrimitive =
  | 'Box'
  | 'Stack'
  | 'Grid'

export interface StackProps {
  direction?: Responsive<'row' | 'column'>
  align?: Responsive<'start' | 'center' | 'end' | 'stretch'>
  justify?: Responsive<'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'>;
  wrap?: boolean
}

export interface GridProps {
  columns?: Responsive<string>
  rows?: Responsive<string>
  templateAreas?: string[]
}

export interface BoxProps {
    as?: 'div' | 'section' | 'article' | 'header' | 'main' | 'footer'
}

export type PrimitiveProps = StackProps | GridProps | BoxProps
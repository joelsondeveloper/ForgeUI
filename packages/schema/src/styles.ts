export type SpacingKey = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type RadiusKey = 'none' | 'sm' | 'md' | 'lg' | 'pill' | 'full';

export type Responsive<T> = T | { 
    mobile?: T;
    tablet?: T;
    desktop?: T;
 };

export interface StyleTokens {
  layout?: {
    display?: Responsive<'flex' | 'grid' | 'block' | 'none'>
    position?: Responsive<'relative' | 'absolute' | 'fixed'>
    width?: Responsive<string>
    height?: Responsive<string>
    padding?: Responsive<SpacingKey | string>
    margin?: Responsive<SpacingKey | string>
    gap?: Responsive<SpacingKey | string>
    zIndex?: number
  }

  visual?: {
    backgroundColor?: string
    borderRadius?: Responsive<RadiusKey | string>
    opacity?: number
    border?: Responsive<BorderDefinition>
    boxShadow?: string
    overflow?: 'visible' | 'hidden' | 'auto'
  }

  typography?: {
    fontFamily?: string
    fontSize?: Responsive<string>
    fontWeight?: Responsive<number | string>
    lineHeight?: Responsive<string | number>
    color?: string
    textAlign?: Responsive<'left' | 'center' | 'right' | 'justify'>
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
    letterSpacing?: string
  }
}

export interface RadiusTokens {
  none: string
  sm: string
  md: string
  lg: string
  pill: string
  full: string
}


export type BorderDefinition = {
  width: string;
  style: 'solid' | 'dashed' | 'dotted';
  color: string;
};

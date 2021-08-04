import cc from 'classcat';
import React, { CSSProperties, ElementType, FC } from 'react';
import * as borderStyles from '../../../ds/styles/border.css';
import * as colorStyles from '../../../ds/styles/color.css';
import * as layoutStyles from '../../../ds/styles/layout.css';
import * as sizeStyles from '../../../ds/styles/size.css';
import * as spaceStyles from '../../../ds/styles/space.css';
import { Theme } from '../../../ds/theme/theme.css';
import { resolve, ResponsiveProp } from '../../helpers/runtime';
import { useReset } from '../../hooks';

type ColorStyles = typeof colorStyles;
type LayoutStyles = typeof layoutStyles;
type SizeStyles = typeof sizeStyles;

type Space = keyof Theme['space'];
type ResponsiveSpace = ResponsiveProp<Space>;
type BackgroundColor = keyof ColorStyles['backgroundColor'];

type BorderPreset = 'strong' | 'weak';

const borderPresets = {
  strong: {
    style: 'solid',
    width: 'medium',
  },
  weak: {
    style: 'solid',
    width: 'small',
  },
} as const;

export interface Props {
  backgroundColor?: BackgroundColor;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;

  border?: BorderPreset;
  borderColor?: keyof Theme['colors'];
  borderRadius?: keyof Theme['borderRadius'];

  m?: ResponsiveSpace;
  mt?: ResponsiveSpace;
  mb?: ResponsiveSpace;
  ml?: ResponsiveSpace;
  mr?: ResponsiveSpace;
  mx?: ResponsiveSpace;
  my?: ResponsiveSpace;

  p?: ResponsiveSpace;
  pt?: ResponsiveSpace;
  pb?: ResponsiveSpace;
  pl?: ResponsiveSpace;
  pr?: ResponsiveSpace;
  px?: ResponsiveSpace;
  py?: ResponsiveSpace;

  alignContent?: ResponsiveProp<keyof LayoutStyles['alignContent']>;
  alignItems?: ResponsiveProp<keyof LayoutStyles['alignItems']>;
  alignSelf?: ResponsiveProp<keyof LayoutStyles['alignSelf']>;
  display?: ResponsiveProp<keyof LayoutStyles['display']>;
  flexDirection?: ResponsiveProp<keyof LayoutStyles['flexDirection']>;
  flexGrow?: ResponsiveProp<keyof LayoutStyles['flexGrow']>;
  flexShrink?: ResponsiveProp<keyof LayoutStyles['flexShrink']>;
  flexWrap?: ResponsiveProp<keyof LayoutStyles['flexWrap']>;
  justifyContent?: ResponsiveProp<keyof LayoutStyles['justifyContent']>;

  overflow?: keyof LayoutStyles['overflow'];
  overflowX?: keyof LayoutStyles['overflowX'];
  overflowY?: keyof LayoutStyles['overflowY'];
  position?: keyof LayoutStyles['position'];
  width?: ResponsiveProp<keyof SizeStyles['width']>;

  zIndex?: keyof LayoutStyles['zIndex'];
}

export const Box: FC<Props> = ({
  backgroundColor,
  children,
  className,
  as: Component = 'div',

  border,
  borderColor,
  borderRadius,

  m,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,

  p,
  pt,
  pb,
  pl,
  pr,
  px,
  py,

  alignContent,
  alignItems,
  alignSelf,
  display,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  justifyContent,
  position,

  overflow,
  overflowX,
  overflowY,
  width,
  style,
  zIndex,

  ...props
}) => {
  let reset = useReset(Component);

  let marginTop = mt ?? my ?? m;
  let marginBottom = mb ?? my ?? m;
  let marginLeft = ml ?? mx ?? m;
  let marginRight = mr ?? mx ?? m;

  let paddingTop = pt ?? py ?? p;
  let paddingBottom = pb ?? py ?? p;
  let paddingLeft = pl ?? px ?? p;
  let paddingRight = pr ?? px ?? p;

  const borderPresetStyles = border ? borderPresets[border] : null;

  let cls = cc([
    reset,
    backgroundColor && colorStyles.backgroundColor[backgroundColor],
    className,

    borderPresetStyles
      ? [
          borderStyles.width[borderPresetStyles.width],
          borderStyles.style[borderPresetStyles.style],
        ]
      : null,

    borderColor && borderStyles.color[borderColor],
    borderRadius && borderStyles.radius[borderRadius],

    marginTop && resolve(marginTop, spaceStyles.margin.top),
    marginBottom && resolve(marginBottom, spaceStyles.margin.bottom),
    marginLeft && resolve(marginLeft, spaceStyles.margin.left),
    marginRight && resolve(marginRight, spaceStyles.margin.right),

    paddingTop && resolve(paddingTop, spaceStyles.padding.top),
    paddingBottom && resolve(paddingBottom, spaceStyles.padding.bottom),
    paddingLeft && resolve(paddingLeft, spaceStyles.padding.left),
    paddingRight && resolve(paddingRight, spaceStyles.padding.right),

    alignContent && resolve(alignContent, layoutStyles.alignContent),
    alignItems && resolve(alignItems, layoutStyles.alignItems),
    alignSelf && resolve(alignSelf, layoutStyles.alignSelf),
    display && resolve(display, layoutStyles.display),
    flexDirection && resolve(flexDirection, layoutStyles.flexDirection),
    flexGrow && resolve(flexGrow, layoutStyles.flexGrow),
    flexShrink && resolve(flexShrink, layoutStyles.flexShrink),
    flexWrap && resolve(flexWrap, layoutStyles.flexWrap),
    justifyContent && resolve(justifyContent, layoutStyles.justifyContent),

    overflow && layoutStyles.overflow[overflow],
    overflowX && layoutStyles.overflowX[overflowX],
    overflowY && layoutStyles.overflowY[overflowY],
    position && layoutStyles.position[position],
    width && resolve(width, sizeStyles.width),
    zIndex && layoutStyles.zIndex[zIndex],
  ]);

  return (
    <Component {...props} style={style} className={cls}>
      {children}
    </Component>
  );
};

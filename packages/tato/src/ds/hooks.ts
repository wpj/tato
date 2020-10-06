import cc from 'classcat';
import { ElementType } from 'react';
import { useStyles } from 'react-treat';

import * as borderRefs from './styles/border.treat';
import * as colorRefs from './styles/color.treat';
import * as layoutRefs from './styles/layout.treat';
import * as resetRefs from './styles/reset.treat';
import * as sizeRefs from './styles/size.treat';
import * as spaceRefs from './styles/space.treat';
import * as typographyRefs from './styles/typography.treat';

export type BorderStyles = typeof borderRefs;
export const useBorderStyles = () => useStyles(borderRefs);

export type ColorStyles = typeof colorRefs;
export const useColorStyles = () => useStyles(colorRefs);

export type LayoutStyles = typeof layoutRefs;
export const useLayoutStyles = () => useStyles(layoutRefs);

export type SizeStyles = typeof sizeRefs;
export const useSizeStyles = () => useStyles(sizeRefs);

export type SpaceStyles = typeof spaceRefs;
export const useSpaceStyles = () => useStyles(spaceRefs);

export type TypographyStyles = typeof typographyRefs;
export const useTypographyStyles = () => useStyles(typographyRefs);

export type ResetStyles = typeof resetRefs;
export const useResetStyles = () => useStyles(resetRefs);

export function useReset(element: ElementType) {
  let resetStyles = useResetStyles();

  return cc([
    resetStyles.base,
    resetStyles.element[element as keyof ResetStyles['element']],
  ]);
}

import cc from 'classcat';
import React, { ElementType, FC } from 'react';
import * as colorStyles from '../../../ds/styles/color.css';
import * as typographyStyles from '../../../ds/styles/typography.css';
import type { Theme } from '../../../ds/theme/theme.css';
import { resolve, ResponsiveProp } from '../../helpers/runtime';
import { useReset } from '../../hooks';

type TypographyStyles = typeof typographyStyles;
type ColorStyles = typeof colorStyles;
type FontSize = keyof Theme['fontSize'];

export interface Props {
  color?: keyof ColorStyles['color'];
  as?: ElementType;
  fontFamily?: keyof Theme['fontFamily'];
  fontStyle?: keyof TypographyStyles['fontStyle'];
  size?: ResponsiveProp<FontSize>;
  weight?: keyof TypographyStyles['fontWeight'];
  whitespace?: keyof TypographyStyles['whitespace'];
}

export const Text: FC<Props> = ({
  children,
  color,
  as: Component = 'span',
  fontFamily = 'body',
  fontStyle,
  size,
  weight,
  whitespace,
  ...props
}) => {
  let reset = useReset(Component);

  let cls = cc([
    reset,
    color && colorStyles.color[color],
    fontFamily && typographyStyles.fontFamily[fontFamily],
    fontStyle && typographyStyles.fontStyle[fontStyle],
    size && resolve(size, typographyStyles.fontSize),
    weight && typographyStyles.fontWeight[weight],
    whitespace && typographyStyles.whitespace[whitespace],
  ]);

  return (
    <Component {...props} className={cls}>
      {children}
    </Component>
  );
};

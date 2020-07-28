import cc from 'classcat';
import React, { ElementType, FC } from 'react';
import { Theme } from 'treat/theme';

import {
  useTypographyStyles,
  useColorStyles,
  useReset,
  ColorStyles,
  TypographyStyles,
} from '../../hooks';

import { resolve, ResponsiveProp } from '../../helpers/runtime';

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
  let colorStyles = useColorStyles();
  let typographyStyles = useTypographyStyles();
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

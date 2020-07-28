import cc from 'classcat';
import React, { FC } from 'react';
import { Theme } from 'treat/theme';

import { Box } from '../box';
import { resolve, ResponsiveProp } from '../../helpers/runtime';
import {
  useColorStyles,
  useTypographyStyles,
  TypographyStyles,
} from '../../hooks';

type HeadingLevel = '1' | '2' | '3' | '4';

const styleMap = {
  1: {
    fontSize: 'xlarge',
    fontWeight: 'bold',
  },
  2: {
    fontSize: 'large',
    fontWeight: 'bold',
  },
  3: {
    fontSize: 'large',
    fontWeight: 'medium',
  },
  4: {
    fontSize: 'medium',
    fontWeight: 'medium',
  },
} as const;

type FontWeight = keyof Theme['fontWeight'];
type FontSize = keyof Theme['fontSize'];

export interface Props {
  align?: keyof TypographyStyles['textAlign'];
  className?: string;
  color?: keyof Theme['colors'];
  fontFamily?: keyof Theme['fontFamily'];
  level: HeadingLevel;
  size?: ResponsiveProp<FontSize>;
  weight?: ResponsiveProp<FontWeight>;
}

export const Heading: FC<Props> = ({
  align,
  children,
  className,
  color,
  fontFamily = 'header',
  level,
  size,
  weight,
}) => {
  let typographyStyles = useTypographyStyles();
  let colorStyles = useColorStyles();

  let preset = styleMap[level];

  let as = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  let cls = cc([
    align && typographyStyles.textAlign[align],
    resolve(
      weight !== undefined ? weight : preset.fontWeight,
      typographyStyles.fontWeight,
    ),
    color && colorStyles.color[color],
    resolve(
      size !== undefined ? size : preset.fontSize,
      typographyStyles.fontSize,
    ),
    fontFamily && typographyStyles.fontFamily[fontFamily],
    className,
  ]);

  return (
    <Box className={cls} as={as}>
      {children}
    </Box>
  );
};

import cc from 'classcat';
import React, { FC } from 'react';
import * as colorStyles from '../../../ds/styles/color.css';
import * as typographyStyles from '../../../ds/styles/typography.css';
import type { vars } from '../../../ds/theme/theme.css';
import { resolve, ResponsiveProp } from '../../helpers/runtime';
import { Box } from '../box';

type TypographyStyles = typeof typographyStyles;

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

type FontWeight = keyof typeof vars.fontWeight;
type FontSize = keyof typeof vars.fontSize;

export interface Props {
  align?: keyof TypographyStyles['textAlign'];
  className?: string;
  color?: keyof typeof vars.colors;
  fontFamily?: keyof typeof vars.fontFamily;
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

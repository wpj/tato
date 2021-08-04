import { styleVariants } from '@vanilla-extract/css';
import { mapValues } from 'lodash';
import { vars } from '../../ds/theme/theme.css';
import { breakpoints } from '../../ds/theme/constants';
import { wrapWithMediaQuery } from './helpers';

export const fontSize = mapValues(vars.fontSize, (fontSize) => {
  return styleVariants(breakpoints, (minWidth) => {
    let rule = { fontSize };

    return wrapWithMediaQuery(rule, minWidth);
  });
});

export const textAlign = styleVariants(
  {
    left: 'left',
    right: 'right',
    center: 'center',
    justify: 'justify',
  } as const,
  (textAlign) => ({ textAlign }),
);

export const fontWeight = mapValues(vars.fontWeight, (fontWeight) => {
  return styleVariants(breakpoints, (minWidth) => {
    let rule = { fontWeight };

    return wrapWithMediaQuery(rule, minWidth);
  });
});

export const fontFamily = styleVariants(vars.fontFamily, (fontFamily) => ({
  fontFamily,
}));

export const whitespace = styleVariants(
  {
    normal: 'normal',
    noWrap: 'nowrap',
    pre: 'pre',
    preLine: 'pre-line',
    preWrap: 'pre-wrap',
  } as const,
  (whiteSpace) => ({ whiteSpace }),
);

export const listStyleType = styleVariants(
  {
    none: 'none',
    disc: 'disc',
    decimal: 'decimal',
  },
  (listStyleType) => ({ listStyleType }),
);

export const fontStyle = styleVariants(
  {
    italic: 'italic',
    normal: 'normal',
  },
  (fontStyle) => ({ fontStyle }),
);

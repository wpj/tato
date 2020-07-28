import { mapValues } from 'lodash';
import { styleMap, styleTree } from 'treat';

import { mapToStyleProperty, wrapWithMediaQuery } from './helpers';

export const fontSize = styleTree((theme, styleNode) => {
  return mapValues(theme.fontSize, (fontSize) => {
    return theme.breakpoints.map((minWidth: string | number) => {
      let rule = { fontSize };

      return styleNode(wrapWithMediaQuery(rule, minWidth));
    });
  });
});

export const textAlign = styleMap(
  mapToStyleProperty(
    {
      left: 'left',
      right: 'right',
      center: 'center',
      justify: 'justify',
    },
    'textAlign',
  ),
);

export const fontWeight = styleTree((theme, styleNode) => {
  return mapValues(theme.fontWeight, (fontWeight) => {
    return theme.breakpoints.map((minWidth: string | number) => {
      let rule = { fontWeight };

      return styleNode(wrapWithMediaQuery(rule, minWidth));
    });
  });
});

export const fontFamily = styleMap((theme) => {
  return mapToStyleProperty(theme.fontFamily, 'fontFamily');
});

export const whitespace = styleMap(
  mapToStyleProperty(
    {
      normal: 'normal',
      noWrap: 'no-wrap',
      pre: 'pre',
      preLine: 'pre-line',
      preWrap: 'pre-wrap',
    },
    'whiteSpace',
  ),
);

export const listStyleType = styleMap(
  mapToStyleProperty(
    {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
    },
    'listStyleType',
  ),
);

export const fontStyle = styleMap(
  mapToStyleProperty(
    {
      italic: 'italic',
      normal: 'normal',
    },
    'fontStyle',
  ),
);

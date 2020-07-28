import { globalStyle, styleMap, styleTree } from 'treat';
import { mapValues } from 'lodash';

import {
  createResponsiveSpaceRuleForAdjacentSiblings,
  mapToStyleProperty,
} from './helpers';

export const radius = styleMap((theme) =>
  mapToStyleProperty(theme.borderRadius, 'borderRadius'),
);

export const width = styleMap((theme) =>
  mapToStyleProperty(theme.borderWidth, 'borderWidth'),
);

export const color = styleMap((theme) =>
  mapToStyleProperty(theme.colors, 'borderColor'),
);

export const style = styleMap(
  mapToStyleProperty(
    {
      dashed: 'dashed',
      dotted: 'dotted',
      double: 'double',
      none: 'none',
      solid: 'solid',
    },
    'borderStyle',
  ),
);

export const divideX = createResponsiveSpaceRuleForAdjacentSiblings(
  'border-left-width',
  (rule) => ({ ...rule, borderLeftStyle: 'solid' }),
);

export const divideY = createResponsiveSpaceRuleForAdjacentSiblings(
  'border-top-width',
  (rule) => ({ ...rule, borderTopStyle: 'solid' }),
);

export const divideColor = styleTree((theme, styleNode) => {
  return mapValues(theme.colors, (color) => {
    let node = styleNode({});

    globalStyle(`${node} > * + *`, {
      borderColor: color,
    });

    return node;
  });
});

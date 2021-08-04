import { globalStyle, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../ds/theme/theme.css';
import { createResponsiveSpaceRuleForAdjacentSiblings } from './helpers';

export const radius = styleVariants(vars.borderRadius, (borderRadius) => ({
  borderRadius,
}));

export const width = styleVariants(vars.borderWidth, (borderWidth) => ({
  borderWidth,
}));

export const color = styleVariants(vars.colors, (color) => ({
  borderColor: color,
}));

const borderStyle = styleVariants(
  {
    dashed: 'dashed',
    dotted: 'dotted',
    double: 'double',
    none: 'none',
    solid: 'solid',
  },
  (borderStyle) => ({ borderStyle }),
);

export { borderStyle as style };

export const divideX = createResponsiveSpaceRuleForAdjacentSiblings(
  'border-left-width',
  (rule) => ({ ...rule, borderLeftStyle: 'solid' }),
);

export const divideY = createResponsiveSpaceRuleForAdjacentSiblings(
  'border-top-width',
  (rule) => ({ ...rule, borderTopStyle: 'solid' }),
);

export const divideColor = styleVariants(vars.colors, () => {
  return {};
});

Object.entries(divideColor).forEach(([color, cls]) => {
  globalStyle(`${cls} > * + *`, {
    borderColor: color,
  });
});

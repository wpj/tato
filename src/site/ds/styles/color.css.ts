import { styleVariants } from '@vanilla-extract/css';
import { vars } from '../../ds/theme/theme.css';

export const color = styleVariants(vars.colors, (color) => {
  return { color };
});

export const backgroundColor = styleVariants(vars.colors, (color) => {
  return { backgroundColor: color };
});

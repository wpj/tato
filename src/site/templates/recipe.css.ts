import { globalStyle, style } from '@vanilla-extract/css';
import Typography from 'typography';
import { vars } from '../ds/theme/theme.css';

export const article = style({
  fontFamily: vars.fontFamily.body,
});

globalStyle(`${article} *`, {
  boxSizing: 'border-box',
});

let typography = new Typography({
  headerFontFamily: ['inherit'],
  bodyFontFamily: ['inherit'],
});

Object.entries(typography.toJSON()).map(([rule, declaration]) => {
  globalStyle(`${article} ${rule}`, declaration);
});

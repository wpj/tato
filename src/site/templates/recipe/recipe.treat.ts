import { globalStyle, style, Style } from 'treat';
import Typography from 'typography';

export const article = style((theme) => ({
  fontFamily: theme.fontFamily.body,
}));

globalStyle(`${article} *`, {
  boxSizing: 'border-box',
});

let typography = new Typography({
  headerFontFamily: ['inherit'],
  bodyFontFamily: ['inherit'],
});

Object.entries(typography.toJSON()).map(([rule, declaration]) => {
  globalStyle(`${article} ${rule}`, declaration as Style);
});

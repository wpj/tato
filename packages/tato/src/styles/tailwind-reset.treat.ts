import { globalStyle, style } from 'treat';

export const reset = style({});

globalStyle(`${reset} ul, ol`, {
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

globalStyle(`${reset} h1, h2, h3, h4, h5, h6`, {
  fontSize: 'inherit',
  fontWeight: 'inherit',
});

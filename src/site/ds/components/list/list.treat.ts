import { globalStyle, style } from 'treat';

export const root = style({});

globalStyle(`${root} > li:before`, {
  backgroundColor: 'currentColor',
  borderRadius: '50%',
  content: '""',
  display: 'block',
  height: '5px',
  left: '0.2em',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '5px',
});

globalStyle(`${root} > li`, {
  paddingLeft: '1.75em',
  position: 'relative',
});

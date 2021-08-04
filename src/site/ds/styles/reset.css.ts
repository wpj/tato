import { style } from '@vanilla-extract/css';

export const base = style({
  margin: '0',
  padding: '0',
  border: '0',
  boxSizing: 'border-box',
  fontSize: '100%',
  font: 'inherit',
  verticalAlign: 'baseline',
  WebkitTapHighlightColor: 'transparent',
  outline: 'none',
});

// HTML5 display-role reset for older browsers
const block = style({
  display: 'block',
});

const body = style({
  lineHeight: '1',
});

const list = style({
  listStyle: 'none',
});

const quote = style({
  quotes: 'none',
  selectors: {
    '&:before, &:after': {
      content: "''",
    },
  },
});

const table = style({
  borderCollapse: 'collapse',
  borderSpacing: '0',
});

const appearance = style({
  appearance: 'none',
});

const field = [block, appearance];

// Custom reset rules
const mark = style({
  backgroundColor: 'transparent',
  color: 'inherit',
});

const select = [
  ...field,
  style({
    selectors: {
      '&::-ms-expand': {
        display: 'none',
      },
    },
  }),
];

const input = [
  ...field,
  style({
    selectors: {
      '&::-ms-clear': {
        display: 'none',
      },
      '&::-webkit-search-cancel-button': {
        WebkitAppearance: 'none',
      },
    },
  }),
];

const button = style({
  background: 'none',
});

const a = style({
  textDecoration: 'none',
  color: 'inherit',
});

const font = style({
  fontSize: 'inherit',
  fontWeight: 'inherit',
});

export const element = {
  a,
  article: block,
  aside: block,
  blockquote: quote,
  body,
  button,
  details: block,
  figcaption: block,
  figure: block,
  footer: block,
  header: block,
  hgroup: block,
  h1: font,
  h2: font,
  h3: font,
  h4: font,
  h5: font,
  h6: font,
  input,
  mark,
  menu: block,
  nav: block,
  ol: list,
  q: quote,
  section: block,
  select,
  table,
  textarea: field,
  ul: list,
};

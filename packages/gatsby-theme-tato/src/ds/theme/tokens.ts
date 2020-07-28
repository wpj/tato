import { darken, modularScale } from 'polished';

function fontSizeScale(steps: number) {
  return modularScale(steps, '1rem', 1.2);
}

const blue = '#4299E1';

// const vaporwaveScale = [
//   '#f08997',
//   '#df84a7',
//   '#c883b3',
//   '#ac83ba',
//   '#8d83ba',
//   '#6f82b5',
//   '#5480a9',
//   '#407c9a',
// ];

const tokens = {
  breakpoints: [0, 48, 64].map((size) => (size > 0 ? `${size}rem` : size)),

  borderRadius: {
    none: '0',
    small: '0.125rem',
    medium: '0.25rem',
    large: '0.375rem',
    xlarge: '0.5rem',
  },

  borderWidth: {
    none: 0,
    small: '1px',
    medium: '2px',
    large: '4px',
  },

  colors: {
    black: '#000000',
    blue,
    darkblue: darken(0.2, blue),
    darkgray: '#718096',
    lightgray: '#F7FAFC',
    gray: '#CBD5E0',
    purple: '#805AD5',
    white: '#FFFFFF',
  },

  fontFamily: {
    header: [
      // '"Quattrocento Sans"',
      '"Work Sans"',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Noto Sans"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ].join(', '),
    body: [
      '"Work Sans"',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Noto Sans"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ].join(', '),
    mono: [
      'Menlo',
      'Monaco',
      'Consolas',
      '"Liberation Mono"',
      '"Courier New"',
      'monospace',
    ].join(', '),
  },

  fontSize: {
    small: fontSizeScale(1),
    medium: fontSizeScale(2),
    large: fontSizeScale(3),
    xlarge: fontSizeScale(4),
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700,
  },

  space: {
    none: 0,
    auto: 'auto',
    xxsmall: 1,
    xsmall: 4,
    small: 8,
    medium: 16,
    large: 32,
    xlarge: 64,
    xxlarge: 128,
  },
};

export default tokens;

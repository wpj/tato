import { style } from '@vanilla-extract/css';
import { hideVisually } from 'polished';
import { vars } from '../../ds/theme/theme.css';

export const input = style({
  borderLeftWidth: vars.borderWidth.medium,
  borderLeftColor: vars.colors.lightgray,
  borderLeftStyle: 'solid',
  display: 'block',
  width: '100%',
  fontFamily: vars.fontFamily.body,
});

export const small = style({
  padding: vars.space.small,
  fontSize: vars.fontSize.small,
});

export const large = style({
  padding: vars.space.medium,
  fontSize: vars.fontSize.medium,
});

export const icon = style({
  position: 'relative',
  top: '0.19em',
});

export const shadow = style({
  boxShadow:
    '0px 4px 10px rgba(46, 41, 51, 0.08), 0px 8px 24px rgba(71, 63, 79, 0.16)',
});

export const hide = style(hideVisually());

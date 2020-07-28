import { style } from 'treat';
import { hideVisually } from 'polished';

export const input = style((theme) => ({
  borderLeftWidth: theme.borderWidth.medium,
  borderLeftColor: theme.colors.lightgray,
  borderLeftStyle: 'solid',
  display: 'block',
  width: '100%',
  fontFamily: theme.fontFamily.body,
}));

export const small = style((theme) => ({
  padding: theme.space.small,
  fontSize: theme.fontSize.small,
}));

export const large = style((theme) => ({
  padding: theme.space.medium,
  fontSize: theme.fontSize.medium,
}));

export const icon = style({
  position: 'relative',
  top: '0.19em',
});

export const shadow = style({
  boxShadow:
    '0px 4px 10px rgba(46, 41, 51, 0.08), 0px 8px 24px rgba(71, 63, 79, 0.16)',
});

export const hide = style(hideVisually());

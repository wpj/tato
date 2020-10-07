import { mapValues } from 'lodash';
import { styleMap } from 'treat';

export const color = styleMap((theme) => {
  return mapValues(theme.colors, (color) => {
    return { color };
  });
});

export const backgroundColor = styleMap((theme) => {
  return mapValues(theme.colors, (color) => {
    return { backgroundColor: color };
  });
});

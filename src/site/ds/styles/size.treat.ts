import { mapToResponsiveStyleProperty } from './helpers';

export const width = mapToResponsiveStyleProperty(
  {
    full: '100%',
    auto: 'auto',
  },
  'width',
);

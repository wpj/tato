import React, { FC } from 'react';
import { TreatProvider } from 'react-treat';

import theme from '../ds/theme/theme.treat';

export const Provider: FC = ({ children }) => {
  return <TreatProvider theme={theme}>{children}</TreatProvider>;
};

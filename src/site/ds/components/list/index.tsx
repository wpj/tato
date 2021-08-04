import cc from 'classcat';
import React, { FC } from 'react';

import { Stack, Props as StackProps } from '../stack';
import * as listRefs from './list.css';

export type Props = Pick<StackProps, 'space'>;

export const List: FC<Props> = ({ children, space }) => {
  let cls = cc([listRefs.root]);

  return (
    <Stack as="ul" className={cls} space={space}>
      {children}
    </Stack>
  );
};

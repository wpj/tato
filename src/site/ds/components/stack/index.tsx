import cc from 'classcat';
import React, { FC } from 'react';
import * as borderStyles from '../../../ds/styles/border.css';
import * as spaceStyles from '../../../ds/styles/space.css';
import type { Theme } from '../../../ds/theme/theme.css';
import { resolve, ResponsiveProp } from '../../helpers/runtime';
import { Box } from '../box';

type ResponsiveSpace = ResponsiveProp<keyof Theme['space']>;

export interface Props {
  as?: 'ul' | 'ol' | 'div';
  className?: string;
  divide?: ResponsiveSpace;
  divideColor?: keyof Theme['colors'];
  horizontal?: boolean;
  space?: ResponsiveSpace;
}

export const Stack: FC<Props> = ({
  children,
  className,
  as,
  divide,
  divideColor,
  horizontal = false,
  space,
}) => {
  let cls = cc([
    className,
    divide &&
      resolve(divide, horizontal ? borderStyles.divideX : borderStyles.divideY),
    divideColor && borderStyles.divideColor[divideColor],
    space && resolve(space, spaceStyles.betweenY),
  ]);

  return (
    <Box as={as} className={cls}>
      {children}
    </Box>
  );
};

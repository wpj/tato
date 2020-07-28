import cc from 'classcat';
import React, { FC } from 'react';
import { Theme } from 'treat/theme';

import { Box } from '../box';
import { useBorderStyles, useSpaceStyles } from '../../hooks';
import { resolve, ResponsiveProp } from '../../helpers/runtime';

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
  let borderStyles = useBorderStyles();
  let spaceStyles = useSpaceStyles();

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

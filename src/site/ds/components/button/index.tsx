import cc from 'classcat';
import React, { ButtonHTMLAttributes, FC } from 'react';

import {
  useColorStyles,
  useBorderStyles,
  useTypographyStyles,
} from '../../hooks';
import { Text } from '../text';
import { Box } from '../box';

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  children,
  ...props
}) => {
  let borderStyles = useBorderStyles();
  let colorStyles = useColorStyles();
  let typographyStyles = useTypographyStyles();

  return (
    <button
      {...props}
      className={cc([
        className,
        borderStyles.radius.medium,
        colorStyles.backgroundColor.blue,
        typographyStyles.fontSize.small,
      ])}
    >
      <Box py="small" px="medium">
        <Text weight="bold" color="white" whitespace="noWrap">
          {children}
        </Text>
      </Box>
    </button>
  );
};

import cc from 'classcat';
import React, { ButtonHTMLAttributes, FC } from 'react';

import * as colorStyles from '../../../ds/styles/color.css';
import * as borderStyles from '../../../ds/styles/border.css';
import * as typographyStyles from '../../../ds/styles/typography.css';

import { Text } from '../text';
import { Box } from '../box';

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  children,
  ...props
}) => {
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

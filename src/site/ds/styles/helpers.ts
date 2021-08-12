import { globalStyle, style, StyleRule } from '@vanilla-extract/css';
import type { Properties } from 'csstype';
import { mapValues } from 'lodash';
import { breakpoints } from '../../ds/theme/constants';
import { vars } from '../../ds/theme/theme.css';

type Breakpoints = typeof breakpoints;

export function wrapWithMediaQuery(
  style: StyleRule,
  minWidth: Breakpoints[keyof Breakpoints],
) {
  if (minWidth === '0rem') {
    return style;
  }

  return {
    '@media': {
      [`screen and (min-width: ${minWidth})`]: style,
    },
  };
}

// Converts a map of classnames -> css property values to a set of responsive
// rules.
export function mapToResponsiveStyleProperty<
  Key extends string | number,
  Value extends string | number,
>(map: Record<Key, Value>, property: keyof Properties) {
  return mapValues(map, (displayRule) => {
    return mapValues(breakpoints, (minWidth) => {
      let rule = { [property]: displayRule };

      return style(wrapWithMediaQuery(rule, minWidth));
    });
  });
}

export function createResponsiveSpaceRuleForAdjacentSiblings(
  property: string,
  decorator?: (rule: { [key: string]: string | number }) => {
    [key: string]: string | number;
  },
) {
  return mapValues(vars.space, (space) => {
    let variants = mapValues(breakpoints, () => style({}));

    Object.entries(breakpoints).forEach(([size, minWidth]) => {
      let className = variants[size as keyof typeof variants];

      let globalRule = {
        [property]: space,
      };

      let decoratedRule = decorator ? decorator(globalRule) : globalRule;

      globalStyle(
        `${className} > * + *`,
        wrapWithMediaQuery(decoratedRule, minWidth),
      );
    });

    return variants;
  });
}

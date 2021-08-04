import { globalStyle, StyleRule, styleVariants } from '@vanilla-extract/css';
import type { Properties } from 'csstype';
import { mapValues } from 'lodash';
import { vars } from '../../ds/theme/theme.css';
import { breakpoints } from '../../ds/theme/constants';

export function wrapWithMediaQuery(style: StyleRule, minWidth: string) {
  if (minWidth === '0') {
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
    return styleVariants(breakpoints, (minWidth) => {
      let rule = { [property]: displayRule };

      return wrapWithMediaQuery(rule, minWidth);
    });
  });
}

// Creates a rule-less class and creates a global rule that styles its adjacent
// child siblings.
// export function createResponsiveSpaceRuleForAdjacentSiblings(
//   property: string,
//   decorator?: (rule: {
//     [key: string]: string | number;
//   }) => { [key: string]: string | number },
// ) {
//   return mapValues(breakpoints, (space) => {
//     let variants = styleVariants(vars.space, () => ({}));

//     Object.entries(variants).forEach(([minWidth, cls]) => {
//       let globalRule = {
//         [property]: space,
//       };

//       globalStyle(
//         `${cls} > * + *`,
//         wrapWithMediaQuery(
//           decorator ? decorator(globalRule) : globalRule,
//           minWidth,
//         ),
//       );
//     });

//     return variants;
//   });
// }

export function createResponsiveSpaceRuleForAdjacentSiblings(
  property: string,
  decorator?: (rule: { [key: string]: string | number }) => {
    [key: string]: string | number;
  },
) {
  return mapValues(vars.space, (space) => {
    let variants = styleVariants(breakpoints, () => ({}));

    Object.entries(variants).forEach(([minWidth, cls]) => {
      let globalRule = {
        [property]: space,
      };

      globalStyle(
        `${cls} > * + *`,
        wrapWithMediaQuery(
          decorator ? decorator(globalRule) : globalRule,
          minWidth,
        ),
      );
    });

    return variants;
  });
}

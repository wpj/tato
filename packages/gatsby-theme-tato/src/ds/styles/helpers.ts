import { Properties } from 'csstype';
import { globalStyle, styleTree, Style } from 'treat';
import { mapValues } from 'lodash';

export function wrapWithMediaQuery(style: Style, minWidth: string | number) {
  if (minWidth === 0) {
    return style;
  }

  let unit = typeof minWidth === 'string' ? '' : 'px';

  return {
    '@media': {
      [`screen and (min-width: ${minWidth}${unit})`]: style,
    },
  };
}

// Converts a map of classnames -> css property values to a set of rules.
export const mapToStyleProperty = <
  Key extends string | number,
  Value extends string | number
>(
  map: Record<Key, Value>,
  propertyName: keyof Properties,
  mapper?: (value: Value, propertyName: keyof Properties) => Style,
) =>
  mapValues(map, (value: Value) =>
    mapper ? mapper(value, propertyName) : { [propertyName]: value },
  );

// Converts a map of classnames -> css property values to a set of responsive
// rules.
export function mapToResponsiveStyleProperty<
  Key extends string | number,
  Value extends string | number
>(map: Record<Key, Value>, property: keyof Properties) {
  return styleTree((theme, styleNode) => {
    return mapValues(map, (displayRule) => {
      return theme.breakpoints.map((minWidth: string | number) => {
        let rule = { [property]: displayRule };

        return styleNode(wrapWithMediaQuery(rule, minWidth));
      });
    });
  });
}

// Creates a rule-less class and creates a global rule that styles its adjacent
// child siblings.
export function createResponsiveSpaceRuleForAdjacentSiblings(
  property: string,
  decorator?: (rule: {
    [key: string]: string | number;
  }) => { [key: string]: string | number },
) {
  return styleTree((theme, styleNode) => {
    return mapValues(theme.space, (space) => {
      return theme.breakpoints.map((minWidth: string | number) => {
        let node = styleNode({});

        let globalRule = {
          [property]: space,
        };

        globalStyle(
          `${node} > * + *`,
          wrapWithMediaQuery(
            decorator ? decorator(globalRule) : globalRule,
            minWidth,
          ),
        );

        return node;
      });
    });
  });
}

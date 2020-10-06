import { styleTree } from 'treat';
import { mapValues } from 'lodash';
import {
  createResponsiveSpaceRuleForAdjacentSiblings,
  wrapWithMediaQuery,
} from './helpers';

function createSpaceStyles(property: string) {
  return styleTree((theme, styleNode) => {
    return mapValues(theme.space, (space) => {
      return theme.breakpoints.map((minWidth: string | number) => {
        let rule = { [property]: space };

        return styleNode(wrapWithMediaQuery(rule, minWidth));
      });
    });
  });
}

export const padding = {
  top: createSpaceStyles('paddingTop'),
  bottom: createSpaceStyles('paddingBottom'),
  left: createSpaceStyles('paddingLeft'),
  right: createSpaceStyles('paddingRight'),
};

export const margin = {
  top: createSpaceStyles('marginTop'),
  bottom: createSpaceStyles('marginBottom'),
  left: createSpaceStyles('marginLeft'),
  right: createSpaceStyles('marginRight'),
};

export const betweenY = createResponsiveSpaceRuleForAdjacentSiblings(
  'marginTop',
);
export const betweenX = createResponsiveSpaceRuleForAdjacentSiblings(
  'marginLeft',
);

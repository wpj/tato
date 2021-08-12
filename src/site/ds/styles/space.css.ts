import { style } from '@vanilla-extract/css';
import { mapValues } from 'lodash';
import { breakpoints } from '../../ds/theme/constants';
import { vars } from '../../ds/theme/theme.css';
import {
  createResponsiveSpaceRuleForAdjacentSiblings,
  wrapWithMediaQuery,
} from './helpers';

function createSpaceStyles(property: string) {
  return mapValues(vars.space, (space) => {
    return mapValues(breakpoints, (minWidth) => {
      let rule = { [property]: space };

      return style(wrapWithMediaQuery(rule, minWidth));
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

export const betweenY =
  createResponsiveSpaceRuleForAdjacentSiblings('marginTop');
export const betweenX =
  createResponsiveSpaceRuleForAdjacentSiblings('marginLeft');

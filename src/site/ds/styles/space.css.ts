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
  // return styleTree((theme, styleNode) => {
  //   return mapValues(theme.space, (space) => {
  //     return theme.breakpoints.map((minWidth: string | number) => {
  //       let rule = { [property]: space };

  //       return styleNode(wrapWithMediaQuery(rule, minWidth));
  //     });
  //   });
  // });
}

export const padding = {
  top: createSpaceStyles('paddingTop'),
  bottom: createSpaceStyles('paddingBottom'),
  left: createSpaceStyles('paddingLeft'),
  right: createSpaceStyles('paddingRight'),
};

// function createSpaceStyles(property: string) {
//   return mapValues(vars.space, (space) => {
//     return styleVariants(breakpoints, (minWidth) => {
//       let rule = { [property]: space };

//       let result =  wrapWithMediaQuery(rule, minWidth);

//       return result;
//     });
//   });
// }

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

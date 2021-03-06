import { styleVariants } from '@vanilla-extract/css';
import { mapToResponsiveStyleProperty } from './helpers';

export const position = styleVariants(
  {
    absolute: 'absolute',
    relative: 'relative',
    fixed: 'fixed',
    static: 'static',
    sticky: 'sticky',
  } as const,
  (position) => ({ position }),
);

export const display = mapToResponsiveStyleProperty(
  {
    block: 'block',
    flex: 'flex',
    inline: 'inline',
    inlineBlock: 'inline-block',
    inlineFlex: 'inline-flex',
    none: 'none',
  },
  'display',
);

export const flexDirection = mapToResponsiveStyleProperty(
  {
    column: 'column',
    columnReverse: 'column-reverse',
    row: 'row',
    rowReverse: 'row-reverse',
  },
  'flexDirection',
);

export const flexWrap = mapToResponsiveStyleProperty(
  {
    noWrap: 'nowrap',
    wrap: 'wrap',
    wrapReverse: 'wrap-reverse',
  },
  'flexWrap',
);

export const alignItems = mapToResponsiveStyleProperty(
  {
    baseline: 'baseline',
    center: 'center',
    end: 'flex-end',
    start: 'start',
    stretch: 'stretch',
  },
  'alignItems',
);

export const alignContent = mapToResponsiveStyleProperty(
  {
    center: 'center',
    flexEnd: 'flex-end',
    flexStart: 'flex-start',
    spaceAround: 'space-around',
    spaceBetween: 'space-between',
  },
  'alignContent',
);

export const alignSelf = mapToResponsiveStyleProperty(
  {
    auto: 'auto',
    center: 'center',
    flexEnd: 'flex-end',
    flexStart: 'flex-start',
    stretch: 'stretch',
  },
  'alignSelf',
);

export const justifyContent = mapToResponsiveStyleProperty(
  {
    center: 'center',
    flexEnd: 'flex-end',
    flexStart: 'flex-start',
    spaceAround: 'space-around',
    spaceBetween: 'space-between',
  },
  'justifyContent',
);

export const flexGrow = mapToResponsiveStyleProperty(
  {
    grow: '1',
    noGrow: '0',
  },
  'flexGrow',
);

export const flexShrink = mapToResponsiveStyleProperty(
  {
    shrink: '1',
    noShrink: '0',
  },
  'flexShrink',
);

export const zIndex = styleVariants(
  {
    low: 10,
    medium: 20,
    high: 30,
  },
  (zIndex) => ({ zIndex }),
);

const overflowMap = {
  auto: 'auto',
  hidden: 'hidden',
  visible: 'visible',
  scroll: 'scroll',
} as const;

export const overflow = styleVariants(overflowMap, (overflow) => ({
  overflow,
}));
export const overflowX = styleVariants(overflowMap, (overflowX) => ({
  overflowX,
}));
export const overflowY = styleVariants(overflowMap, (overflowY) => ({
  overflowY,
}));

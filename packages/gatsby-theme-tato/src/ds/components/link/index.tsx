import cc from 'classcat';
import React, { forwardRef, ElementType, AnchorHTMLAttributes } from 'react';

import { useReset } from '../../hooks';

export type Props = { as?: ElementType } & AnchorHTMLAttributes<
  HTMLAnchorElement
>;

type Ref = HTMLAnchorElement;

export const Link = forwardRef<Ref, Props>(
  ({ className, as: Component = 'a', ...props }, ref) => {
    let reset = useReset('a');

    let cls = cc([className, reset]);

    return <Component ref={ref} className={cls} {...props} />;
  },
);

import React, { FC } from 'react';
import { Link as StyledLink } from '../ds';

const CompatLink: FC<{ className: string; href: string }> = ({
  children,
  className,
  href,
}) => {
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
};

export const Link: FC<{ to: string; className?: string }> = ({
  children,
  className,
  to,
}) => {
  return (
    <StyledLink className={className} as={CompatLink} href={to}>
      {children}
    </StyledLink>
  );
};

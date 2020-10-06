import React, { FC } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Link as StyledLink } from '../ds';

const CompatLink: FC<{ className: string; href: string }> = ({
  children,
  className,
  href,
}) => {
  return (
    <GatsbyLink className={className} to={href}>
      {children}
    </GatsbyLink>
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

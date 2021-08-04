import React, { FC } from 'react';

import SearchForm from '../search/form';
import { Link } from '../link';

import { Box, Heading, Text } from '../../ds';

const navItemMargin = {
  right: { sm: 'none', md: 'medium' },
  left: { sm: 'medium', md: 'none' },
} as const;

const NavList: FC<{ items: { text: string; href: string }[] }> = ({
  items,
}) => {
  return (
    <Box as="ul" display="flex">
      {items.map(({ text, href }) => {
        return (
          <li key={href}>
            <Box mr={navItemMargin.right} ml={navItemMargin.left}>
              <Link to={href}>
                <Text
                  fontFamily="body"
                  color="white"
                  size="small"
                  weight="normal"
                >
                  {text}
                </Text>
              </Link>
            </Box>
          </li>
        );
      })}
    </Box>
  );
};

const Nav: FC<{ siteTitle: string; showSearch: boolean }> = ({
  siteTitle,
  showSearch,
}) => {
  return (
    <Box
      as="nav"
      display={showSearch ? { sm: 'block', md: 'flex' } : 'block'}
      alignItems="center"
      justifyContent="spaceBetween"
      flexWrap="wrap"
      p="medium"
      backgroundColor="purple"
    >
      <Box
        mb={showSearch ? { sm: 'medium', md: 'none' } : undefined}
        display="flex"
        alignItems="baseline"
        justifyContent="spaceBetween"
      >
        <Box mr={navItemMargin.right}>
          <Link to="/">
            <Heading
              color="white"
              level="1"
              fontFamily="header"
              size={{ sm: 'small', md: 'medium' }}
              weight="bold"
            >
              {siteTitle}
            </Heading>
          </Link>
        </Box>
        <NavList
          items={[
            { href: '/tags/', text: 'Tags' },
            { href: '/recipes/', text: 'All recipes' },
          ]}
        />
      </Box>
      {showSearch ? (
        <Box flexGrow="grow">
          <SearchForm preset="inline" />
        </Box>
      ) : null}
    </Box>
  );
};

export default Nav;

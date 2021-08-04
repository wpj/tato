import React from 'react';

import MainLayout from '../components/layouts/main';
import LinkList from '../components/link-list';
import { Box, Heading } from '../ds';

interface Props {
  recipes: { slug: string; title: string }[];
  siteTitle: string;
  name: string;
}

const TagTemplate = ({ recipes, siteTitle, name }: Props) => {
  const items = recipes.map(({ slug, title }) => {
    const text = title || slug;
    return { href: slug, text };
  });

  const pageTitle = `${siteTitle} | Tag - ${name}`;

  return (
    <MainLayout pageTitle={pageTitle} siteTitle={siteTitle}>
      <Box
        px={{ sm: 'medium', md: 'large' }}
        my={{ sm: 'medium', md: 'large' }}
      >
        <Heading align="center" level="1">
          Tag: {name}
        </Heading>
      </Box>
      <LinkList items={items} />
    </MainLayout>
  );
};

export default TagTemplate;

import React from 'react';

import MainLayout from '../components/layouts/main';
import LinkList from '../components/link-list';
import { Box, Heading } from '../ds';

interface Props {
  recipes: { slug: string; title: string }[];
  siteTitle: string;
}

const RecipeIndex = ({ siteTitle, recipes }: Props) => {
  const items = recipes.map(({ slug, title }) => {
    const href = slug;
    const text = title || href;
    return { href, text };
  });

  const pageTitle = `${siteTitle} | Recipes`;

  return (
    <MainLayout siteTitle={siteTitle} pageTitle={pageTitle}>
      <Box py={['medium', 'large']}>
        <Heading level="1">All recipes</Heading>
      </Box>
      <LinkList items={items} />
    </MainLayout>
  );
};

export default RecipeIndex;

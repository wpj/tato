import React from 'react';

import MainLayout from '../../components/layouts/main';
import LinkList from '../../components/link-list';
import { Box, Heading } from '../../ds';

interface Props {
  recipes: { href: string; title: string }[];
  siteTitle: string;
  tag: string;
}

const TagTemplate = ({ recipes, siteTitle, tag }: Props) => {
  const items = recipes.map(({ href, title }) => {
    const text = title || href;
    return { href, text };
  });

  const pageTitle = `${siteTitle} | Tag - ${tag}`;

  return (
    <MainLayout pageTitle={pageTitle} siteTitle={siteTitle}>
      <Box px={['medium', 'large']} my={['medium', 'large']}>
        <Heading align="center" level="1">
          Tag: {tag}
        </Heading>
      </Box>
      <LinkList items={items} />
    </MainLayout>
  );
};

export default TagTemplate;

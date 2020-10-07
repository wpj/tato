import React, { FC } from 'react';
import { paramCase } from 'change-case';

import MainLayout from '../components/layouts/main';
import LinkList from '../components/link-list';
import { Box, Heading } from '../ds';

const TagsPage: FC<{
  siteTitle: string;
  tags: { name: string; totalCount: number }[];
}> = ({ siteTitle, tags }) => {
  const links = tags.map(({ name, totalCount }) => {
    const href = `/tag/${paramCase(name)}/`;
    const text = `${name} (${totalCount})`;

    return { href, text };
  });

  const pageTitle = `${siteTitle} | Tags`;

  return (
    <MainLayout pageTitle={pageTitle} siteTitle={siteTitle}>
      <Box py={['medium', 'large']}>
        <Heading level="1">Tags</Heading>
      </Box>
      <LinkList items={links} />
    </MainLayout>
  );
};

export default TagsPage;

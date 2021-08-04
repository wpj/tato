import React, { FC } from 'react';

import MainLayout from '../components/layouts/main';
import LinkList from '../components/link-list';
import { Box, Heading } from '../ds';

const TagsPage: FC<{
  siteTitle: string;
  tags: { count: number; name: string; slug: string }[];
}> = ({ siteTitle, tags }) => {
  const links = tags.map(({ count, name, slug }) => {
    const text = `${name} (${count})`;

    return { href: slug, text };
  });

  const pageTitle = `${siteTitle} | Tags`;

  return (
    <MainLayout pageTitle={pageTitle} siteTitle={siteTitle}>
      <Box py={{ sm: 'medium', md: 'large' }}>
        <Heading level="1">Tags</Heading>
      </Box>
      <LinkList items={links} />
    </MainLayout>
  );
};

export default TagsPage;

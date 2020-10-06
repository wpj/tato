import React, { FC } from 'react';
import { graphql } from 'gatsby';
import { paramCase } from 'change-case';

import { Query } from '../graphql/types';
import MainLayout from '../components/layouts/main';
import LinkList from '../components/link-list';
import { Box, Heading } from '../ds';

const TagsPage: FC<{ data: Query }> = ({ data }) => {
  const group = data!.allMarkdownRemark!.group;
  const siteTitle = data!.site!.siteMetadata!.title!;

  const links = group.map((tag) => {
    const fieldValue = tag.fieldValue!;
    const href = `/tag/${paramCase(fieldValue)}/`;
    const text = `${fieldValue} (${tag.totalCount})`;

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

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

import React from 'react';
import { graphql, PageProps } from 'gatsby';

import MainLayout from '../components/layouts/main';
import { Query } from '../graphql/types';
import LinkList from '../components/link-list';
import { Box, Heading } from '../ds';

interface Props extends PageProps {
  data: Query;
}

const RecipeIndex = ({ data }: Props) => {
  const siteTitle = data.site!.siteMetadata!.title!;
  const items = data.allMarkdownRemark.edges.map(({ node }) => {
    const href = node.fields!.slug!;
    const text = node.frontmatter?.title || href;
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

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___title], order: ASC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

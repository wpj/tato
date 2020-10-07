import React from 'react';
import { graphql, PageProps } from 'gatsby';

import MainLayout from '../../components/layouts/main';
import { Query } from '../../graphql/types';
import LinkList from '../../components/link-list';
import { Box, Heading } from '../../ds';

interface Props extends PageProps {
  data: Query;
}

const TagTemplate = ({ data, pageContext }: Props) => {
  // @ts-ignore
  const { tag } = pageContext;

  const siteTitle = data.site!.siteMetadata!.title!;
  const items = data.allMarkdownRemark.edges.map(({ node }) => {
    const href = node.fields!.slug!;
    const text = node.frontmatter?.title || href;
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

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }

    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___title], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
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

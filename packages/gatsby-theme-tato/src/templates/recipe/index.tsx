import cc from 'classcat';
import React, { FC } from 'react';
import { graphql, PageProps } from 'gatsby';
import { useStyles } from 'react-treat';

import * as styleRefs from './recipe.treat';
import MainLayout from '../../components/layouts/main';
import { Query } from '../../graphql/types';

interface RecipeProps {
  content: string;
  title: string;
}

import { Box, Heading } from '../../ds';

export const Recipe: FC<RecipeProps> = ({ content, title }) => {
  let styles = useStyles(styleRefs);

  return (
    <article>
      <header>
        <Box px={['medium', 'large']} my={['medium', 'large']}>
          <Heading align="center" level="1">
            {title}
          </Heading>
        </Box>
      </header>
      <section
        className={cc([styles.article])}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
};

interface RecipeTemplateProps extends PageProps {
  data: Query;
}

const RecipeTemplate = ({ data }: RecipeTemplateProps) => {
  const recipe = data.markdownRemark!;
  const frontmatter = recipe.frontmatter!;
  const title = frontmatter.title!;
  const siteTitle = data.site!.siteMetadata!.title!;

  const pageTitle = `${siteTitle} | Recipe - ${title}`;

  return (
    <MainLayout pageTitle={pageTitle} siteTitle={siteTitle}>
      <Recipe title={title} content={recipe.html!} />
    </MainLayout>
  );
};

export default RecipeTemplate;

export const pageQuery = graphql`
  query RecipeBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
      }
    }
  }
`;

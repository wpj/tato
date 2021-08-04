import cc from 'classcat';
import React, { FC } from 'react';
import MainLayout from '../components/layouts/main';
import { Box, Heading } from '../ds';
import * as styles from './recipe.css';

interface Recipe {
  content: string;
  title: string;
}

export const Recipe: FC<Recipe> = ({ content, title }) => {
  return (
    <article>
      <header>
        <Box
          px={{ sm: 'medium', md: 'large' }}
          my={{ sm: 'medium', md: 'large' }}
        >
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

type RecipeTemplateProps = {
  siteTitle: string;
} & Recipe;

const RecipeTemplate = ({ siteTitle, title, content }: RecipeTemplateProps) => {
  const pageTitle = `${siteTitle} | Recipe - ${title}`;

  return (
    <MainLayout pageTitle={pageTitle} siteTitle={siteTitle}>
      <Recipe title={title} content={content} />
    </MainLayout>
  );
};

export default RecipeTemplate;

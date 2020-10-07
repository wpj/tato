import cc from 'classcat';
import React, { FC } from 'react';
import { useStyles } from 'react-treat';
import MainLayout from '../../components/layouts/main';
import { Box, Heading } from '../../ds';
import * as styleRefs from './recipe.treat';

interface Recipe {
  content: string;
  title: string;
}

export const Recipe: FC<Recipe> = ({ content, title }) => {
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

interface RecipeTemplateProps {
  siteTitle: string;
  recipe: Recipe;
}

const RecipeTemplate = ({ siteTitle, recipe }: RecipeTemplateProps) => {
  const pageTitle = `${siteTitle} | Recipe - ${recipe.title}`;

  return (
    <MainLayout pageTitle={pageTitle} siteTitle={siteTitle}>
      <Recipe title={recipe.title} content={recipe.content} />
    </MainLayout>
  );
};

export default RecipeTemplate;

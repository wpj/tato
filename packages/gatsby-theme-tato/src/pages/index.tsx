import React from 'react';
import { graphql, PageProps } from 'gatsby';

import MainLayout from '../components/layouts/main';
import { Query } from '../graphql/types';
import { Box } from '../ds';
import SearchForm from '../components/search/form';
import * as indexPageRefs from '../styles/pages/index.treat';

interface Props extends PageProps {
  data: Query;
}

const IndexPage = ({ data }: Props) => {
  const siteTitle = data.site!.siteMetadata!.title!;

  return (
    <MainLayout showSearch={false} siteTitle={siteTitle} pageTitle={siteTitle}>
      <Box className={indexPageRefs.marginTop}>
        <SearchForm autoFocus={true} preset="standalone" />
      </Box>
    </MainLayout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

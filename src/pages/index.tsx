import React from 'react';
import MainLayout from '../components/layouts/main';
import SearchForm from '../components/search/form';
import { Box } from '../ds';
import * as indexPageRefs from '../styles/pages/index.treat';

interface Props {
  title: string;
}

const IndexPage = ({ title }: Props) => {
  return (
    <MainLayout showSearch={false} siteTitle={title} pageTitle={title}>
      <Box className={indexPageRefs.marginTop}>
        <SearchForm autoFocus={true} preset="standalone" />
      </Box>
    </MainLayout>
  );
};

export default IndexPage;

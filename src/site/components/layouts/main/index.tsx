import '../../../ds/reset';
import '../../../global/style.css';

import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import { Box } from '../../../ds';
import Nav from '../../nav';
import { container } from '../../../styles/shared.css';

interface Props {
  showSearch?: boolean;
  siteTitle: string;
  pageTitle: string;
}

const MainLayout: FC<Props> = ({
  showSearch = true,
  siteTitle,
  pageTitle,
  children,
}) => {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>{pageTitle}</title>
      </Helmet>
      <Box as="header">
        <Nav showSearch={showSearch} siteTitle={siteTitle} />
      </Box>
      <Box mx="auto" className={container} as="main">
        <Box mx="large">{children}</Box>
      </Box>
    </>
  );
};

export default MainLayout;

// This must be imported first and it must be done here and not in
// gatsby-browser.js.
import '../../../ds/reset';
import '../../../global/style.css';

import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import { Box } from '../../../ds';
import Nav from '../../nav';
import { Provider } from '../../provider';
import { container } from '../../../styles/shared.treat';

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
    <Provider>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>{pageTitle}</title>
      </Helmet>
      <Box as="header">
        <Nav showSearch={showSearch} siteTitle={siteTitle} />
      </Box>
      <Box mx="auto" className={container} as="main">
        <Box mx="large">{children}</Box>
      </Box>
    </Provider>
  );
};

export default MainLayout;

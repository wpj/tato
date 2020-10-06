import React from 'react';
import { graphql, PageProps } from 'gatsby';

import { Query } from '../graphql/types';
import Layout from '../components/layouts/main';

interface Props extends PageProps {
  data: {
    site: Query['site'];
  };
}

const NotFoundPage = ({ data }: Props) => {
  const siteTitle = data.site!.siteMetadata!.title!;
  const pageTitle = `${siteTitle} | Not Found`;

  return (
    <Layout siteTitle={siteTitle} pageTitle={pageTitle}>
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

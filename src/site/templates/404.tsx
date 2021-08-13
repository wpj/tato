import React from 'react';
import Layout from '../components/layouts/main';

interface Props {
  siteTitle: string;
}

const NotFoundPage = ({ siteTitle }: Props) => {
  const pageTitle = `${siteTitle} | Not Found`;

  return (
    <Layout siteTitle={siteTitle} pageTitle={pageTitle}>
      <h1>Not Found</h1>
      <p>The page you requested was not found.</p>
    </Layout>
  );
};

export default NotFoundPage;

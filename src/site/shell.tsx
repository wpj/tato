import React, { ComponentType, useEffect, useState } from 'react';
import { getPage } from '../shared/page';
import MainLayout from './components/layouts/main';

export type Props = {
  pageTitle: string;
  siteTitle: string;
};

export default function Shell({ pageTitle, siteTitle }: Props) {
  let [pageUrl, setPageUrl] = useState<string | null>(null);
  let [page, setPage] = useState<{
    component: ComponentType;
    props: Record<string, unknown>;
  } | null>(null);

  useEffect(() => {
    setPageUrl(location.pathname);
  }, []);

  useEffect(() => {
    async function run() {
      if (pageUrl === null) {
        return;
      }

      let { component, props } = await getPage(pageUrl);

      setPage({ component, props });
    }

    run();
  }, [pageUrl]);

  if (page === null) {
    return (
      <MainLayout
        key="shell"
        showSearch={false}
        pageTitle={pageTitle}
        siteTitle={siteTitle}
      ></MainLayout>
    );
  }

  let { component: Component, props } = page;

  return <Component {...props} />;
}

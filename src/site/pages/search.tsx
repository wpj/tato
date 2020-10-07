import { parse as parseQueryString } from 'query-string';
import React, { FC, useEffect, useMemo } from 'react';
import SearchForm from '../components/search/form';
import Search from '../components/search/search';
import { Index } from '../components/search/search-index';
import { Box } from '../ds';
import MainLayout from '../components/layouts/main';

function navigate(url: string) {
  window.location.href = url;
}

const INDEX_FIELDS = ['source', 'tags', 'title'];

const SearchPage: FC<SearchPageDataQuery> = ({ data, location }) => {
  let siteTitle = data.site!.siteMetadata!.title!;

  let query = parseQueryString(location.search).q as string | undefined;

  let pageTitle = `${siteTitle} | Search Results`;

  let searchIndex = useMemo(() => {
    let documents = data.searchIndexData.nodes.map((node) => ({
      slug: node!.fields!.slug as string,
      source: node?.frontmatter?.source as string | null,
      tags: node?.frontmatter?.tags as string[] | null,
      title: node?.frontmatter?.title as string | null,
    }));

    return new Index({ documents, indexFields: INDEX_FIELDS });
  }, [data]);

  // Restore param that gatsby removes when it force refreshes the page after a
  // service worker update.
  useEffect(() => {
    try {
      let queryBackup = sessionStorage.getItem('queryBackup');
      sessionStorage.removeItem('queryBackup');

      if (!query && queryBackup) {
        navigate(`?q=${queryBackup}`);
      }
    } catch (e) {}
  }, [query]);

  return (
    <MainLayout showSearch={false} siteTitle={siteTitle} pageTitle={pageTitle}>
      <Box mt="large">
        <SearchForm initialQuery={query} preset="standalone" />
      </Box>
      <Box py="medium">
        {query ? <Search query={query} searchIndex={searchIndex} /> : null}
      </Box>
    </MainLayout>
  );
};

export default SearchPage;

import React, { useEffect, useMemo, FC } from 'react';
import { graphql, PageProps } from 'gatsby';
import { parse as parseQueryString } from 'query-string';
import { navigate } from '@reach/router';

import MainLayout from '../components/layouts/main';
import { SearchPageDataQuery } from '../graphql/types';
import SearchForm from '../components/search/form';
import { Index } from '../components/search/search-index';
import { Box } from '../ds';
import Search from '../components/search/search';

const INDEX_FIELDS = ['source', 'tags', 'title'];

const SearchPage: FC<PageProps<SearchPageDataQuery, null, null>> = ({
  data,
  location,
}) => {
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
        navigate(`?q=${queryBackup}`, { replace: true });
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

// The search index query must be performed in a page query rather than a
// static query because page queries are properly revisioned by the offline
// plugin.
export const pageQuery = graphql`
  query SearchPageData {
    site {
      siteMetadata {
        title
      }
    }

    searchIndexData: allMarkdownRemark(
      sort: { fields: [frontmatter___title], order: ASC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          source
          tags
          title
        }
      }
    }
  }
`;

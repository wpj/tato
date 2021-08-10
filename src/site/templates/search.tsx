import React, { useEffect, useMemo, useState } from 'react';
import MainLayout from '../components/layouts/main';
import SearchForm from '../components/search/form';
import Search from '../components/search/search';
import { Index } from '../components/search/search-index';
import { IndexData } from '../components/search/types';
import { Box } from '../ds';
import { useLocation } from '../routing';

const SearchPage = ({
  searchIndexPath,
  siteTitle,
}: {
  searchIndexPath: string;
  siteTitle: string;
}) => {
  let location = useLocation();
  let [query, setQuery] = useState<string | undefined>('');

  let pageTitle = `${siteTitle} | Search Results`;

  let [searchIndexData, setSearchIndexData] = useState<IndexData | null>(null);

  useEffect(() => {
    let searchParams = new URLSearchParams(location.search);
    let query = searchParams.get('q') ?? undefined;

    setQuery(query);
  }, [location]);

  useEffect(() => {
    async function run() {
      let data = await fetch(searchIndexPath).then((res) => res.json());
      setSearchIndexData(data);
    }

    run();
  }, [searchIndexPath]);

  let searchIndex = useMemo(() => {
    if (!searchIndexData) {
      return null;
    }

    return new Index(searchIndexData);
  }, [searchIndexData]);

  return (
    <MainLayout showSearch={false} siteTitle={siteTitle} pageTitle={pageTitle}>
      <Box mt="large">
        <SearchForm initialQuery={query} preset="standalone" />
      </Box>
      <Box py="medium">
        <Search query={query} searchIndex={searchIndex} />
      </Box>
    </MainLayout>
  );
};

export default SearchPage;

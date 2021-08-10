import React from 'react';

import { useSearch } from './use-search';
import Results from './results';
import { Index } from './search-index';

interface Props {
  query: string | undefined;
  searchIndex: Index | null;
}

export default function Search({ query, searchIndex }: Props) {
  let result = useSearch(searchIndex, query);

  if (result.status !== 'ok') {
    return null;
  }

  return <Results items={result.data} />;
}

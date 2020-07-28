import { useState, useCallback, useEffect } from 'react';

import { Index } from './search-index';

type QueryState<Data> =
  | {
      status: 'loading';
    }
  | {
      status: 'ok';
      data: Data;
    }
  | {
      status: 'error';
      error: Error;
    };

function useQuery<Data>(fetcher: () => Promise<Data>) {
  let [queryState, setQueryState] = useState<QueryState<Data>>({
    status: 'loading',
  });

  useEffect(() => {
    async function run() {
      try {
        let data = await fetcher();
        setQueryState({ status: 'ok', data });
      } catch (e) {
        setQueryState({ status: 'error', error: e });
      }
    }

    run();
  }, [fetcher]);

  return queryState;
}

export function useSearch(searchIndex: Index, query: string) {
  let fetchSearchResults = useCallback(() => {
    return query ? searchIndex.search(query) : Promise.resolve(null);
  }, [searchIndex, query]);

  return useQuery(fetchSearchResults);
}

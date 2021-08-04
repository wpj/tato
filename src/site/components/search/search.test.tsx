import '@testing-library/jest-dom/extend-expect';
import { useSearch } from './use-search';
import { Index } from './search-index';

jest.mock('./use-search', () => ({
  useSearch: jest.fn(),
}));

import React from 'react';
import { render } from '@testing-library/react';

import Search from './search';

const mockedUseSearch = useSearch as jest.Mock<ReturnType<typeof useSearch>>;

const searchIndex = new Index({
  documents: [],
  indexFields: [],
});

describe('Search', () => {
  test('displays nothing when a query error occurs', () => {
    mockedUseSearch.mockImplementation(() => ({
      status: 'error',
      error: new Error('Something went wront'),
    }));

    const { queryByTestId } = render(
      <Search query={''} searchIndex={searchIndex} />,
    );

    expect(queryByTestId('search-results')).toBeNull();
  });

  test('displays nothing when query is loading', () => {
    mockedUseSearch.mockImplementation(() => ({ status: 'loading' }));

    const { queryByTestId } = render(
      <Search query={''} searchIndex={searchIndex} />,
    );

    expect(queryByTestId('search-results')).toBeNull();
  });
});

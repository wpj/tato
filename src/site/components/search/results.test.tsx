import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import Results from './results';
import { SearchDocument } from './types';

const searchDocuments: SearchDocument[] = [
  {
    title: 'a',
    slug: '/a',
    source: null,
    tags: null,
  },
  {
    title: 'a',
    slug: '/b',
    source: null,
    tags: null,
  },
];

describe('Results', () => {
  test('displays "no results" when empty items are passed', () => {
    const { queryAllByTestId, queryByTestId } = render(
      <Results items={null} />,
    );

    expect(queryByTestId('search-results-summary')).toHaveTextContent(
      'No results found',
    );

    expect(queryAllByTestId('search-results-item')).toHaveLength(0);
  });

  test('displays pluralized results when a single item is passed', () => {
    const { queryAllByTestId, queryByTestId } = render(
      <Results items={[searchDocuments[0]]} />,
    );

    expect(queryByTestId('search-results-summary')).toHaveTextContent(
      '1 result found',
    );

    expect(queryAllByTestId('search-results-item')).toHaveLength(1);
  });

  test('displays pluralized results when multiple items are passed', () => {
    const { queryAllByTestId, queryByTestId } = render(
      <Results items={searchDocuments} />,
    );

    expect(queryByTestId('search-results-summary')).toHaveTextContent(
      '2 results found',
    );

    expect(queryAllByTestId('search-results-item')).toHaveLength(2);
  });
});

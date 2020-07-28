import React from 'react';

import { Box, Text, Stack } from '../../ds';
import { Link } from '../link';
import { SearchDocument } from './types';

interface Props {
  items: SearchDocument[] | null;
}

function Result({ slug, title }: Pick<SearchDocument, 'slug' | 'title'>) {
  return (
    <Box data-testid="search-results-item">
      <Link to={slug}>
        <Text>{title}</Text>
      </Link>
    </Box>
  );
}

function ResultsSummary({ items }: Props) {
  let summary =
    items !== null ? (
      <Text>
        {items.length} {items.length === 1 ? 'result' : 'results'} found
      </Text>
    ) : (
      <Text>No results found</Text>
    );

  return (
    <Box my="medium">
      <Text
        data-testid="search-results-summary"
        fontStyle="italic"
        color="darkgray"
      >
        {summary}
      </Text>
    </Box>
  );
}

export default function Results({ items }: Props) {
  return (
    <Box data-testid="search-results" px="small">
      <ResultsSummary items={items} />
      {items !== null ? (
        <Stack as="ul" divide="xxsmall" divideColor="gray">
          {items.map((item) => (
            <li key={item.slug}>
              <Box py="medium">
                <Result title={item.title} slug={item.slug} />
              </Box>
            </li>
          ))}
        </Stack>
      ) : null}
    </Box>
  );
}

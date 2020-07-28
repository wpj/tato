import cc from 'classcat';
import React, { useRef, SyntheticEvent } from 'react';
import { useStyles } from 'react-treat';
import { Search as SearchIcon } from 'react-feather';
import { navigate } from 'gatsby-link';

import { FormPreset } from './types';
import { Box, Text } from '../../ds';
import * as formRefs from './form.treat';
import { useReset } from '../../ds/hooks';

interface Props {
  autoFocus?: boolean;
  initialQuery?: string;
  preset: FormPreset;
}

function search(query: string) {
  // Back up the query to session storage in case gatsby force refreshes the
  // page after a site update.
  try {
    sessionStorage.setItem('queryBackup', query);
  } catch (e) {}

  navigate(`/search/?q=${query}`, { state: { query } });
}

export default function SearchForm({
  autoFocus = false,
  preset,
  initialQuery = '',
}: Props) {
  let inputRef = useRef<HTMLInputElement>(null);
  let formStyles = useStyles(formRefs);
  let reset = useReset('input');

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    let query = inputRef.current?.value;

    if (query) {
      search(query);
    }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Box
        borderRadius="medium"
        border={preset === 'standalone' ? 'weak' : undefined}
        borderColor="gray"
        display="flex"
        backgroundColor="white"
        overflow="hidden"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          px="small"
        >
          <Text color="darkgray" size="small">
            <SearchIcon className={formStyles.icon} width="1em" height="1em" />
          </Text>
        </Box>
        <label className={formStyles.hide} htmlFor="search-text">
          Search
        </label>
        <input
          autoCapitalize="off"
          autoCorrect="off"
          autoFocus={autoFocus}
          className={cc([
            reset,
            formStyles.input,
            preset === 'standalone' ? formStyles.large : formStyles.small,
          ])}
          defaultValue={initialQuery}
          id="search-text"
          inputMode="search"
          placeholder="Search recipes"
          ref={inputRef}
          type="search"
        />
      </Box>
    </form>
  );
}

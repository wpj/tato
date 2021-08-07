import cc from 'classcat';
import React, { SyntheticEvent, useRef } from 'react';
import { Box, Text } from '../../ds';
import { useReset } from '../../ds/hooks';
import SearchIcon from '../../icons/search';
import * as formStyles from './form.css';
import { FormPreset } from './types';
import { useRouting, Routing } from '../../routing';

interface Props {
  autoFocus?: boolean;
  initialQuery?: string;
  preset: FormPreset;
}

function search(navigate: Routing['navigate'], query: string) {
  navigate(`/search/?q=${query}`);
}

export default function SearchForm({
  autoFocus = false,
  preset,
  initialQuery = '',
}: Props) {
  let { navigate } = useRouting();
  let inputRef = useRef<HTMLInputElement>(null);
  let reset = useReset('input');

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    let query = inputRef.current?.value;

    if (query) {
      search(navigate, query);
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
            <SearchIcon className={formStyles.icon} />
          </Text>
        </Box>
        <label className={formStyles.hide} htmlFor="search-text">
          Search
        </label>
        <input
          autoCapitalize="none"
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

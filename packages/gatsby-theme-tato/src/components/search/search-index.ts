import { Search as JsSearch } from 'js-search';

import { IndexData, SearchDocument } from './types';

// Represents a field on a SearchDocument to filter by.
interface Filter {
  key: string;
  value: string;
}

const FILTER_PATTERN = /\S+:["']?(?:\S+,?)+["']?/g;

function isQueryWithFilters(query: string) {
  return FILTER_PATTERN.test(query);
}

function processFilterQuery(originalQuery: string): [string, Filter[]] {
  let keyValStrings = originalQuery.match(FILTER_PATTERN);

  let query = originalQuery.replace(FILTER_PATTERN, '').trim();

  let filters: Filter[] = keyValStrings!.map((keyVal: string) => {
    let firstColonIndex = keyVal.indexOf(':');

    let key = keyVal.slice(0, firstColonIndex);
    let value = keyVal.slice(firstColonIndex + 1, keyVal.length);

    return { key, value: value.replace(/["']/g, '') };
  });

  return [query, filters];
}

export class Index {
  #index: JsSearch;
  #documents: SearchDocument[];

  constructor(indexData: IndexData) {
    this.#index = new JsSearch('slug');
    this.#documents = indexData.documents;

    indexData.indexFields.forEach((index) => this.#index.addIndex(index));

    this.#index.addDocuments(indexData.documents);
  }

  private async searchWithQuery(rawQuery: string) {
    let [query, filters] = processFilterQuery(rawQuery);

    let unfilteredResults = query
      ? (this.#index.search(query) as SearchDocument[] | null)
      : this.#documents;

    if (!unfilteredResults) {
      return null;
    }

    let filteredResults = unfilteredResults.filter((result: SearchDocument) => {
      return filters.every((filter) => {
        if (!(filter.key in result)) {
          return false;
        }

        let values = filter.value.split(',');

        // @ts-ignore
        let testValue = result[filter.key];

        return values.every((value) => new RegExp(value).test(testValue));
      });
    });

    return filteredResults.length > 0 ? filteredResults : null;
  }

  async search(query: string) {
    if (isQueryWithFilters(query)) {
      return this.searchWithQuery(query);
    }

    let results = this.#index.search(query);

    return results.length > 0 ? (results as SearchDocument[]) : null;
  }
}

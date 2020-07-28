import { Index } from './search-index';

const DOCUMENTS = [
  {
    slug: '/first-recipe/',
    source: 'http://example-a.com',
    title: 'First recipe',
    tags: ['tag-a', 'tag-c'],
  },
  {
    slug: '/second-recipe/',
    source: 'http://test.com',
    title: 'Second recipe',
    tags: ['tag-a', 'tag-b'],
  },
  {
    slug: '/third-recipe/',
    source: 'http://example-b.com',
    title: 'Third recipe',
    tags: ['tag:with-special_characters'],
  },
];

const SEARCH_INDEX = new Index({
  documents: DOCUMENTS,
  indexFields: ['source', 'title', 'tags'],
});

describe('SearchIndex', () => {
  describe('without filters', () => {
    test('finds documents matching query', async () => {
      let results = (await SEARCH_INDEX.search('first'))!;

      expect(results).toHaveLength(1);
      expect(results[0]).toBe(DOCUMENTS[0]);
    });
  });

  describe('with filters', () => {
    test('finds documents matching query', async () => {
      let results = (await SEARCH_INDEX.search('recipe tags:"tag-c"'))!;

      expect(results).toHaveLength(1);
      expect(results[0]).toBe(DOCUMENTS[0]);
    });

    test('finds documents with query containing non-word characters', async () => {
      let results = (await SEARCH_INDEX.search('recipe tags:tag:with'))!;

      expect(results).toHaveLength(1);
      expect(results[0]).toBe(DOCUMENTS[2]);
    });

    test('finds documents with an empty non-filter query', async () => {
      let results = (await SEARCH_INDEX.search('tags:tag:with'))!;

      expect(results).toHaveLength(1);
      expect(results[0]).toBe(DOCUMENTS[2]);
    });

    test('finds documents with a multi-value query', async () => {
      let results = (await SEARCH_INDEX.search('tags:tag:with,tag-b'))!;

      expect(results).toBeNull();
    });

    test('finds documents with multiple filter instances', async () => {
      let results = (await SEARCH_INDEX.search('tags:tag-a tags:tag-b'))!;

      expect(results).toHaveLength(1);
      expect(results[0]).toBe(DOCUMENTS[1]);
    });

    test('finds documents filtered by multiple fields', async () => {
      let results = (await SEARCH_INDEX.search('tags:tag-a source:test.com'))!;

      expect(results).toHaveLength(1);
      expect(results[0]).toBe(DOCUMENTS[1]);
    });
  });
});

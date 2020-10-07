export interface SearchDocument {
  slug: string;
  source: string | null;
  tags: string[] | null;
  title: string | null;
}

type FieldIndex = string | string[];

export interface IndexData {
  documents: SearchDocument[];
  indexFields: FieldIndex[];
}

export type FormPreset = 'inline' | 'standalone';

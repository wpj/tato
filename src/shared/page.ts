import type { ComponentType } from 'react';
import { createJsonSlug } from './helpers';

export type Page = {
  template: string;
  props: Record<string, unknown>;
};

export async function fetchPageJson(pageUrl: string): Promise<Page | null> {
  let jsonUrl = createJsonSlug(pageUrl);

  let resp = await fetch(jsonUrl);

  if (!resp.ok) {
    return null;
  }

  return resp.json();
}

export async function getPage(
  pageUrl: string,
): Promise<{ component: ComponentType; props: Record<string, unknown> }> {
  let page = await fetchPageJson(pageUrl);

  if (!page) {
    throw new Error('Could not find page');
  }

  let { template, props } = page;

  let component = await import(`../site/templates/${template}.tsx`).then(
    (mod) => mod.default,
  );

  return { component, props };
}

export function createJsonSlug(pageSlug: string) {
  let slug;
  if (pageSlug.endsWith('.html')) {
    slug = pageSlug.replace('.html', '.json');
  } else if (pageSlug.endsWith('/')) {
    slug = `${pageSlug}index.json`;
  } else {
    slug = `${pageSlug}/index.json`;
  }

  return slug;
}

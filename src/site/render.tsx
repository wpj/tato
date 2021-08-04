import React, { ComponentType, useEffect, useState } from 'react';
import { hydrate } from 'react-dom';
import 'typeface-work-sans';
import { Provider as RoutingProvider } from './routing';

function createJsonSlug(pageSlug: string) {
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

function isInternalURL(url: string) {
  return new RegExp(`^${location.origin}`).test(url);
}

type Page = {
  template: string;
  props: any;
};

async function fetchPageJson(pageUrl: string): Promise<Page | null> {
  let jsonUrl = createJsonSlug(pageUrl);

  let resp = await fetch(jsonUrl);

  if (!resp.ok) {
    return null;
  }

  return resp.json();
}

function App({ template, ...initialProps }: { template: ComponentType }) {
  let [{ template: Template, props }, setState] = useState({
    template,
    props: initialProps,
  });

  async function setTemplate(url: string) {
    let pageUrl = url.split('?')[0];
    let page = await fetchPageJson(pageUrl);

    // If the requested page does not have associated JSON data, trigger a full
    // page load for the requested page URL.
    if (page === null) {
      location.href = url;
      return;
    }

    let Template = await import(`./templates/${page.template}.tsx`).then(
      (mod) => mod.default,
    );

    setState({ props: page.props, template: Template });
  }

  async function navigate(url: string) {
    await setTemplate(url);

    history.pushState(null, '', url);
  }

  useEffect(() => {
    function handleClick(this: unknown, e: MouseEvent) {
      for (
        let target = e.target as Element;
        target && target != this;
        target = target.parentNode as Element
      ) {
        if (target.matches('a[href]')) {
          let a = target as HTMLAnchorElement;
          if (isInternalURL(a.href)) {
            e.preventDefault();
            navigate(a.href);
          }
          break;
        }
      }
    }

    document.addEventListener('click', handleClick, false);

    function handlePopState() {
      setTemplate(location.href);
    }

    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <RoutingProvider value={{ navigate, setTemplate }}>
      <Template {...props} />
    </RoutingProvider>
  );
}

export default function render({
  component,
  props,
  target,
}: {
  component: ComponentType;
  props: Record<string, unknown>;
  target: HTMLElement;
}): void {
  hydrate(<App template={component} {...props} />, target);
}

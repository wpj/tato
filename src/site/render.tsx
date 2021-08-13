import React, { ComponentType, useEffect, useState } from 'react';
import { hydrate } from 'react-dom';
import 'typeface-work-sans';
import { getPage } from '../shared/page';
import { Location, Provider as RoutingProvider } from './routing';

function isInternalURL(url: string) {
  return new RegExp(`^${location.origin}`).test(url);
}

function App({
  component,
  initialProps,
}: {
  component: ComponentType;
  initialProps: Record<string, unknown>;
}) {
  let [{ component: Component, props }, setPage] = useState({
    component,
    props: initialProps,
  });

  let [location, setLocation] = useState<Location>({
    pathname: '',
    search: '',
  });

  async function setTemplate(url: string) {
    let pageUrl = url.split('?')[0];
    let page = await getPage(pageUrl);

    // If the requested page does not have associated JSON data, trigger a full
    // page load for the requested page URL.
    if (page === null) {
      window.location.href = url;
      return;
    }

    setPage(page);
  }

  useEffect(() => {
    setLocation(window.location);
  }, []);

  async function navigate(url: string) {
    let [pathname, search] = url.split('?');

    history.pushState(null, '', url);
    setTemplate(pathname);
    setLocation({
      pathname,
      search,
    });
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
      setLocation({
        pathname: window.location.pathname,
        search: window.location.search,
      });
    }

    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <RoutingProvider value={{ location, navigate, setTemplate }}>
      <Component {...props} />
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
  hydrate(<App component={component} initialProps={props} />, target);
}

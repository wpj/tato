import { createContext, useContext } from 'react';

export type Location = {
  pathname: string;
  search: string;
};

export interface Routing {
  navigate(url: string): void;
  setTemplate(url: string): void;
  location: {
    pathname: string;
    search: string;
  };
}

export const context = createContext<Routing>({
  navigate: () => {},
  setTemplate: () => {},
  location: { pathname: '', search: '' },
});

export const Provider = context.Provider;

export function useRouting(): Routing {
  return useContext(context);
}

export function useLocation(): Location {
  return useRouting().location;
}

import { createContext, useContext } from 'react';

export interface Routing {
  navigate(url: string): void;
  setTemplate(url: string): void;
}

export const context = createContext<Routing>({
  navigate: () => {},
  setTemplate: () => {},
});

export const Provider = context.Provider;

export function useRouting(): Routing {
  return useContext(context);
}

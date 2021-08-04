declare module '*.module.css' {
  const content: Record<string, string>;

  export default content;
}

declare module 'react-dom/server.js' {
  export * from 'react-dom/server'
}

declare module 'hast-util-select' {
  import type { Element, Node } from 'hast';

  export function selectAll(
    selector: string,
    node: Node,
    namespace?: string,
  ): Element[];
}

declare module 'lqip';

declare module 'remark-retext';

declare module 'retext-stringify';

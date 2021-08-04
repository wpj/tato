import { ServerRender } from 'julienne';
import React, { ComponentType, ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server.js';
import { Helmet } from 'react-helmet';

export let render: ServerRender<ComponentType> = (Component, props) => {
  let html = renderToStaticMarkup(React.createElement(Component, props));
  let helmet = Helmet.renderStatic();

  let title = (helmet.title.toComponent() as unknown) as ReactElement;
  let head = renderToStaticMarkup(title);

  return { html, head };
};

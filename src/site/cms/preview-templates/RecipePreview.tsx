import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Recipe } from '../../templates/recipe';

interface RecipePreviewProps {
  entry: any;
  widgetFor: any;
}

export default function RecipePreview({
  entry,
  widgetFor,
}: RecipePreviewProps) {
  let widgetContent = widgetFor('body');

  let content = renderToStaticMarkup(widgetContent);

  let title: string = entry.getIn(['data', 'title']);

  return <Recipe title={title} content={content} />;
}

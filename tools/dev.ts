import express from 'express';
import { createReadStream } from 'fs';
import { createDevRenderer } from 'julienne';
import mime from 'mime-types';
import { basename } from 'path';
import { getSite } from '../src/config';
import { config } from '../src/build-config';
import { createResolve } from '../src/module';

let port = process.env.PORT || 3000;

let resolve = createResolve(import.meta.url);

async function dev() {
  let site = await getSite(resolve('../content'));
  let [renderer, vite] = await createDevRenderer(config);

  let app = express();

  app.use(vite.middlewares);

  app.use(async (req, res, next) => {
    let path = req.path;
    let resource = site.get(path);

    if (!resource) {
      next();
      return;
    }

    if (resource.action.type === 'remove') {
      res.status(404).send('Not found');
      return;
    }

    switch (resource.type) {
      case 'file': {
        let getFile = resource.action.getData;

        let file = await getFile();

        let data =
          file.type === 'copy' ? createReadStream(file.from) : file.data;

        let contentType = mime.contentType(
          path.endsWith('/') ? 'index.html' : basename(path),
        );

        if (contentType) {
          res.set('Content-Type', contentType);
        }

        res.send(data);

        return;
      }

      case 'page': {
        let getPage = resource.action.getData;

        let page = await getPage();

        let rendered = await renderer.render(page.template, page.props);
        res.type('text/html;charset=utf-8').send(rendered);

        return;
      }
    }
  });

  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}

dev();

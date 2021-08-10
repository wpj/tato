# tato

Static site generator for an offline recipe browsing app.

## Install

`npm install @wpj/tato`

## Usage

Example usage:

```sh
npx --package @wpj/tato tato build --dir /path/to/markdown
```

### build

```sh
Usage
  $ tato build [options]

Options
  -d, --dir           Directory containing markdown files to render
  --service-worker    Generate a service worker to enable offline access  (default false)
  -h, --help          Displays this message
```

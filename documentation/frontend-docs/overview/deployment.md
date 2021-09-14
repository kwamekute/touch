---
sidebar_position: 6
---

# Deployment

## Building

**npm run build** creates a build directory with a production build of your app. Read more about this functionality on the official Create React App **[docs website](https://create-react-app.dev/docs/available-scripts#npm-run-build)**.

## Hosting

Set up your favorite HTTP server to serve the entirety of the output build folder, or upload it directly on a CDN platform. Point its default to index.html file.

# Local development

## Default script

**npm run dev** starts a local Webpack development server with hot-reload which registers every change as they are saved in your files.

## Serve

For environments using `NodeJS`, the easiest way to handle this would be to install `serve` npm package and let it handle the requests:

:::tip
Please note that serve can not and should not be used on production environments.
:::

```shell
npm install -g serve
serve -s build
```

The last command shown above will serve your static site on the port 5000. Like many of serve’s internal settings, the port can be adjusted using the `-l` or `--listen` flags:

```shell
serve -s build -l 4000
```

Run this command to get a full column of the options available:

```shell
serve -h
```

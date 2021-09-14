---
sidebar_position: 3
---

# Getting Started

You need to have **[NodeJs](https://nodejs.org/en/)** and **[npm](https://www.npmjs.com/)** installed on your **[machine]**.

You can use **[nvm](https://github.com/creationix/nvm#installation)** (macOS/Linux) or **[nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows)** to switch Node versions between different projects.

# Install dependencies

Open the project folder and install its dependencies. You can use any package manager you want: **[yarn](https://yarnpkg.com/)** or **[npm](https://www.npmjs.com/)**. There might be other package managers that were not listed here..

```shell
cd project-folder
npm install
```

# Start development sever

Once the installation is done, you can run the app by running **npm start** or **yarn start**

```shell
npm start
```

you should see something similar to:

```shell
Compiled successfully!

You can now view @devias-io/material-kit-pro-react in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.5:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

This runs the app in development mode. Open **[localhost:3000](http://localhost:3000)** to view it in the browser.

While in development mode, the page will automatically reload if you make changes to the code. Should you have any errors, you will see the build errors and lint warnings in the console.

# Build project files

```shell
npm run build
```

or

```shell
yarn build
```

This builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include hashes.

If you have made your necessary changes, by this time, your app should ready to be deployed.

:::tip

:::

Anything **unclear** or **buggy** in this tutorial? [Please report it!](https://github.com/facebook/docusaurus/discussions/4610)

## What's next?

- Read the [official documentation](https://docusaurus.io/).
- Add a custom [Design and Layout](https://docusaurus.io/docs/styling-layout)
- Add a [search bar](https://docusaurus.io/docs/search)
- Find inspirations in the [Docusaurus showcase](https://docusaurus.io/showcase)
- Get involved in the [Docusaurus Community](https://docusaurus.io/community/support)

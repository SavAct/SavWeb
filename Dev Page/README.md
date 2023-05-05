# Page Development Environment

In order to upload an immortal website or dApp it is more efficient to upload the whole application in one file and with a minimum number of bytes. This environment is a template which fulfils this requirement in an optimal way.

It uses <span style="color: #3478c6;">TypeScript</span> for type safety. <span style="color: #ab40f6;">Vite</span> and <span style="color: #5ea3ef;">Quasar</span> with <span style="color: #64b586;">Vue 3</span> are used for a fast development process.
The resulting file size is reduced by using the publicly hosted libraries of Quasar and Vue.

# Setup

1. Clone this repository

```bash
git clone https://github.com/SavAct/SavWeb.git
```

2. Use [Visual Studio Code](https://code.visualstudio.com/download) to open the file `SavWeb-Page.code-workspace`.

3. Install the VS Code extention [Vue Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to work faster with `.vue` files.

## Commands

Install dependencies

```bash
yarn install
```

Developing mode for instant code change update

```bash
yarn dev
```

Transpile the code to a single html file

```bash
yarn build
```

Transpile the code to a single html file and show it in the SavAct browser

```bash
yarn show
```

## Load other icon libraries

Add other icon libraries in the header of index.html.
See here for more information: https://quasar.dev/start/umd

# Notes

## To keep the file size small

- Do not use anything from Vue or Quasar via `import` expect of type definitions. Because all their methods are already defined in the global objects `Vue` and `Quasar`.
- Upload the application with the option `compress` on the file upload page with the SavAct app.

## To load applications fast

- Transpile your application into a single `html` file.
- Use the `compress` option on the SavAct app file upload page.

## Quasar plugins

The Quasar plugins do not need to be installed.

Example to display a Quasar notify:

```Typescript
Quasar.Notify.create({ type: "positive", message: "Hello World", position: "top"});
```

## Downside of external libraries

If the publicly hosted libraries are down, the application will also not be shown as desired.
In that case the frontend must be updated. Another option is that these libraries will be provided and replaced by the SavWeb browser itself. That may be the case for important libraries. But for now, it is not expected that the used libraries will be taken offline in the lifetime of a website, because they are also necessary for thousands of centralized websites.

## Licence

MIT

# File upload

In order to upload a file you need to use this [smart contract](../Smart%20Contract\site). Upload it by yourself or use an already deployed one.

If you have transpiled your application, you can upload the `html` file in the [dist](./dist) folder with the SavAct app, see [https://savact.app/#/\_fileupload\_](https://savact.app/#/_fileupload_)

# Access immortal dApps and websites

You can open the application with the SavAct browser, see [https://savact.app/#/\_browser\_](https://savact.app/#/_browser_)

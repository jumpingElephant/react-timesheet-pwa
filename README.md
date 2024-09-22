# Progressive Web App with React

## Initial Setup

Starting point: [Making a Progressive Web App](https://create-react-app.dev/docs/making-a-progressive-web-app)

```shell
npx create-react-app my-app --template cra-template-pwa
```

with [React Router](https://reactrouter.com/en/main): [Adding a Router](https://create-react-app.dev/docs/adding-a-router)

```shell
npm install --save react-router-dom
```

and
with [React Bootstrap](https://react-bootstrap.github.io/docs/components/accordion): [Adding Bootstrap](https://create-react-app.dev/docs/adding-bootstrap)

```shell
npm install bootstrap
```

- [Grid system](https://react-bootstrap.github.io/docs/layout/grid)
- [CSS Tricks flexbox guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background)

and with [React Icons](https://react-icons.github.io/react-icons/)

```shell
npm install react-icons
```

and with [date-fns](https://date-fns.org/docs/Getting-Started)

```shell
npm install date-fns
```

and with [React Swipeable](https://commerce.nearform.com/open-source/react-swipeable/docs/)

```shell
npm install react-swipeable
```

and with [idb - IndexedDB with usability](https://github.com/jakearchibald/idb#readme) ([mdn: IndexedDbb](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB))

```shell
npm install idb
```

leverage the react-app-rewired package to override the default Webpack config, for providing the app version

```shell
npm install --save-dev react-app-rewired
```


## Run Locally

```shell
npm start
```

## Build For Production

```shell
npm run build
```

## Lint Locally

```shell
eslint . --max-warnings=0 && npm run build
```

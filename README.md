# delay-proxy

[![npm version](https://badge.fury.io/js/delay-proxy.svg)](https://www.npmjs.com/package/delay-proxy)

You may know and use the chrome dev tools and its _Network_ tab where you can [emulate slow network connections](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#throttling). The problem is that it applies to all requests, you can't emulate together:

- a slow network
- a slow api.foo.com in general
- only a very slow endpoint on api.bar.com

With `delay-proxy`, you can proxy your requests specifying a delay and a url.

http://localhost:8001/delay/\<delay-in-ms>/\<url>

Example calls:

- image: http://localhost:8001/delay/2000/https://via.placeholder.com/350x150/F00000/FFFFFF?text=Hello+world
- json: `curl http://localhost:8001/delay/1000/https://jsonplaceholder.typicode.com/posts/1/comments`

## Usage

### Command line

#### Install globally

```shell
npm install -g delay-proxy
```

Once that done, you can launch it from anywhere with:

```shell
delay-proxy
```

Available options:

- `delay-proxy --help`
- `delay-proxy --version`
- `delay-proxy --port 9000`: lets you specify which port you want to use (default: `8001`)

#### Install locally

You might not like to install the package globally or wanna ship and use this package as a dev dependency in your project:

```shell
npm install --save-dev delay-proxy
```

Run it using [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) (an npm package runner shipped with npm since v5.2.0):

```shell
npx delay-proxy
```

### As a module

`delay-proxy` also works as a required module.

```js
const PORT = 8001;
const LOCAL_IP = require("my-local-ip")(); // optional

const { makeServer } = require("delay-proxy");

makeServer({ port: PORT, localIp: LOCAL_IP }).listen(PORT, () =>
  console.log(
    "delay-proxy now listening on",
    `http://localhost:${PORT}`,
    `${LOCAL_IP}:${PORT}`
  )
);
```

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Uninstall `delay-proxy` if it's already installed: `npm uninstall -g delay-proxy`
3. Link it to the global module directory: `npm link`

After that, you can use the `delay-proxy` command everywhere.

### Only contribute on the server

If your feature/fix isn't about the cli but the server, you don't need to `npm link`. Make sure you `npm install` then run:

```
npm run dev
```

This will launch the server and reload it when you update the source code, thanks to [nodemon](https://www.npmjs.com/package/nodemon).

### Contributing guidelines

- follow the [AngularJS git commit guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits) for your commit messages (it make it easier to generate changelog)
  - to generate changelog: `npm run generate-changelog -- v1.1.0 v1.2.0`
- your code will automatically be:
  - linted by [eslint](https://eslint.org/)
  - formatted by [prettier](https://prettier.io/)

## Author

Christophe Rosset ([@topheman](https://twitter.com/topheman)) - [labs.topheman.com](http://labs.topheman.com)

# Webpacked p5.js

p5.js sketch enhanced with features from node and webpack

## Why?

I enjoy developing projects using p5.js, but the larger the project the harder it is to keep organized. One solution is to write different code in different scripts. However that requires to include every script inside the index HTML file, in the correct order. This quickly becomes very tideous and hard to read.

Thats why I want to use one of the main benefits of node, the ability of static and dynamic imports of other scripts:

```js
import { myMethod, MyClass } from './myLibrary';
```

Of course this comes at the cost of needing to compile and build the project each time. This is why webpack is used. To easily serve a development server and build the final project.

## Usage

1. Install node.js and npm
2. Install required packages

```sh
npm install
```

3. Run development server

```sh
npm start
```

Development server loopbacks at: [localhost:8080](http://localhost:8080/)

4. Build final project

```sh
npm run build
```

Final build is located at `/dist`

### Features

-   [x] Staticly accessed p5.js
-   [x] 2 drawing layers (general and UI)
-   [x] Shaders (normal and filter)
-   [x] Images
-   [x] Fonts

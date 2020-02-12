# seisankun_front

> A Vue.js project

## 初期準備
1. cloneした後、root配下に `config` ディレクトリを作成してください。
2. その配下に `dev.env.js` ファイルを作成してください。
3. `dev.env.js` は以下を参考にしてください。

``` js
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FIRE_BASE_API_KEY: '"API_KEY"',
  FIRE_BASE_AUTH_DOMAIN: '"AUTH_DOMAIN"',
  FIRE_BASE_DATABASE_URL: '"DATABASE_URL"',
  FIRE_BASE_PROJECT_ID: '"PROJECT_ID"',
  FIRE_BASE_MESSAGEING_SENDERID: '"MESSAGEING_SENDERID"',
  FIRE_BASE_APP_ID: '"APP_ID"'
})

```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

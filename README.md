# seisankun_front

> A Vue.js project
## 環境
### バージョン
 - vue : 2.6.11
 - vue-cli : 3.4.0
 - ndoe.js : v10.8.0
 - npm : 6.2.0
### 本番環境URL
 - https://seisan-kun.netlify.app/#/top
### 開発環境URL
- http://localhost:{ポートはご自由に(デフォルトは8080)}/#/top

### バックエンドAPI
 - seisankun_api https://github.com/nooboolean/seisankun_api

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
  FIRE_BASE_API_KEY: '"FIREBASEのAPI_KEY"',
  FIRE_BASE_AUTH_DOMAIN: '"FIREBASEのAUTH_DOMAIN"',
  FIRE_BASE_DATABASE_URL: '"FIREBASEのDATABASE_URL"',
  FIRE_BASE_PROJECT_ID: '"FIREBASEのPROJECT_ID"',
  FIRE_BASE_MESSAGEING_SENDERID: '"FIREBASEのMESSAGEING_SENDERID"',
  FIRE_BASE_APP_ID: '"FIREBASEのAPP_ID"',
  SEISANKUN_API_BASE_URL: '"バックエンドAPIのBaseURL"',
  BASIC_AUTH_API_USER_NAME: '"バックエンドAPIのBasic認証用ユーザー"',
  BASIC_AUTH_API_PASSWORD: '"バックエンドAPIのBasic認証用パスワード"'
})

```
4.[バックエンドAPI](https://github.com/nooboolean/seisankun_api)の準備をしてください

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

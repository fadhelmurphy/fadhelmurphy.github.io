---
title: Membuat UI Component Library
date: 2020-10-20T00:00:00.000Z
path: /membuat-ui-component-library
tags: ["Frontend", "Javascript-library"]
---

# <a name="_1xcswd2zbei0"></a><a name="_qjes6bws1ego"></a>Source Code
<https://github.com/fadhelmurphy/mamatgarem-ui-starter>

# <a name="_w03jp2lrozjt"></a>Build & Publish diagram

# <a name="_6m01h39ziv84"></a>Registration
Buat dulu akun lu di npm.

https://www.npmjs.com/signup

Setelah login, bikin dulu organizationnya di npm. Klik tombol + pada Organizations.



Terus lu masukin deh tuh nama library lu, misalkan disini gue namanya **@mangkodir-ui** .



Setelah itu klik skip this for now aja.


Nanti hasilnya kek gini.


# <a name="_haof6zy3stn7"></a>Setup .npmrc
Setelah lu registrasi dan buat organization di npm, kita perlu bikin file .npmrc di device biar bisa pake package lu.


Pilih “Access Token” pada sidebar

Pilih yg classic token.



Nanti hasilnya tuh kek gini


Setelah itu bikin .npmrc di device lu.

Kalo lu pake mac, bikin file .npmrc di /Users/**fdn-fadelijlalfalah**

**fdn-fadelijlalfalah** : ini username di laptop gue.

Kalo lu pake windows, bikin file .npmrc di C:\users\**fadhel**\

**Fadhel** : ini username di device windows gue.

Terus lu isi file nya seperti dibawah ini:

//registry.npmjs.org/:\_authToken=**npm\_XcwNpjDF0doqNPIfzGspjlbpAYuBHS363RYO**

@**mangkodir-ui**:registry=https://registry.npmjs.org/

email=**krazefollow@gmail.com**

always-auth=true

**npm\_XcwNpjDF0doqNPIfzGspjlbpAYuBHS363RYO** : ini merupakan token yg tadi lu generate di npm.

**mangkodir-ui** : ini nama organization di npm.

**krazefollow@gmail.com** : ini email yg lu daftarin di npm
# <a name="_b32aajlj6lk3"></a>Installation

Pertama ketik 

npm init 

##

<a name="_sqa5zeiwsh7w"></a>Kelar itu lu install dulu lerna secara global dengan ketik

Npm install -g lerna

Nah baru deh lu generate json lerna nya dengan cara

Npx lerna init --packages="packages/\*"

Terus ganti lerna.json dengan code seperti dibawah

{

"npmClient": "npm",

"version": "independent",

"hoist": true,

"stream": true,

"private": true,

"useWorkspaces": true,

"bootstrap": {

"npmClientArgs": ["--no-package-lock"]

},

"command": {

"publish": {

"allowBranch": ["master"]

}

},

"useNx": false

}


Setelah itu kita setup si rollup buat nge bundling package kita. Dibawah ini ada analogi nya si rollup itu ngapain.


Pertama kita install library-library yg dibutuhin untuk rollup.

yarn add –D rollup react react-dom rollup-plugin-babel rollup-plugin-commonjs rollup-plugin-node-resolve rollup-plugin-terser @babel/core @babel/preset-env @babel/preset-react

Berikut ini ada code untuk package.json nya. Di bagian @mangkodir-ui bisa diganti dengan nama organization yg udah lu buat di npm.

{

"name": "belajar-monorepo",

"commands": {

"publish": {

"ignoreChanges": [

"\*\*/\*.md",

"\*.txt",

"\*\*/example/\*\*",

"test/\*\*",

"\*\*/test/\*\*",

"tests/\*\*",

"\*\*/tests/\*\*",

"packages/\*\*/package-lock.json"

]

}

},

"version": "1.0.0",

"description": "",

"main": "index.js",

"npmClient": "yarn",

"private": true,

"scripts": {

"build": "lerna exec -- rollup -c=../../rollup.config.js --bundleConfigAsCjs",

"watch": "lerna exec --no-sort -- rollup -w -c=../../rollup.config.js --bundleConfigAsCjs",

"single": "lerna exec --scope @mangkodir-ui/$packages -- rollup -c=../../rollup.config.js --bundleConfigAsCjs",

"single:watch": "lerna exec --scope @mangkodir-ui/$packages -- rollup -w -c=../../rollup.config.js --bundleConfigAsCjs"

},

"keywords": [],

"author": "",

"license": "Gunadarma",

"workspaces": [

"packages/\*"

],

"devDependencies": {

"@babel/core": "^7.22.9",

"@babel/preset-env": "^7.22.9",

"@babel/preset-react": "^7.22.5",

"lerna": "^5.5.1",

"react": "^18.2.0",

"react-dom": "^18.2.0",

"rollup": "^3.26.3",

"rollup-plugin-babel": "^4.4.0",

"rollup-plugin-commonjs": "^10.1.0",

"rollup-plugin-node-resolve": "^5.2.0",

"rollup-plugin-terser": "^7.0.2",

"styled-jsx": "^5.1.2"

},

"peerDependencies": {

"react": "^18.2.0",

"styled-jsx": "^5.1.2"

}

}




**build** : untuk melakukan build pada seluruh package

**watch** : untuk melakukan build pada seluruh package dan akan melakukan build lagi ketika ada perubahan code.

**single** : untuk melakukan build pada scope/spesifik package.

**single:watch** : untuk melakukan build pada scope/spesifik package.

Setelah selesai mengubah package.json, kita perlu melakukan konfigurasi rollup.

# <a name="_gcawd1z00atu"></a>Konfigurasi rollup.config.js
Agar package dapat berjalan di browser lama dan mengecilkan hasil bundler, kita perlu melakukan konfigurasi seperti dibawah ini:

import babel from "rollup-plugin-babel"

import resolve from "rollup-plugin-node-resolve"

import commonjs from "rollup-plugin-commonjs"

import path from "path"

const { LERNA\_PACKAGE\_NAME } = process.env;

const PACKAGE\_ROOT\_PATH = process.cwd();

const PKG\_JSON = require(path.join(PACKAGE\_ROOT\_PATH, "package.json"));

const INPUT\_FILE = path.join(PACKAGE\_ROOT\_PATH, `${PKG\_JSON.srcFile}/${PKG\_JSON.srcName}.js`);

const OUTPUT\_DIR = path.join(PACKAGE\_ROOT\_PATH, "dist");

const IS\_BROWSER\_BUNDLE = !!PKG\_JSON.browser;

const formats = IS\_BROWSER\_BUNDLE ? ["umd"] : ["es", "cjs"];

export default formats.map(format => ({

plugins: [

resolve(),

commonjs({

include: /node\_modules/,

namedExports: {

"react-js": ["isValidElementType"],

"react-is": ["typeOf", "isElement", "isValidElementType"]

}

}),

babel({

exclude: ["node\_modules/\*\*"],

presets: [['@babel/preset-env', {'modules': false}],'@babel/react'],

plugins: ["styled-jsx/babel"]

}),

],

input: INPUT\_FILE,

external: [

'react',

'react-dom',

],

output: {

...(format === "umd" ? {file: path.join(OUTPUT\_DIR, `${PKG\_JSON.srcName}.${format}.js`)} : {}),

format,

sourcemap: true,

name: LERNA\_PACKAGE\_NAME,

amd: {

id: LERNA\_PACKAGE\_NAME

},

...(format !== "umd" ? {dir: OUTPUT\_DIR} : {}),

},

...(format !== "umd" ? {preserveModules: true} : {}),

}));


Disini terdapat 3 plugin yg digunakan pada rollup:

**Resolve**: untuk menggabungkan modul-modul yg udah di install yg digunakan di node\_modules

**Commonjs**: untuk transpile javascript ke format module cjs.

(biar bisa pake syntax require(“nganu”) gitu deh)

**Babel**: untuk menerjemah javascript agar dapat di gunakan di browser lama.

Pada konfigurasi rollup ini kita menggunakan modul UMD agar syntax nya bisa dijalankan di serverside atau clientside.

Untuk penjelasannya ada disini yak, gue ga terlalu dalem soal module ini.

<https://mazipan.space/javascript-module-dan-keribetannya>

<https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm>

\*kalo mau improve soal ini monggo

# <a name="_w58169urjnzl"></a>Konfigurasi package.json untuk scope package

Setiap package perlu di konfigurasi agar hasil build dapat digunakan.

{

"name": "@mangkodir-ui/button\_test",

"version": "1.0.0",

"description": "> TODO: description",

"author": "Fadhel <fadhelijlalfalah@gmail.com>",

"homepage": "https://github.com/fadhelmurphy/mangkodir-ui-starter#readme",

"license": "ISC",

"srcFile": "lib",

"srcName": "button\_test",

"main": "dist/button\_test.umd.js",

"files": [

"dist/"

],

"publishConfig": {

"access": "public"

},

"repository": {

"type": "git",

"url": "git+ssh://git@github.com/fadhelmurphy/mamatgarem-ui-starter.git"

},

"scripts": {

"test": "echo \"Error: run tests from root\" && exit 1"

},

"browser": true,

"bugs": {

"url": "https://github.com/fadhelmurphy/mamatgarem-ui-starter/issues"

}

}

**main**: merupakan path utama yg dituju ketika package diarahkan @mangkodir-ui/button\_test. Disini diarahkan ke file hasil buildnya biar bisa di consume yaitu **dist/button\_test.umd.js**

**publishConfig**: ini merupakan konfigurasi publish package kita. karena kita menggunakan npm, by default kita ga perlu menambahkan object key registry. 

Jika kita menggunakan custom registry dapat menambahkan seperti ini.

"publishConfig": {

"registry": "https://registry.npmjs.org",

"access": "public"

},

# <a name="_spx3od33m2lp"></a>Cara build
## <a name="_su46rgk3d2gv"></a>**Bash/Mac**
packages={nama\_package\_lu} yarn single

Contoh:

packages=button\_test yarn single
## <a name="_884jgutcm3ji"></a>**Windows**
lerna exec --scope @mangkodir-ui/{nama\_package\_lu} -- rollup -c=../../rollup.config.js --bundleConfigAsCjs

Contoh: 

lerna exec --scope @mangkodir-ui/button\_test -- rollup -c=../../rollup.config.js --bundleConfigAsCjs

## <a name="_jopj0km2ojqn"></a>Hasil setelah build



Setelah berhasil build akan men generate file js di dalam folder distribution (dist) seperti diatas.
# <a name="_fyr95plhhxa"></a>Publish Component
Untuk publish component, pastikan lu berada di branch master. Karena pada config lerna hanya memperbolehkan melakukan publish di master.


Setelah itu jalankan perintah ini di terminal dan pastikan berada root repository.

npx lerna publish


Jika berhasil akan memiliki tampilan seperti dibawah ini.




Pada npm:


Pada github:







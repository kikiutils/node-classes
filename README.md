# @kikiutils/classes

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

A utility library providing various classes for advanced operations and manipulations.

- [✨ Release Notes](./CHANGELOG.md)

## Features

- 📁 Path Class: Convenient manipulation and querying of file system paths with immutable methods.
- 🔢 PrecisionNumber Class: Accurate arithmetic operations with configurable decimal places and rounding using `Decimal.js`.

## Requirements

- **Node.js** `>= 22.0.0`

## Installation

Using [pnpm](https://pnpm.io):

```bash
pnpm add @kikiutils/classes
```

You can also use `yarn`, `npm`, or `bun`.

> [!NOTE]
> This package is modular. It does not install all dependencies by default.
>
> If a class depends on a third-party package (e.g. `decimal.js`), you must install it manually.

## Usage
Detailed descriptions and examples can be found in the annotations within each class.

## License

[MIT License](./LICENSE)

<!-- Badges -->
[npm-version-href]: https://npmjs.com/package/@kikiutils/classes
[npm-version-src]: https://img.shields.io/npm/v/@kikiutils/classes/latest.svg?colorA=18181b&colorB=28cf8d&style=flat

[npm-downloads-href]: https://npmjs.com/package/@kikiutils/classes
[npm-downloads-src]: https://img.shields.io/npm/dm/@kikiutils/classes.svg?colorA=18181b&colorB=28cf8d&style=flat

[codecov-href]: https://codecov.io/gh/kikiutils/node-classes
[codecov-src]: https://codecov.io/gh/kikiutils/node-classes/graph/badge.svg?token=

[license-href]: https://github.com/kikiutils/node-classes/blob/main/LICENSE
[license-src]: https://img.shields.io/github/license/kikiutils/node-classes?colorA=18181b&colorB=28cf8d&style=flat

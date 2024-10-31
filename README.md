# @kikiutils/classes

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

A utility library providing various classes for advanced operations and manipulations.

- [✨ Release Notes](./CHANGELOG.md)

## Features

- 📁 Path Class: Convenient manipulation and querying of file system paths with immutable methods.
- 🔢 PrecisionNumber Class: Accurate arithmetic operations with configurable decimal places and rounding using `Decimal.js`.

## Environment Requirements

- Node.js version 18 or higher

## Installation

Add dependency (example using pnpm).

```bash
pnpm add @kikiutils/classes
```

You can also use yarn, npm, or bun to add the dependency.

That's it! You're ready to use this package in your project. Check out the [instructions for classes](#classes) below ✨.

> [!NOTE]
> When installing this package, not all required dependencies will be installed. If a function uses specific functionalities, you will need to install the corresponding dependencies manually.
>
> For example, if there is a file that uses `precision-number.ts`, you will need to manually install `decimal.js`.

## Classes

Detailed descriptions and examples can be found in the annotations within each class.

- [Path](./src/path.ts)
  - Provides a comprehensive wrapper around Node.js `path` and `fs` modules, and `fs-extra` library.
  - Immutable methods that return new instances with modified values.
  - Integration with `@kikiutils/fs-extra` for enhanced file system operations.

- [PrecisionNumber](./src/precision-number.ts)
  - Ensures accurate arithmetic operations with floating point numbers using the `Decimal.js` library.
  - Supports addition, subtraction, multiplication, and division with high precision.
  - Includes methods for comparing numbers and checking states (e.g., finite, integer, zero).
  - In-place modification methods and immutable methods for flexible value manipulation.

## License

[MIT License](./LICENSE)

<!-- Badges -->
[npm-version-href]: https://npmjs.com/package/@kikiutils/classes
[npm-version-src]: https://img.shields.io/npm/v/@kikiutils/classes/latest.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-downloads-href]: https://npmjs.com/package/@kikiutils/classes
[npm-downloads-src]: https://img.shields.io/npm/dm/@kikiutils/classes.svg?style=flat&colorA=18181B&colorB=28CF8D

[license-href]: https://github.com/kiki-kanri/kikiutils-node-classes/blob/main/LICENSE
[license-src]: https://img.shields.io/npm/l/@kikiutils/classes.svg?style=flat&colorA=18181B&colorB=28CF8D

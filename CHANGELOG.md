# Changelog

## v2.0.0-alpha.2

[compare changes](https://github.com/kiki-kanri/kikiutils-node-classes/compare/v2.0.0-alpha.1...v2.0.0-alpha.2)

### 💅 Refactors

- Change fs import to node:fs ([def9e2a](https://github.com/kiki-kanri/kikiutils-node-classes/commit/def9e2a))
- Rename `fractionDigits` to `decimalPlaces` in `PrecisionNumber` ([045d96a](https://github.com/kiki-kanri/kikiutils-node-classes/commit/045d96a))
- Switch package to ESM and set 'type' to 'module' in package.json ([88c5668](https://github.com/kiki-kanri/kikiutils-node-classes/commit/88c5668))

### 🏡 Chore

- Rename script file ([5257cc5](https://github.com/kiki-kanri/kikiutils-node-classes/commit/5257cc5))
- Rename dirs and files ([5ff3ffc](https://github.com/kiki-kanri/kikiutils-node-classes/commit/5ff3ffc))
- Upgrade dependencies ([9c724fb](https://github.com/kiki-kanri/kikiutils-node-classes/commit/9c724fb))

### 🎨 Styles

- Format codes ([38eb89e](https://github.com/kiki-kanri/kikiutils-node-classes/commit/38eb89e))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-alpha.1

[compare changes](https://github.com/kiki-kanri/kikiutils-node-classes/compare/v2.0.0-alpha.0...v2.0.0-alpha.1)

### 🚀 Enhancements

- Add dividedBy and toDividedBy methods to PrecisionNumber class ([0cb6d55](https://github.com/kiki-kanri/kikiutils-node-classes/commit/0cb6d55))

### ❤️ Contributors

- kiki-kanri

## v2.0.0-alpha.0

[compare changes](https://github.com/kiki-kanri/kikiutils-node-classes/compare/v1.3.0...v2.0.0-alpha.0)

### Migrate to new version

The new version does not have a unified export entry point.

If you want to use the corresponding class, you need to enter the class path.

```typescript
// The old way of writing
import { Path } from '@kikiutils/classes';

// New writing method
import { Path } from '@kikiutils/classes/path';
import Path from '@kikiutils/classes/path';
```

Limit NodeJS version to 18 or above.

### 🚀 Enhancements

- Add PrecisionNumber class ([0f34b05](https://github.com/kiki-kanri/kikiutils-node-classes/commit/0f34b05))
- Add exports settings to package.json and update tsconfig.json ([1e184c1](https://github.com/kiki-kanri/kikiutils-node-classes/commit/1e184c1))
- Add bumplog dependency and related commands ([ab16b28](https://github.com/kiki-kanri/kikiutils-node-classes/commit/ab16b28))

### 🩹 Fixes

- Correct exports field in package.json to include path files ([38eda48](https://github.com/kiki-kanri/kikiutils-node-classes/commit/38eda48))

### 💅 Refactors

- Reorganize file and folder structure of path class ([f03c409](https://github.com/kiki-kanri/kikiutils-node-classes/commit/f03c409))
- ⚠️ Modify project build process ([eacc280](https://github.com/kiki-kanri/kikiutils-node-classes/commit/eacc280))
- ⚠️ Restructure files and folders ([cfe80a5](https://github.com/kiki-kanri/kikiutils-node-classes/commit/cfe80a5))

### 📖 Documentation

- Update README ([4d91604](https://github.com/kiki-kanri/kikiutils-node-classes/commit/4d91604))

### 🏡 Chore

- Upgrade dependencies ([bf5bdfd](https://github.com/kiki-kanri/kikiutils-node-classes/commit/bf5bdfd))
- ⚠️ Raise minimum Node.js version requirement to 18 ([1f12694](https://github.com/kiki-kanri/kikiutils-node-classes/commit/1f12694))
- Update or remove fields in package.json ([cdc75cb](https://github.com/kiki-kanri/kikiutils-node-classes/commit/cdc75cb))

#### ⚠️ Breaking Changes

- ⚠️ Modify project build process ([eacc280](https://github.com/kiki-kanri/kikiutils-node-classes/commit/eacc280))
- ⚠️ Restructure files and folders ([cfe80a5](https://github.com/kiki-kanri/kikiutils-node-classes/commit/cfe80a5))
- ⚠️ Raise minimum Node.js version requirement to 18 ([1f12694](https://github.com/kiki-kanri/kikiutils-node-classes/commit/1f12694))

### ❤️ Contributors

- kiki-kanri

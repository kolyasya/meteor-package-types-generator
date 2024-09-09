# meteor-package-types-generator

Generates types for all exposed Meteor package files

```js
// Usage example

import { meteorPackageTypesGenerator } from 'meteor-package-types-generator';

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await meteorPackageTypesGenerator.run({
  tsInput: ['./client/index.ts', './server/index.ts', './common/index.ts'],
  declarationInput: path.join(__dirname, 'generated-types', 'index.d.ts'),
  declarationOutput: path.join(
    __dirname,
    'generated-types',
    'index-prefixed.d.ts'
  ),
  prefix: 'meteor/my-package-name/',
});

```

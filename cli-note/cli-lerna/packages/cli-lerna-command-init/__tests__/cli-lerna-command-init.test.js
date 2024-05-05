'use strict';

const cliLernaCommandInit = require('..');
const assert = require('assert').strict;

assert.strictEqual(cliLernaCommandInit(), 'Hello from cliLernaCommandInit');
console.info("cliLernaCommandInit tests passed");

'use strict';

const packageB = require('..');
const assert = require('assert').strict;

assert.strictEqual(packageB(), 'Hello from packageB');
console.info("packageB tests passed");

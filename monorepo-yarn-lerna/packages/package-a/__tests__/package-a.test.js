'use strict';

const packageA = require('..');
const assert = require('assert').strict;

assert.strictEqual(packageA(), 'Hello from packageA');
console.info("packageA tests passed");

'use strict';

const cliLernaCommand = require('..');
const assert = require('assert').strict;

assert.strictEqual(cliLernaCommand(), 'Hello from cliLernaCommand');
console.info("cliLernaCommand tests passed");

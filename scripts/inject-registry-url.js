#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const url = process.argv[2];
if (!url) {
  console.error('Usage: node scripts/inject-registry-url.js <url>');
  process.exit(1);
}

const registryFile = path.join(__dirname, '..', 'packages', 'cli', 'dist', 'utils', 'registry.js');
if (!fs.existsSync(registryFile)) {
  console.error(`File not found: ${registryFile}`);
  console.error('Run tsc first.');
  process.exit(1);
}

const content = fs.readFileSync(registryFile, 'utf8');
const updated = content.replace(/['"]__REGISTRY_URL__['"]/g, `'${url}'`);

if (updated === content) {
  console.warn('Warning: placeholder __REGISTRY_URL__ not found in compiled output.');
} else {
  fs.writeFileSync(registryFile, updated);
  console.log(`Registry URL injected: ${url}`);
}

#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');

const url = process.argv[2];
if (!url) {
  console.error('Usage: node scripts/inject-registry-url.js <url>');
  process.exit(1);
}

// --- 1. Inject __REGISTRY_URL__ into dist/utils/registry.js ---
const registryFile = path.join(__dirname, '..', 'packages', 'cli', 'dist', 'utils', 'registry.js');
if (!fs.existsSync(registryFile)) {
  console.error(`File not found: ${registryFile}`);
  console.error('Run tsc first.');
  process.exit(1);
}

const registryContent = fs.readFileSync(registryFile, 'utf8');
const updatedRegistry = registryContent.replace(/['"]__REGISTRY_URL__['"]/g, `'${url}'`);

if (updatedRegistry === registryContent) {
  console.warn('Warning: placeholder __REGISTRY_URL__ not found in compiled output.');
} else {
  fs.writeFileSync(registryFile, updatedRegistry);
  console.log(`Registry URL injected: ${url}`);
}

// --- 2. Inject __PACKAGE_VERSION__ into dist/index.js ---
const pkgJsonPath = path.join(__dirname, '..', 'packages', 'cli', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
const version = pkg.version;

const indexFile = path.join(__dirname, '..', 'packages', 'cli', 'dist', 'index.js');
if (!fs.existsSync(indexFile)) {
  console.error(`File not found: ${indexFile}`);
  console.error('Run tsc first.');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexFile, 'utf8');
const updatedIndex = indexContent.replace(/['"]__PACKAGE_VERSION__['"]/g, `'${version}'`);

if (updatedIndex === indexContent) {
  console.warn('Warning: placeholder __PACKAGE_VERSION__ not found in dist/index.js.');
} else {
  fs.writeFileSync(indexFile, updatedIndex);
  console.log(`Package version injected: ${version}`);
}

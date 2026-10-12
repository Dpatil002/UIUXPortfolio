/**
 * Build Script: Compiles Case Study Data into Static HTML
 * Usage: node scripts/build-case-study.js tythas-control-center
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderCaseStudy } from '../components/CaseStudyLayout.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const slug = process.argv[2] || 'tythas-control-center';
const dataFilePath = path.join(rootDir, 'data', 'projects', `${slug}.js`);
const outputFilePath = path.join(rootDir, `${slug}.html`);

async function build() {
  if (!fs.existsSync(dataFilePath)) {
    console.error(`Error: Data file not found at ${dataFilePath}`);
    process.exit(1);
  }

  const moduleUrl = `file://${dataFilePath}`;
  const { project } = await import(moduleUrl);

  const html = renderCaseStudy(project);
  fs.writeFileSync(outputFilePath, html, 'utf8');

  console.log(`✓ Compiled case study for "${slug}" -> ${slug}.html (${html.length} bytes)`);
}

build().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});

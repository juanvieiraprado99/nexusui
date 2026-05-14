import * as fs from 'fs';
import * as path from 'path';

export function patchPostcss(cwd: string): void {
  const postcssPath = path.join(cwd, 'postcss.config.js');
  const requiredPlugin = `'@tailwindcss/postcss'`;

  if (fs.existsSync(postcssPath)) {
    const existing = fs.readFileSync(postcssPath, 'utf-8');
    if (existing.includes('@tailwindcss/postcss')) return;

    // Inject plugin into existing plugins object
    const patched = existing.replace(
      /(plugins\s*:\s*\{)([\s\S]*?)(\})/,
      (_, open, inner, close) => `${open}${inner}    ${requiredPlugin}: {},\n  ${close}`,
    );

    if (patched !== existing) {
      fs.writeFileSync(postcssPath, patched, 'utf-8');
    } else {
      // Could not find plugins block — append warning comment and bail
      console.warn(
        `[nexus-ui] Could not patch postcss.config.js automatically. Add '@tailwindcss/postcss' to its plugins manually.`,
      );
    }
    return;
  }

  const content = `module.exports = {\n  plugins: {\n    '@tailwindcss/postcss': {},\n  },\n};\n`;
  fs.writeFileSync(postcssPath, content, 'utf-8');
}

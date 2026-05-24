import * as fs from 'fs';
import * as path from 'path';
import { buildThemeCss, NEXUS_THEME_MARKER } from './theme-presets';
import type { BaseColor } from './theme-presets';

export function patchStylesCss(stylesPath: string, baseColor: BaseColor): void {
  const theme = buildThemeCss(baseColor);

  if (!fs.existsSync(stylesPath)) {
    fs.mkdirSync(path.dirname(stylesPath), { recursive: true });
    fs.writeFileSync(stylesPath, theme, 'utf-8');
    return;
  }

  const existing = fs.readFileSync(stylesPath, 'utf-8');
  if (existing.includes(NEXUS_THEME_MARKER)) return;

  // Prepend nexus theme, stripping any existing tailwind/layer declarations to avoid duplicates
  const existingCleaned = existing
    .replace(/@import ["']tailwindcss["'];?\n?/g, '')
    .replace(/@layer ng-icon, theme, base, components, utilities;?\n?/g, '')
    .trim();
  const combined = theme + (existingCleaned ? '\n\n' + existingCleaned : '');
  fs.writeFileSync(stylesPath, combined, 'utf-8');
}

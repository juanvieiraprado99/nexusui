export interface HsvColor  { h: number; s: number; v: number; a: number }
export interface RgbColor  { r: number; g: number; b: number; a: number }
export interface HslColor  { h: number; s: number; l: number; a: number }
export interface OklchColor { l: number; c: number; h: number; a: number }
export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'oklch';

export function hsvToRgb({ h, s, v, a }: HsvColor): RgbColor {
  const hh = h / 60;
  const i = Math.floor(hh);
  const f = hh - i;
  const p = v * (1 - s);
  const q = v * (1 - s * f);
  const t = v * (1 - s * (1 - f));
  let r: number, g: number, b: number;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    default: r = v; g = p; b = q; break;
  }
  return { r, g, b, a };
}

export function rgbToHsv({ r, g, b, a }: RgbColor): HsvColor {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const v = max;
  const s = max === 0 ? 0 : d / max;
  let h = 0;
  if (d !== 0) {
    if (max === r)      h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * ((b - r) / d + 2);
    else                h = 60 * ((r - g) / d + 4);
    if (h < 0) h += 360;
  }
  return { h, s, v, a };
}

export function hsvToHsl({ h, s, v, a }: HsvColor): HslColor {
  const l = v * (1 - s / 2);
  const sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
  return { h, s: sl, l, a };
}

export function hslToHsv({ h, s, l, a }: HslColor): HsvColor {
  const v = l + s * Math.min(l, 1 - l);
  const sv = v === 0 ? 0 : 2 * (1 - l / v);
  return { h, s: sv, v, a };
}

function _linearize(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function _delinearize(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

export function rgbToOklch({ r, g, b, a }: RgbColor): OklchColor {
  const rl = _linearize(r), gl = _linearize(g), bl = _linearize(b);
  const l = Math.cbrt(0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl);
  const m = Math.cbrt(0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl);
  const s = Math.cbrt(0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl);
  const L =  0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const A =  1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const B =  0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
  const C = Math.sqrt(A * A + B * B);
  let H = Math.atan2(B, A) * (180 / Math.PI);
  if (H < 0) H += 360;
  return { l: L, c: C, h: H, a };
}

export function oklchToRgb({ l, c, h, a }: OklchColor): RgbColor {
  const A = c * Math.cos(h * (Math.PI / 180));
  const B = c * Math.sin(h * (Math.PI / 180));
  const l_ = l + 0.3963377774 * A + 0.2158037573 * B;
  const m_ = l - 0.1055613458 * A - 0.0638541728 * B;
  const s_ = l - 0.0894841775 * A - 1.2914855480 * B;
  const lc = l_ * l_ * l_, mc = m_ * m_ * m_, sc = s_ * s_ * s_;
  const rl =  4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc;
  const gl = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc;
  const bl = -0.0041960863 * lc - 0.7034186147 * mc + 1.7076147010 * sc;
  const clamp = (x: number) => Math.max(0, Math.min(1, x));
  return { r: clamp(_delinearize(rl)), g: clamp(_delinearize(gl)), b: clamp(_delinearize(bl)), a };
}

function _toHex2(n: number): string {
  return Math.round(n * 255).toString(16).padStart(2, '0');
}

export function hsvToHex(hsv: HsvColor, includeAlpha = false): string {
  const { r, g, b, a } = hsvToRgb(hsv);
  const hex = `#${_toHex2(r)}${_toHex2(g)}${_toHex2(b)}`;
  return includeAlpha && a < 1 ? hex + _toHex2(a) : hex;
}

export function hexToHsv(hex: string): HsvColor {
  let h = hex.replace('#', '');
  if (h.length === 3 || h.length === 4) h = h.split('').map(c => c + c).join('');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
  return rgbToHsv({ r, g, b, a });
}

export function hsvToString(hsv: HsvColor, format: ColorFormat, includeAlpha = false): string {
  const useAlpha = includeAlpha && hsv.a < 1;
  if (format === 'hex') return hsvToHex(hsv, includeAlpha);
  if (format === 'rgb') {
    const { r, g, b, a } = hsvToRgb(hsv);
    const ri = Math.round(r * 255), gi = Math.round(g * 255), bi = Math.round(b * 255);
    return useAlpha
      ? `rgba(${ri}, ${gi}, ${bi}, ${a.toFixed(2)})`
      : `rgb(${ri}, ${gi}, ${bi})`;
  }
  if (format === 'oklch') {
    const rgb = hsvToRgb(hsv);
    const { l: ol, c: oc, h: oh } = rgbToOklch(rgb);
    return useAlpha
      ? `oklch(${ol.toFixed(3)} ${oc.toFixed(3)} ${oh.toFixed(2)} / ${hsv.a.toFixed(2)})`
      : `oklch(${ol.toFixed(3)} ${oc.toFixed(3)} ${oh.toFixed(2)})`;
  }
  const { h, s, l, a } = hsvToHsl(hsv);
  const hs = Math.round(h), ss = Math.round(s * 100), ls = Math.round(l * 100);
  return useAlpha
    ? `hsla(${hs}, ${ss}%, ${ls}%, ${a.toFixed(2)})`
    : `hsl(${hs}, ${ss}%, ${ls}%)`;
}

export function stringToHsv(value: string): HsvColor | null {
  if (!value) return null;
  const v = value.trim();
  if (v.startsWith('#')) {
    try { return hexToHsv(v); } catch { return null; }
  }
  const rgbMatch = v.match(/rgba?\(\s*([\d.]+)[,\s]\s*([\d.]+)[,\s]\s*([\d.]+)(?:[,/]\s*([\d.]+))?\s*\)/);
  if (rgbMatch) {
    return rgbToHsv({
      r: parseFloat(rgbMatch[1]) / 255,
      g: parseFloat(rgbMatch[2]) / 255,
      b: parseFloat(rgbMatch[3]) / 255,
      a: rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1,
    });
  }
  const hslMatch = v.match(/hsla?\(\s*([\d.]+)[,\s]\s*([\d.]+)%?[,\s]\s*([\d.]+)%?(?:[,/]\s*([\d.]+))?\s*\)/);
  if (hslMatch) {
    return hslToHsv({
      h: parseFloat(hslMatch[1]),
      s: parseFloat(hslMatch[2]) / 100,
      l: parseFloat(hslMatch[3]) / 100,
      a: hslMatch[4] !== undefined ? parseFloat(hslMatch[4]) : 1,
    });
  }
  const oklchMatch = v.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/);
  if (oklchMatch) {
    return rgbToHsv(oklchToRgb({
      l: parseFloat(oklchMatch[1]),
      c: parseFloat(oklchMatch[2]),
      h: parseFloat(oklchMatch[3]),
      a: oklchMatch[4] !== undefined ? parseFloat(oklchMatch[4]) : 1,
    }));
  }
  return null;
}

export function isValidHex(s: string): boolean {
  return /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(s);
}

export function hueGradientCss(): string {
  return 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)';
}

export function alphaGradientCss(hsv: HsvColor): string {
  return `linear-gradient(to right, transparent, ${hsvToHex({ ...hsv, a: 1 })})`;
}

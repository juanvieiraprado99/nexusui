export const BASE_COLORS = ['slate', 'zinc', 'neutral', 'stone', 'gray', 'blue'] as const;
export type BaseColor = (typeof BASE_COLORS)[number];

export const PRIMARY_COLORS = [
  'blue', 'indigo', 'violet', 'purple', 'green', 'emerald',
  'teal', 'sky', 'cyan', 'red', 'rose', 'orange', 'amber', 'pink',
] as const;
export type PrimaryColor = (typeof PRIMARY_COLORS)[number];

export const NEXUS_THEME_MARKER = '/* nexus-ui theme */';

const CHART_LIGHT = {
  '--chart-1': 'oklch(0.55 0.18 250)',
  '--chart-2': 'oklch(0.60 0.14 150)',
  '--chart-3': 'oklch(0.60 0.16 290)',
  '--chart-4': 'oklch(0.65 0.18 30)',
  '--chart-5': 'oklch(0.65 0.1 180)',
};

const CHART_DARK = {
  '--chart-1': 'oklch(0.65 0.16 250)',
  '--chart-2': 'oklch(0.70 0.12 150)',
  '--chart-3': 'oklch(0.65 0.14 290)',
  '--chart-4': 'oklch(0.70 0.16 30)',
  '--chart-5': 'oklch(0.70 0.09 180)',
};

const FONT_VARS = {
  '--font-sans': 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  '--font-serif': 'ui-serif, Georgia, Cambria, "Times New Roman", serif',
  '--font-mono': 'ui-monospace, "JetBrains Mono", "SF Mono", Menlo, Consolas, monospace',
};

const SHADOW_LIGHT = {
  '--shadow-2xs': '0px 1px 0px 0px hsl(0 0% 0% / 0.07)',
  '--shadow-xs':  '0px 1px 2px 0px hsl(0 0% 0% / 0.07)',
  '--shadow-sm':  '0px 2px 4px 0px hsl(0 0% 0% / 0.07)',
  '--shadow':     '0px 4px 8px -2px hsl(0 0% 0% / 0.07)',
  '--shadow-md':  '0px 4px 8px -2px hsl(0 0% 0% / 0.07)',
  '--shadow-lg':  '0px 8px 16px -4px hsl(0 0% 0% / 0.07)',
  '--shadow-xl':  '0px 16px 24px -6px hsl(0 0% 0% / 0.07)',
  '--shadow-2xl': '0px 24px 40px -8px hsl(0 0% 0% / 0.14)',
};

const SHADOW_DARK = {
  '--shadow-2xs': '0px 1px 0px 0px hsl(0 0% 0% / 0.25)',
  '--shadow-xs':  '0px 1px 2px 0px hsl(0 0% 0% / 0.25)',
  '--shadow-sm':  '0px 2px 4px 0px hsl(0 0% 0% / 0.25)',
  '--shadow':     '0px 4px 8px -2px hsl(0 0% 0% / 0.25)',
  '--shadow-md':  '0px 4px 8px -2px hsl(0 0% 0% / 0.25)',
  '--shadow-lg':  '0px 8px 16px -4px hsl(0 0% 0% / 0.25)',
  '--shadow-xl':  '0px 16px 24px -6px hsl(0 0% 0% / 0.25)',
  '--shadow-2xl': '0px 24px 40px -8px hsl(0 0% 0% / 0.50)',
};

export function buildThemeCss(baseColor: BaseColor, primaryColor?: PrimaryColor): string {
  const resolvedPrimary = primaryColor ?? 'blue';

  const themes: Record<BaseColor, { light: Record<string, string>; dark: Record<string, string> }> = {
    slate: {
      light: {
        '--radius': '0.625rem',
        '--background': 'oklch(1 0 0)',
        '--foreground': 'oklch(0.145 0 0)',
        '--card': 'oklch(1 0 0)',
        '--card-foreground': 'oklch(0.145 0 0)',
        '--popover': 'oklch(1 0 0)',
        '--popover-foreground': 'oklch(0.145 0 0)',
        '--primary': 'oklch(0.205 0 0)',
        '--primary-foreground': 'oklch(0.985 0 0)',
        '--secondary': 'oklch(0.97 0 0)',
        '--secondary-foreground': 'oklch(0.205 0 0)',
        '--muted': 'oklch(0.97 0 0)',
        '--muted-foreground': 'oklch(0.556 0 0)',
        '--accent': 'oklch(0.97 0 0)',
        '--accent-foreground': 'oklch(0.205 0 0)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.922 0 0)',
        '--input': 'oklch(0.922 0 0)',
        '--ring': 'oklch(0.708 0 0)',
        '--sidebar': 'oklch(0.985 0.003 250)',
        '--sidebar-foreground': 'oklch(0.145 0 0)',
        '--sidebar-primary': 'oklch(0.205 0 0)',
        '--sidebar-primary-foreground': 'oklch(0.985 0 0)',
        '--sidebar-accent': 'oklch(0.97 0 0)',
        '--sidebar-accent-foreground': 'oklch(0.205 0 0)',
        '--sidebar-border': 'oklch(0.922 0 0)',
        '--sidebar-ring': 'oklch(0.708 0 0)',
        ...FONT_VARS,
        ...SHADOW_LIGHT,
        ...CHART_LIGHT,
      },
      dark: {
        '--background': 'oklch(0.145 0 0)',
        '--foreground': 'oklch(0.985 0 0)',
        '--card': 'oklch(0.205 0 0)',
        '--card-foreground': 'oklch(0.985 0 0)',
        '--popover': 'oklch(0.205 0 0)',
        '--popover-foreground': 'oklch(0.985 0 0)',
        '--primary': 'oklch(0.985 0 0)',
        '--primary-foreground': 'oklch(0.205 0 0)',
        '--secondary': 'oklch(0.269 0 0)',
        '--secondary-foreground': 'oklch(0.985 0 0)',
        '--muted': 'oklch(0.269 0 0)',
        '--muted-foreground': 'oklch(0.708 0 0)',
        '--accent': 'oklch(0.269 0 0)',
        '--accent-foreground': 'oklch(0.985 0 0)',
        '--destructive': 'oklch(0.704 0.191 22.216)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.269 0 0)',
        '--input': 'oklch(0.269 0 0)',
        '--ring': 'oklch(0.439 0 0)',
        '--sidebar': 'oklch(0.205 0 0)',
        '--sidebar-foreground': 'oklch(0.985 0 0)',
        '--sidebar-primary': 'oklch(0.985 0 0)',
        '--sidebar-primary-foreground': 'oklch(0.205 0 0)',
        '--sidebar-accent': 'oklch(0.269 0 0)',
        '--sidebar-accent-foreground': 'oklch(0.985 0 0)',
        '--sidebar-border': 'oklch(0.269 0 0)',
        '--sidebar-ring': 'oklch(0.439 0 0)',
        ...FONT_VARS,
        ...SHADOW_DARK,
        ...CHART_DARK,
      },
    },
    zinc: {
      light: {
        '--radius': '0.5rem',
        '--background': 'oklch(1 0 0)',
        '--foreground': 'oklch(0.141 0.005 285.823)',
        '--card': 'oklch(1 0 0)',
        '--card-foreground': 'oklch(0.141 0.005 285.823)',
        '--popover': 'oklch(1 0 0)',
        '--popover-foreground': 'oklch(0.141 0.005 285.823)',
        '--primary': 'oklch(0.21 0.006 285.885)',
        '--primary-foreground': 'oklch(0.985 0 0)',
        '--secondary': 'oklch(0.967 0.001 286.375)',
        '--secondary-foreground': 'oklch(0.21 0.006 285.885)',
        '--muted': 'oklch(0.967 0.001 286.375)',
        '--muted-foreground': 'oklch(0.552 0.016 285.938)',
        '--accent': 'oklch(0.967 0.001 286.375)',
        '--accent-foreground': 'oklch(0.21 0.006 285.885)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.92 0.004 286.32)',
        '--input': 'oklch(0.92 0.004 286.32)',
        '--ring': 'oklch(0.705 0.015 286.067)',
        '--sidebar': 'oklch(0.975 0.002 285)',
        '--sidebar-foreground': 'oklch(0.141 0.005 285.823)',
        '--sidebar-primary': 'oklch(0.21 0.006 285.885)',
        '--sidebar-primary-foreground': 'oklch(0.985 0 0)',
        '--sidebar-accent': 'oklch(0.967 0.001 286.375)',
        '--sidebar-accent-foreground': 'oklch(0.21 0.006 285.885)',
        '--sidebar-border': 'oklch(0.92 0.004 286.32)',
        '--sidebar-ring': 'oklch(0.705 0.015 286.067)',
        ...FONT_VARS,
        ...SHADOW_LIGHT,
        ...CHART_LIGHT,
      },
      dark: {
        '--background': 'oklch(0.141 0.005 285.823)',
        '--foreground': 'oklch(0.985 0 0)',
        '--card': 'oklch(0.21 0.006 285.885)',
        '--card-foreground': 'oklch(0.985 0 0)',
        '--popover': 'oklch(0.21 0.006 285.885)',
        '--popover-foreground': 'oklch(0.985 0 0)',
        '--primary': 'oklch(0.985 0 0)',
        '--primary-foreground': 'oklch(0.21 0.006 285.885)',
        '--secondary': 'oklch(0.274 0.006 286.033)',
        '--secondary-foreground': 'oklch(0.985 0 0)',
        '--muted': 'oklch(0.274 0.006 286.033)',
        '--muted-foreground': 'oklch(0.705 0.015 286.067)',
        '--accent': 'oklch(0.274 0.006 286.033)',
        '--accent-foreground': 'oklch(0.985 0 0)',
        '--destructive': 'oklch(0.704 0.191 22.216)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.274 0.006 286.033)',
        '--input': 'oklch(0.274 0.006 286.033)',
        '--ring': 'oklch(0.552 0.016 285.938)',
        '--sidebar': 'oklch(0.21 0.006 285.885)',
        '--sidebar-foreground': 'oklch(0.985 0 0)',
        '--sidebar-primary': 'oklch(0.985 0 0)',
        '--sidebar-primary-foreground': 'oklch(0.21 0.006 285.885)',
        '--sidebar-accent': 'oklch(0.274 0.006 286.033)',
        '--sidebar-accent-foreground': 'oklch(0.985 0 0)',
        '--sidebar-border': 'oklch(0.274 0.006 286.033)',
        '--sidebar-ring': 'oklch(0.552 0.016 285.938)',
        ...FONT_VARS,
        ...SHADOW_DARK,
        ...CHART_DARK,
      },
    },
    neutral: {
      light: {
        '--radius': '0.5rem',
        '--background': 'oklch(1 0 0)',
        '--foreground': 'oklch(0.145 0 0)',
        '--card': 'oklch(1 0 0)',
        '--card-foreground': 'oklch(0.145 0 0)',
        '--popover': 'oklch(1 0 0)',
        '--popover-foreground': 'oklch(0.145 0 0)',
        '--primary': 'oklch(0.205 0 0)',
        '--primary-foreground': 'oklch(0.985 0 0)',
        '--secondary': 'oklch(0.97 0 0)',
        '--secondary-foreground': 'oklch(0.205 0 0)',
        '--muted': 'oklch(0.97 0 0)',
        '--muted-foreground': 'oklch(0.556 0 0)',
        '--accent': 'oklch(0.97 0 0)',
        '--accent-foreground': 'oklch(0.205 0 0)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.922 0 0)',
        '--input': 'oklch(0.922 0 0)',
        '--ring': 'oklch(0.708 0 0)',
        '--sidebar': 'oklch(0.98 0 0)',
        '--sidebar-foreground': 'oklch(0.145 0 0)',
        '--sidebar-primary': 'oklch(0.205 0 0)',
        '--sidebar-primary-foreground': 'oklch(0.985 0 0)',
        '--sidebar-accent': 'oklch(0.97 0 0)',
        '--sidebar-accent-foreground': 'oklch(0.205 0 0)',
        '--sidebar-border': 'oklch(0.922 0 0)',
        '--sidebar-ring': 'oklch(0.708 0 0)',
        ...FONT_VARS,
        ...SHADOW_LIGHT,
        ...CHART_LIGHT,
      },
      dark: {
        '--background': 'oklch(0.145 0 0)',
        '--foreground': 'oklch(0.985 0 0)',
        '--card': 'oklch(0.205 0 0)',
        '--card-foreground': 'oklch(0.985 0 0)',
        '--popover': 'oklch(0.205 0 0)',
        '--popover-foreground': 'oklch(0.985 0 0)',
        '--primary': 'oklch(0.985 0 0)',
        '--primary-foreground': 'oklch(0.205 0 0)',
        '--secondary': 'oklch(0.269 0 0)',
        '--secondary-foreground': 'oklch(0.985 0 0)',
        '--muted': 'oklch(0.269 0 0)',
        '--muted-foreground': 'oklch(0.708 0 0)',
        '--accent': 'oklch(0.269 0 0)',
        '--accent-foreground': 'oklch(0.985 0 0)',
        '--destructive': 'oklch(0.704 0.191 22.216)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.269 0 0)',
        '--input': 'oklch(0.269 0 0)',
        '--ring': 'oklch(0.439 0 0)',
        '--sidebar': 'oklch(0.205 0 0)',
        '--sidebar-foreground': 'oklch(0.985 0 0)',
        '--sidebar-primary': 'oklch(0.985 0 0)',
        '--sidebar-primary-foreground': 'oklch(0.205 0 0)',
        '--sidebar-accent': 'oklch(0.269 0 0)',
        '--sidebar-accent-foreground': 'oklch(0.985 0 0)',
        '--sidebar-border': 'oklch(0.269 0 0)',
        '--sidebar-ring': 'oklch(0.439 0 0)',
        ...FONT_VARS,
        ...SHADOW_DARK,
        ...CHART_DARK,
      },
    },
    stone: {
      light: {
        '--radius': '0.5rem',
        '--background': 'oklch(1 0 0)',
        '--foreground': 'oklch(0.147 0.004 49.25)',
        '--card': 'oklch(1 0 0)',
        '--card-foreground': 'oklch(0.147 0.004 49.25)',
        '--popover': 'oklch(1 0 0)',
        '--popover-foreground': 'oklch(0.147 0.004 49.25)',
        '--primary': 'oklch(0.216 0.006 56.043)',
        '--primary-foreground': 'oklch(0.985 0.001 106.423)',
        '--secondary': 'oklch(0.97 0.001 106.424)',
        '--secondary-foreground': 'oklch(0.216 0.006 56.043)',
        '--muted': 'oklch(0.97 0.001 106.424)',
        '--muted-foreground': 'oklch(0.553 0.013 58.071)',
        '--accent': 'oklch(0.97 0.001 106.424)',
        '--accent-foreground': 'oklch(0.216 0.006 56.043)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.923 0.003 48.717)',
        '--input': 'oklch(0.923 0.003 48.717)',
        '--ring': 'oklch(0.709 0.01 56.259)',
        '--sidebar': 'oklch(0.98 0.001 49)',
        '--sidebar-foreground': 'oklch(0.147 0.004 49.25)',
        '--sidebar-primary': 'oklch(0.216 0.006 56.043)',
        '--sidebar-primary-foreground': 'oklch(0.985 0.001 106.423)',
        '--sidebar-accent': 'oklch(0.97 0.001 106.424)',
        '--sidebar-accent-foreground': 'oklch(0.216 0.006 56.043)',
        '--sidebar-border': 'oklch(0.923 0.003 48.717)',
        '--sidebar-ring': 'oklch(0.709 0.01 56.259)',
        ...FONT_VARS,
        ...SHADOW_LIGHT,
        ...CHART_LIGHT,
      },
      dark: {
        '--background': 'oklch(0.147 0.004 49.25)',
        '--foreground': 'oklch(0.985 0.001 106.423)',
        '--card': 'oklch(0.216 0.006 56.043)',
        '--card-foreground': 'oklch(0.985 0.001 106.423)',
        '--popover': 'oklch(0.216 0.006 56.043)',
        '--popover-foreground': 'oklch(0.985 0.001 106.423)',
        '--primary': 'oklch(0.923 0.003 48.717)',
        '--primary-foreground': 'oklch(0.216 0.006 56.043)',
        '--secondary': 'oklch(0.268 0.007 34.298)',
        '--secondary-foreground': 'oklch(0.985 0.001 106.423)',
        '--muted': 'oklch(0.268 0.007 34.298)',
        '--muted-foreground': 'oklch(0.709 0.01 56.259)',
        '--accent': 'oklch(0.268 0.007 34.298)',
        '--accent-foreground': 'oklch(0.985 0.001 106.423)',
        '--destructive': 'oklch(0.704 0.191 22.216)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.268 0.007 34.298)',
        '--input': 'oklch(0.268 0.007 34.298)',
        '--ring': 'oklch(0.553 0.013 58.071)',
        '--sidebar': 'oklch(0.216 0.006 56.043)',
        '--sidebar-foreground': 'oklch(0.985 0.001 106.423)',
        '--sidebar-primary': 'oklch(0.923 0.003 48.717)',
        '--sidebar-primary-foreground': 'oklch(0.216 0.006 56.043)',
        '--sidebar-accent': 'oklch(0.268 0.007 34.298)',
        '--sidebar-accent-foreground': 'oklch(0.985 0.001 106.423)',
        '--sidebar-border': 'oklch(0.268 0.007 34.298)',
        '--sidebar-ring': 'oklch(0.553 0.013 58.071)',
        ...FONT_VARS,
        ...SHADOW_DARK,
        ...CHART_DARK,
      },
    },
    gray: {
      light: {
        '--radius': '0.5rem',
        '--background': 'oklch(1 0 0)',
        '--foreground': 'oklch(0.13 0.028 261.692)',
        '--card': 'oklch(1 0 0)',
        '--card-foreground': 'oklch(0.13 0.028 261.692)',
        '--popover': 'oklch(1 0 0)',
        '--popover-foreground': 'oklch(0.13 0.028 261.692)',
        '--primary': 'oklch(0.21 0.034 264.665)',
        '--primary-foreground': 'oklch(0.985 0.002 247.839)',
        '--secondary': 'oklch(0.967 0.003 264.542)',
        '--secondary-foreground': 'oklch(0.21 0.034 264.665)',
        '--muted': 'oklch(0.967 0.003 264.542)',
        '--muted-foreground': 'oklch(0.551 0.027 264.364)',
        '--accent': 'oklch(0.967 0.003 264.542)',
        '--accent-foreground': 'oklch(0.21 0.034 264.665)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.928 0.006 264.531)',
        '--input': 'oklch(0.928 0.006 264.531)',
        '--ring': 'oklch(0.707 0.022 261.325)',
        '--sidebar': 'oklch(0.975 0.003 264)',
        '--sidebar-foreground': 'oklch(0.13 0.028 261.692)',
        '--sidebar-primary': 'oklch(0.21 0.034 264.665)',
        '--sidebar-primary-foreground': 'oklch(0.985 0.002 247.839)',
        '--sidebar-accent': 'oklch(0.967 0.003 264.542)',
        '--sidebar-accent-foreground': 'oklch(0.21 0.034 264.665)',
        '--sidebar-border': 'oklch(0.928 0.006 264.531)',
        '--sidebar-ring': 'oklch(0.707 0.022 261.325)',
        ...FONT_VARS,
        ...SHADOW_LIGHT,
        ...CHART_LIGHT,
      },
      dark: {
        '--background': 'oklch(0.13 0.028 261.692)',
        '--foreground': 'oklch(0.985 0.002 247.839)',
        '--card': 'oklch(0.21 0.034 264.665)',
        '--card-foreground': 'oklch(0.985 0.002 247.839)',
        '--popover': 'oklch(0.21 0.034 264.665)',
        '--popover-foreground': 'oklch(0.985 0.002 247.839)',
        '--primary': 'oklch(0.928 0.006 264.531)',
        '--primary-foreground': 'oklch(0.21 0.034 264.665)',
        '--secondary': 'oklch(0.278 0.033 256.848)',
        '--secondary-foreground': 'oklch(0.985 0.002 247.839)',
        '--muted': 'oklch(0.278 0.033 256.848)',
        '--muted-foreground': 'oklch(0.707 0.022 261.325)',
        '--accent': 'oklch(0.278 0.033 256.848)',
        '--accent-foreground': 'oklch(0.985 0.002 247.839)',
        '--destructive': 'oklch(0.704 0.191 22.216)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.278 0.033 256.848)',
        '--input': 'oklch(0.278 0.033 256.848)',
        '--ring': 'oklch(0.551 0.027 264.364)',
        '--sidebar': 'oklch(0.21 0.034 264.665)',
        '--sidebar-foreground': 'oklch(0.985 0.002 247.839)',
        '--sidebar-primary': 'oklch(0.928 0.006 264.531)',
        '--sidebar-primary-foreground': 'oklch(0.21 0.034 264.665)',
        '--sidebar-accent': 'oklch(0.278 0.033 256.848)',
        '--sidebar-accent-foreground': 'oklch(0.985 0.002 247.839)',
        '--sidebar-border': 'oklch(0.278 0.033 256.848)',
        '--sidebar-ring': 'oklch(0.551 0.027 264.364)',
        ...FONT_VARS,
        ...SHADOW_DARK,
        ...CHART_DARK,
      },
    },
    blue: {
      light: {
        '--radius': '0.625rem',
        '--background': 'oklch(0.995 0.005 250)',
        '--foreground': 'oklch(0.2 0.04 250)',
        '--card': 'oklch(1 0 0)',
        '--card-foreground': 'oklch(0.2 0.04 250)',
        '--popover': 'oklch(1 0 0)',
        '--popover-foreground': 'oklch(0.2 0.04 250)',
        '--primary': 'oklch(0.55 0.2 250)',
        '--primary-foreground': 'oklch(0.98 0.01 250)',
        '--secondary': 'oklch(0.95 0.02 250)',
        '--secondary-foreground': 'oklch(0.3 0.04 250)',
        '--muted': 'oklch(0.95 0.015 250)',
        '--muted-foreground': 'oklch(0.5 0.03 250)',
        '--accent': 'oklch(0.92 0.04 250)',
        '--accent-foreground': 'oklch(0.3 0.04 250)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.9 0.02 250)',
        '--input': 'oklch(0.9 0.02 250)',
        '--ring': 'oklch(0.55 0.2 250)',
        '--sidebar': 'oklch(0.98 0.01 250)',
        '--sidebar-foreground': 'oklch(0.2 0.04 250)',
        '--sidebar-primary': 'oklch(0.55 0.2 250)',
        '--sidebar-primary-foreground': 'oklch(0.98 0.01 250)',
        '--sidebar-accent': 'oklch(0.95 0.02 250)',
        '--sidebar-accent-foreground': 'oklch(0.3 0.04 250)',
        '--sidebar-border': 'oklch(0.9 0.02 250)',
        '--sidebar-ring': 'oklch(0.55 0.2 250)',
        ...FONT_VARS,
        ...SHADOW_LIGHT,
        '--chart-1': 'oklch(0.55 0.2 250)',
        '--chart-2': 'oklch(0.6 0.15 220)',
        '--chart-3': 'oklch(0.7 0.12 280)',
        '--chart-4': 'oklch(0.65 0.18 200)',
        '--chart-5': 'oklch(0.75 0.1 260)',
      },
      dark: {
        '--background': 'oklch(0.15 0.025 250)',
        '--foreground': 'oklch(0.95 0.01 250)',
        '--card': 'oklch(0.2 0.03 250)',
        '--card-foreground': 'oklch(0.95 0.01 250)',
        '--popover': 'oklch(0.2 0.03 250)',
        '--popover-foreground': 'oklch(0.95 0.01 250)',
        '--primary': 'oklch(0.65 0.18 250)',
        '--primary-foreground': 'oklch(0.15 0.025 250)',
        '--secondary': 'oklch(0.28 0.035 250)',
        '--secondary-foreground': 'oklch(0.95 0.01 250)',
        '--muted': 'oklch(0.28 0.03 250)',
        '--muted-foreground': 'oklch(0.65 0.04 250)',
        '--accent': 'oklch(0.35 0.05 250)',
        '--accent-foreground': 'oklch(0.95 0.01 250)',
        '--destructive': 'oklch(0.704 0.191 22.216)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.35 0.035 250)',
        '--input': 'oklch(0.35 0.035 250)',
        '--ring': 'oklch(0.65 0.18 250)',
        '--sidebar': 'oklch(0.2 0.03 250)',
        '--sidebar-foreground': 'oklch(0.95 0.01 250)',
        '--sidebar-primary': 'oklch(0.65 0.18 250)',
        '--sidebar-primary-foreground': 'oklch(0.15 0.025 250)',
        '--sidebar-accent': 'oklch(0.28 0.035 250)',
        '--sidebar-accent-foreground': 'oklch(0.95 0.01 250)',
        '--sidebar-border': 'oklch(0.35 0.035 250)',
        '--sidebar-ring': 'oklch(0.65 0.18 250)',
        ...FONT_VARS,
        ...SHADOW_DARK,
        '--chart-1': 'oklch(0.65 0.18 250)',
        '--chart-2': 'oklch(0.6 0.12 220)',
        '--chart-3': 'oklch(0.7 0.1 280)',
        '--chart-4': 'oklch(0.55 0.15 200)',
        '--chart-5': 'oklch(0.75 0.08 260)',
      },
    },
  };

  const { light, dark } = themes[baseColor];

  // Override primary/ring/sidebar-primary/sidebar-ring with Tailwind v4 CSS vars
  light['--primary'] = `var(--color-${resolvedPrimary}-600)`;
  light['--primary-foreground'] = 'oklch(1 0 0)';
  light['--ring'] = `var(--color-${resolvedPrimary}-500)`;
  light['--sidebar-primary'] = `var(--color-${resolvedPrimary}-600)`;
  light['--sidebar-ring'] = `var(--color-${resolvedPrimary}-500)`;
  dark['--primary'] = `var(--color-${resolvedPrimary}-400)`;
  dark['--primary-foreground'] = 'oklch(0.145 0 0)';
  dark['--ring'] = `var(--color-${resolvedPrimary}-400)`;
  dark['--sidebar-primary'] = `var(--color-${resolvedPrimary}-400)`;
  dark['--sidebar-ring'] = `var(--color-${resolvedPrimary}-400)`;

  const toVars = (tokens: Record<string, string>) =>
    Object.entries(tokens)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join('\n');

  return `${NEXUS_THEME_MARKER}
@layer ng-icon, theme, base, components, utilities;
@import "tailwindcss";
@plugin "tailwindcss-animate";

@custom-variant dark (&:is(.dark *));

:root {
${toVars(light)}
}

.dark {
${toVars(dark)}
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --font-sans: var(--font-sans);
  --font-serif: var(--font-serif);
  --font-mono: var(--font-mono);
  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}

@layer base {
  :root {
    /* fallbacks: vars que temas shadcn não definem */
    --destructive-foreground: oklch(0.985 0 0);
    --success: oklch(0.627 0.194 149.214);
    --success-foreground: oklch(0.985 0 0);
  }
  .dark {
    --success: oklch(0.527 0.154 149.214);
  }
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background: var(--muted-foreground);
  border-radius: 5px;
}

::-webkit-scrollbar-track {
  border-radius: 5px;
  background: var(--muted);
}
`;
}

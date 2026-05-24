import {
  Component, ChangeDetectionStrategy, signal, computed, effect, inject, viewChild, ElementRef,
} from '@angular/core';
import { DarkModeService } from 'nexus';
import { DocsLayoutComponent } from '../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block.component';
import { ButtonComponent } from '../../shared/components/button';
import { BadgeComponent } from '../../shared/components/badge';
import {
  CardComponent, CardHeaderComponent, CardTitleComponent,
  CardDescriptionComponent, CardContentComponent, CardFooterComponent,
} from '../../shared/components/card';
import { InputComponent } from '../../shared/components/input';
import { SwitchComponent } from '../../shared/components/switch';
import { SeparatorComponent } from '../../shared/components/separator';

type BaseColor = 'slate' | 'zinc' | 'neutral' | 'stone' | 'gray' | 'blue' | 'green' | 'violet';

interface ThemeEntry {
  label: string;
  light: Record<string, string>;
  dark: Record<string, string>;
}

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

const THEMES: Record<BaseColor, ThemeEntry> = {
  slate: {
    label: 'Slate',
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
      ...FONT_VARS, ...SHADOW_LIGHT, ...CHART_LIGHT,
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
      ...FONT_VARS, ...SHADOW_DARK, ...CHART_DARK,
    },
  },
  zinc: {
    label: 'Zinc',
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
      ...FONT_VARS, ...SHADOW_LIGHT, ...CHART_LIGHT,
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
      ...FONT_VARS, ...SHADOW_DARK, ...CHART_DARK,
    },
  },
  neutral: {
    label: 'Neutral',
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
      ...FONT_VARS, ...SHADOW_LIGHT, ...CHART_LIGHT,
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
      ...FONT_VARS, ...SHADOW_DARK, ...CHART_DARK,
    },
  },
  stone: {
    label: 'Stone',
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
      ...FONT_VARS, ...SHADOW_LIGHT, ...CHART_LIGHT,
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
      ...FONT_VARS, ...SHADOW_DARK, ...CHART_DARK,
    },
  },
  gray: {
    label: 'Gray',
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
      ...FONT_VARS, ...SHADOW_LIGHT, ...CHART_LIGHT,
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
      ...FONT_VARS, ...SHADOW_DARK, ...CHART_DARK,
    },
  },
  blue: {
    label: 'Blue',
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
      ...FONT_VARS, ...SHADOW_LIGHT,
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
      ...FONT_VARS, ...SHADOW_DARK,
      '--chart-1': 'oklch(0.65 0.18 250)',
      '--chart-2': 'oklch(0.6 0.12 220)',
      '--chart-3': 'oklch(0.7 0.1 280)',
      '--chart-4': 'oklch(0.55 0.15 200)',
      '--chart-5': 'oklch(0.75 0.08 260)',
    },
  },
  green: {
    label: 'Green',
    light: {
      '--radius': '0.625rem',
      '--background': 'oklch(0.995 0.005 145)',
      '--foreground': 'oklch(0.18 0.04 145)',
      '--card': 'oklch(1 0 0)',
      '--card-foreground': 'oklch(0.18 0.04 145)',
      '--popover': 'oklch(1 0 0)',
      '--popover-foreground': 'oklch(0.18 0.04 145)',
      '--primary': 'oklch(0.52 0.18 145)',
      '--primary-foreground': 'oklch(0.98 0.01 145)',
      '--secondary': 'oklch(0.95 0.025 145)',
      '--secondary-foreground': 'oklch(0.28 0.04 145)',
      '--muted': 'oklch(0.95 0.015 145)',
      '--muted-foreground': 'oklch(0.5 0.03 145)',
      '--accent': 'oklch(0.92 0.04 145)',
      '--accent-foreground': 'oklch(0.28 0.04 145)',
      '--destructive': 'oklch(0.577 0.245 27.325)',
      '--destructive-foreground': 'oklch(0.985 0 0)',
      '--border': 'oklch(0.9 0.02 145)',
      '--input': 'oklch(0.9 0.02 145)',
      '--ring': 'oklch(0.52 0.18 145)',
      '--sidebar': 'oklch(0.98 0.01 145)',
      '--sidebar-foreground': 'oklch(0.18 0.04 145)',
      '--sidebar-primary': 'oklch(0.52 0.18 145)',
      '--sidebar-primary-foreground': 'oklch(0.98 0.01 145)',
      '--sidebar-accent': 'oklch(0.95 0.025 145)',
      '--sidebar-accent-foreground': 'oklch(0.28 0.04 145)',
      '--sidebar-border': 'oklch(0.9 0.02 145)',
      '--sidebar-ring': 'oklch(0.52 0.18 145)',
      ...FONT_VARS, ...SHADOW_LIGHT,
      '--chart-1': 'oklch(0.52 0.18 145)',
      '--chart-2': 'oklch(0.58 0.14 175)',
      '--chart-3': 'oklch(0.62 0.16 110)',
      '--chart-4': 'oklch(0.60 0.18 200)',
      '--chart-5': 'oklch(0.68 0.1 160)',
    },
    dark: {
      '--background': 'oklch(0.13 0.025 145)',
      '--foreground': 'oklch(0.95 0.01 145)',
      '--card': 'oklch(0.18 0.03 145)',
      '--card-foreground': 'oklch(0.95 0.01 145)',
      '--popover': 'oklch(0.18 0.03 145)',
      '--popover-foreground': 'oklch(0.95 0.01 145)',
      '--primary': 'oklch(0.62 0.18 145)',
      '--primary-foreground': 'oklch(0.13 0.025 145)',
      '--secondary': 'oklch(0.25 0.03 145)',
      '--secondary-foreground': 'oklch(0.95 0.01 145)',
      '--muted': 'oklch(0.25 0.025 145)',
      '--muted-foreground': 'oklch(0.62 0.04 145)',
      '--accent': 'oklch(0.32 0.05 145)',
      '--accent-foreground': 'oklch(0.95 0.01 145)',
      '--destructive': 'oklch(0.704 0.191 22.216)',
      '--destructive-foreground': 'oklch(0.985 0 0)',
      '--border': 'oklch(0.32 0.03 145)',
      '--input': 'oklch(0.32 0.03 145)',
      '--ring': 'oklch(0.62 0.18 145)',
      '--sidebar': 'oklch(0.18 0.03 145)',
      '--sidebar-foreground': 'oklch(0.95 0.01 145)',
      '--sidebar-primary': 'oklch(0.62 0.18 145)',
      '--sidebar-primary-foreground': 'oklch(0.13 0.025 145)',
      '--sidebar-accent': 'oklch(0.25 0.03 145)',
      '--sidebar-accent-foreground': 'oklch(0.95 0.01 145)',
      '--sidebar-border': 'oklch(0.32 0.03 145)',
      '--sidebar-ring': 'oklch(0.62 0.18 145)',
      ...FONT_VARS, ...SHADOW_DARK,
      '--chart-1': 'oklch(0.62 0.18 145)',
      '--chart-2': 'oklch(0.58 0.12 175)',
      '--chart-3': 'oklch(0.68 0.14 110)',
      '--chart-4': 'oklch(0.55 0.15 200)',
      '--chart-5': 'oklch(0.72 0.08 160)',
    },
  },
  violet: {
    label: 'Violet',
    light: {
      '--radius': '0.625rem',
      '--background': 'oklch(0.995 0.005 295)',
      '--foreground': 'oklch(0.18 0.04 295)',
      '--card': 'oklch(1 0 0)',
      '--card-foreground': 'oklch(0.18 0.04 295)',
      '--popover': 'oklch(1 0 0)',
      '--popover-foreground': 'oklch(0.18 0.04 295)',
      '--primary': 'oklch(0.52 0.22 295)',
      '--primary-foreground': 'oklch(0.98 0.01 295)',
      '--secondary': 'oklch(0.95 0.025 295)',
      '--secondary-foreground': 'oklch(0.28 0.04 295)',
      '--muted': 'oklch(0.95 0.015 295)',
      '--muted-foreground': 'oklch(0.5 0.03 295)',
      '--accent': 'oklch(0.92 0.045 295)',
      '--accent-foreground': 'oklch(0.28 0.04 295)',
      '--destructive': 'oklch(0.577 0.245 27.325)',
      '--destructive-foreground': 'oklch(0.985 0 0)',
      '--border': 'oklch(0.9 0.02 295)',
      '--input': 'oklch(0.9 0.02 295)',
      '--ring': 'oklch(0.52 0.22 295)',
      '--sidebar': 'oklch(0.98 0.015 295)',
      '--sidebar-foreground': 'oklch(0.18 0.04 295)',
      '--sidebar-primary': 'oklch(0.52 0.22 295)',
      '--sidebar-primary-foreground': 'oklch(0.98 0.01 295)',
      '--sidebar-accent': 'oklch(0.95 0.025 295)',
      '--sidebar-accent-foreground': 'oklch(0.28 0.04 295)',
      '--sidebar-border': 'oklch(0.9 0.02 295)',
      '--sidebar-ring': 'oklch(0.52 0.22 295)',
      ...FONT_VARS, ...SHADOW_LIGHT,
      '--chart-1': 'oklch(0.52 0.22 295)',
      '--chart-2': 'oklch(0.57 0.18 320)',
      '--chart-3': 'oklch(0.55 0.2 265)',
      '--chart-4': 'oklch(0.65 0.16 340)',
      '--chart-5': 'oklch(0.62 0.14 280)',
    },
    dark: {
      '--background': 'oklch(0.13 0.025 295)',
      '--foreground': 'oklch(0.95 0.01 295)',
      '--card': 'oklch(0.19 0.035 295)',
      '--card-foreground': 'oklch(0.95 0.01 295)',
      '--popover': 'oklch(0.19 0.035 295)',
      '--popover-foreground': 'oklch(0.95 0.01 295)',
      '--primary': 'oklch(0.65 0.2 295)',
      '--primary-foreground': 'oklch(0.13 0.025 295)',
      '--secondary': 'oklch(0.27 0.04 295)',
      '--secondary-foreground': 'oklch(0.95 0.01 295)',
      '--muted': 'oklch(0.27 0.035 295)',
      '--muted-foreground': 'oklch(0.63 0.05 295)',
      '--accent': 'oklch(0.34 0.06 295)',
      '--accent-foreground': 'oklch(0.95 0.01 295)',
      '--destructive': 'oklch(0.704 0.191 22.216)',
      '--destructive-foreground': 'oklch(0.985 0 0)',
      '--border': 'oklch(0.34 0.04 295)',
      '--input': 'oklch(0.34 0.04 295)',
      '--ring': 'oklch(0.65 0.2 295)',
      '--sidebar': 'oklch(0.19 0.035 295)',
      '--sidebar-foreground': 'oklch(0.95 0.01 295)',
      '--sidebar-primary': 'oklch(0.65 0.2 295)',
      '--sidebar-primary-foreground': 'oklch(0.13 0.025 295)',
      '--sidebar-accent': 'oklch(0.27 0.04 295)',
      '--sidebar-accent-foreground': 'oklch(0.95 0.01 295)',
      '--sidebar-border': 'oklch(0.34 0.04 295)',
      '--sidebar-ring': 'oklch(0.65 0.2 295)',
      ...FONT_VARS, ...SHADOW_DARK,
      '--chart-1': 'oklch(0.65 0.2 295)',
      '--chart-2': 'oklch(0.60 0.16 320)',
      '--chart-3': 'oklch(0.60 0.18 265)',
      '--chart-4': 'oklch(0.68 0.14 340)',
      '--chart-5': 'oklch(0.65 0.12 280)',
    },
  },
};

const SWATCH_KEYS: (keyof ThemeEntry['light'])[] = [
  '--background', '--primary', '--secondary', '--accent', '--border',
];

@Component({
  selector: 'app-themes-page',
  imports: [
    DocsLayoutComponent,
    CodeBlockComponent,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent,
    InputComponent,
    SwitchComponent,
    SeparatorComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl pb-16">

        <header class="mb-8">
          <h1 class="text-3xl font-bold tracking-tight">Themes</h1>
          <p class="mt-1 text-muted-foreground">
            Choose a base color palette for your project. Each theme sets CSS custom properties
            that all components inherit automatically.
          </p>
        </header>

        <!-- Theme picker -->
        <section class="mb-10" aria-labelledby="themes-heading">
          <h2 id="themes-heading" class="text-xl font-semibold mb-4">Color palette</h2>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3" role="radiogroup" aria-label="Select theme">
            @for (key of themeKeys; track key) {
              <button
                type="button"
                role="radio"
                [attr.aria-checked]="selectedTheme() === key"
                (click)="selectedTheme.set(key)"
                class="group relative flex flex-col gap-2 rounded-xl border-2 p-3 text-left transition-all hover:border-ring/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                [class.border-primary]="selectedTheme() === key"
                [class.border-border]="selectedTheme() !== key"
              >
                <!-- swatches -->
                <div class="flex gap-1" aria-hidden="true">
                  @for (swatchKey of swatchKeys; track swatchKey) {
                    <span
                      class="size-5 rounded-full border border-black/5 shrink-0"
                      [style.background-color]="themes[key].light[swatchKey]"
                    ></span>
                  }
                </div>
                <span class="text-sm font-medium">{{ themes[key].label }}</span>
                @if (selectedTheme() === key) {
                  <span class="absolute top-2 right-2 flex size-4 items-center justify-center rounded-full bg-primary" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-primary-foreground"/>
                    </svg>
                  </span>
                }
              </button>
            }
          </div>
        </section>

        <!-- Live preview -->
        <section class="mb-10" aria-labelledby="preview-heading">
          <div class="flex items-center justify-between mb-4">
            <h2 id="preview-heading" class="text-xl font-semibold">Preview</h2>
          </div>

          <div class="rounded-xl border border-border/60 overflow-hidden">
            <!-- toolbar -->
            <div class="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-2.5">
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono text-muted-foreground">preview</span>
                <span class="text-xs text-muted-foreground/60">·</span>
                <span class="text-xs font-medium text-muted-foreground">{{ themes[selectedTheme()].label }}</span>
              </div>
              <button
                n-button
                nVariant="outline"
                nSize="sm"
                [attr.aria-pressed]="isDark()"
                aria-label="Toggle dark mode preview"
                (nClick)="isDark.update(v => !v)"
              >
                @if (isDark()) {
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
                  Light
                } @else {
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  Dark
                }
              </button>
            </div>

            <!-- scoped preview -->
            <div #previewEl [class]="isDark() ? 'dark' : 'force-light'">
              <div class="bg-background p-6 sm:p-8 flex items-center justify-center min-h-80">
                <div class="w-full max-w-sm">
                  <n-card>
                    <n-card-header>
                      <div class="flex items-start justify-between">
                        <div>
                          <n-card-title>Account Settings</n-card-title>
                          <n-card-description>Manage your profile and preferences.</n-card-description>
                        </div>
                        <n-badge nVariant="secondary">Pro</n-badge>
                      </div>
                    </n-card-header>

                    <n-card-content>
                      <!-- stat row -->
                      <div class="grid grid-cols-3 gap-2 mb-5">
                        @for (stat of stats; track stat.label) {
                          <div class="rounded-lg bg-muted px-3 py-2 text-center">
                            <p class="text-sm font-semibold text-foreground">{{ stat.value }}</p>
                            <p class="text-[10px] text-muted-foreground leading-tight mt-0.5">{{ stat.label }}</p>
                          </div>
                        }
                      </div>

                      <!-- input -->
                      <div class="mb-4">
                        <n-input
                          nLabel="Display name"
                          nPlaceholder="John Doe"
                          nValue="Jane Smith"
                        />
                      </div>

                      <!-- switch -->
                      <div class="mb-4">
                        <n-switch
                          [nChecked]="notificationsOn()"
                          nLabel="Email notifications"
                          (nChange)="notificationsOn.set($event)"
                        />
                      </div>

                      <n-separator />
                    </n-card-content>

                    <n-card-footer>
                      <button n-button class="flex-1">Save changes</button>
                      <button n-button nVariant="outline" class="flex-1">Cancel</button>
                    </n-card-footer>
                  </n-card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- CSS variables output -->
        <section class="mb-10" aria-labelledby="css-heading">
          <h2 id="css-heading" class="text-xl font-semibold mb-1">CSS Variables</h2>
          <p class="text-sm text-muted-foreground mb-4">
            Add these variables to your
            <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">styles.css</code>
            when configuring manually. Or use the CLI to apply them automatically.
          </p>
          <app-code-block [code]="themeCss()" language="css" filename="styles.css" />
        </section>

        <!-- CLI usage -->
        <section aria-labelledby="cli-heading">
          <h2 id="cli-heading" class="text-xl font-semibold mb-1">Apply with CLI</h2>
          <p class="text-sm text-muted-foreground mb-4">
            Pass <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">--theme</code> to
            <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">init</code> to write
            the selected theme into your project automatically.
          </p>
          <app-code-block [code]="cliCode()" language="bash" />
        </section>

      </article>
    </app-docs-layout>
  `,
})
export class ThemesPage {
  private readonly darkMode = inject(DarkModeService);

  protected readonly selectedTheme = signal<BaseColor>('zinc');
  protected readonly isDark = signal(this.darkMode.isDark());
  protected readonly notificationsOn = signal(true);

  protected readonly themes = THEMES;
  protected readonly themeKeys = Object.keys(THEMES) as BaseColor[];
  protected readonly swatchKeys = SWATCH_KEYS;

  protected readonly stats = [
    { label: 'Storage', value: '85%' },
    { label: 'API calls', value: '12k' },
    { label: 'Members', value: '4' },
  ];

  private readonly previewEl = viewChild<ElementRef<HTMLElement>>('previewEl');

  constructor() {
    effect(() => {
      const el = this.previewEl()?.nativeElement;
      if (!el) return;
      const theme = THEMES[this.selectedTheme()];
      const vars = this.isDark() ? theme.dark : theme.light;
      for (const [k, v] of Object.entries(vars)) {
        el.style.setProperty(k, v);
      }
    });
  }

  protected readonly themeCss = computed(() => {
    const theme = THEMES[this.selectedTheme()];
    const toVars = (vars: Record<string, string>) =>
      Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`).join('\n');
    return `:root {\n${toVars(theme.light)}\n}\n\n.dark {\n${toVars(theme.dark)}\n}`;
  });

  protected readonly cliCode = computed(() =>
    `npx @nexuslabs/cli@alpha init --theme ${this.selectedTheme()}`,
  );
}

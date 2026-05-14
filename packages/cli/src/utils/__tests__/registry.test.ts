import { describe, it, expect } from 'vitest';
import { transformContent } from '../registry';
import type { Config } from '../config';

const config: Config = {
  packageManager: 'npm',
  registryUrl: 'https://nexus-ui.dev/r',
  tailwind: {
    css: 'src/styles.css',
    baseColor: 'slate',
  },
  baseUrl: 'src/app',
  aliases: {
    utils: '@/shared/utils',
    components: '@/shared/components',
  },
};

describe('transformContent', () => {
  describe('pattern 1: ../../utils/X → configured utils alias', () => {
    it('rewrites relative utils import', () => {
      const input = `import { mergeClasses } from '../../utils/merge-classes';`;
      const output = transformContent(input, config);
      expect(output).toBe(`import { mergeClasses } from '@/shared/utils/merge-classes';`);
    });

    it('rewrites relative utils import with double quotes', () => {
      const input = `import { mergeClasses } from "../../utils/merge-classes";`;
      const output = transformContent(input, config);
      expect(output).toBe(`import { mergeClasses } from '@/shared/utils/merge-classes';`);
    });

    it('rewrites nested utils subpath', () => {
      const input = `import { something } from '../../utils/form-control';`;
      const output = transformContent(input, config);
      expect(output).toBe(`import { something } from '@/shared/utils/form-control';`);
    });
  });

  describe('pattern 2: ../component-name → configured components alias', () => {
    it('rewrites relative sibling component import', () => {
      const input = `import { ButtonComponent } from '../button';`;
      const output = transformContent(input, config);
      expect(output).toBe(`import { ButtonComponent } from '@/shared/components/button';`);
    });

    it('rewrites relative sibling component with double quotes', () => {
      const input = `import { InputComponent } from "../input";`;
      const output = transformContent(input, config);
      expect(output).toBe(`import { InputComponent } from '@/shared/components/input';`);
    });
  });

  describe('pattern 3: @/shared/utils/X → stays same (already using alias)', () => {
    it('keeps @/shared/utils import unchanged', () => {
      const input = `import { mergeClasses } from '@/shared/utils/merge-classes';`;
      const output = transformContent(input, config);
      expect(output).toBe(`import { mergeClasses } from '@/shared/utils/merge-classes';`);
    });

    it('keeps @/shared/utils import with double quotes unchanged', () => {
      const input = `import { mergeClasses } from "@/shared/utils/merge-classes";`;
      const output = transformContent(input, config);
      expect(output).toBe(`import { mergeClasses } from '@/shared/utils/merge-classes';`);
    });
  });

  describe('pattern 4: @/shared/components/X → stays same (already using alias)', () => {
    it('keeps @/shared/components import unchanged', () => {
      const input = `import { ButtonComponent } from '@/shared/components/button';`;
      const output = transformContent(input, config);
      expect(output).toBe(`import { ButtonComponent } from '@/shared/components/button';`);
    });

    it('keeps @/shared/components import with double quotes unchanged', () => {
      const input = `import { ButtonComponent } from "@/shared/components/button";`;
      const output = transformContent(input, config);
      expect(output).toBe(`import { ButtonComponent } from '@/shared/components/button';`);
    });
  });

  describe('multiple imports in the same file', () => {
    it('transforms all matching imports in a multi-import file', () => {
      const input = [
        `import { Component } from '@angular/core';`,
        `import { mergeClasses } from '../../utils/merge-classes';`,
        `import { ButtonComponent } from '../button';`,
        `import { InputComponent } from '../input';`,
        `import { something } from '../../utils/form-control';`,
      ].join('\n');

      const output = transformContent(input, config);

      expect(output).toContain(`from '@angular/core'`);
      expect(output).toContain(`from '@/shared/utils/merge-classes'`);
      expect(output).toContain(`from '@/shared/components/button'`);
      expect(output).toContain(`from '@/shared/components/input'`);
      expect(output).toContain(`from '@/shared/utils/form-control'`);
      // original relative imports must be gone
      expect(output).not.toContain(`from '../../utils/merge-classes'`);
      expect(output).not.toContain(`from '../button'`);
      expect(output).not.toContain(`from '../input'`);
    });
  });

  describe('non-matching patterns are untouched', () => {
    it('does not touch Angular core imports', () => {
      const input = `import { Component, signal } from '@angular/core';`;
      const output = transformContent(input, config);
      expect(output).toBe(`import { Component, signal } from '@angular/core';`);
    });

    it('does not touch third-party imports', () => {
      const input = `import { cva } from 'class-variance-authority';`;
      const output = transformContent(input, config);
      expect(output).toBe(`import { cva } from 'class-variance-authority';`);
    });

    it('does not touch same-directory relative imports', () => {
      const input = `import { MyVariants } from './my.variants';`;
      const output = transformContent(input, config);
      expect(output).toBe(`import { MyVariants } from './my.variants';`);
    });
  });
});

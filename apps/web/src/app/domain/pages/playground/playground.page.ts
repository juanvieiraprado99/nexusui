import { ChangeDetectionStrategy, Component } from '@angular/core';

// Button demos
import { ButtonDemoDefault } from '@nexus/lib/shared/components/button/demo/default';
import { ButtonDemoLoading } from '@nexus/lib/shared/components/button/demo/loading';
import { ButtonDemoSize } from '@nexus/lib/shared/components/button/demo/size';
import { ButtonDemoVariants } from '@nexus/lib/shared/components/button/demo/variants';

// Input demos
import { InputDemoDefault } from '@nexus/lib/shared/components/input/demo/default';
import { InputDemoDisabled } from '@nexus/lib/shared/components/input/demo/disabled';
import { InputDemoError } from '@nexus/lib/shared/components/input/demo/error';
import { InputDemoLoading } from '@nexus/lib/shared/components/input/demo/loading';
import { InputDemoSizes } from '@nexus/lib/shared/components/input/demo/sizes';
import { InputDemoWithLabel } from '@nexus/lib/shared/components/input/demo/with-label';

// Combobox demos
import { ComboboxDefaultDemo } from '@nexus/lib/shared/components/combobox/demo/default';
import { ComboboxAsyncDemo } from '@nexus/lib/shared/components/combobox/demo/async';
import { ComboboxClearableDemo } from '@nexus/lib/shared/components/combobox/demo/clearable';
import { ComboboxDisabledDemo } from '@nexus/lib/shared/components/combobox/demo/disabled';
import { ComboboxMultiSelectDemo } from '@nexus/lib/shared/components/combobox/demo/multi-select';
import { ComboboxWithFormDemo } from '@nexus/lib/shared/components/combobox/demo/with-form';
import { ComboboxWithGroupsDemo } from '@nexus/lib/shared/components/combobox/demo/with-groups';

// Skeleton demos
import { SkeletonDefaultDemo } from '@nexus/lib/shared/components/skeleton/demo/default';
import { SkeletonCardDemo } from '@nexus/lib/shared/components/skeleton/demo/card';
import { SkeletonShapesDemo } from '@nexus/lib/shared/components/skeleton/demo/shapes';

// Checkbox demos
import { CheckboxDemoDefault } from '@nexus/lib/shared/components/checkbox/demo/default';
import { CheckboxDemoWithLabel } from '@nexus/lib/shared/components/checkbox/demo/with-label';
import { CheckboxDemoIndeterminate } from '@nexus/lib/shared/components/checkbox/demo/indeterminate';
import { CheckboxDemoSizes } from '@nexus/lib/shared/components/checkbox/demo/sizes';
import { CheckboxDemoDisabled } from '@nexus/lib/shared/components/checkbox/demo/disabled';
import { CheckboxDemoWithForm } from '@nexus/lib/shared/components/checkbox/demo/with-form';

// Dropdown Menu demos
import { DropdownMenuDefaultDemo } from '@nexus/lib/shared/components/dropdown-menu/demo/default';
import { DropdownMenuDestructiveItemDemo } from '@nexus/lib/shared/components/dropdown-menu/demo/destructive-item';
import { DropdownMenuFormActionsDemo } from '@nexus/lib/shared/components/dropdown-menu/demo/form-actions';
import { DropdownMenuWithGroupsDemo } from '@nexus/lib/shared/components/dropdown-menu/demo/with-groups';
import { DropdownMenuWithShortcutsDemo } from '@nexus/lib/shared/components/dropdown-menu/demo/with-shortcuts';
import { DropdownMenuWithSubmenuDemo } from '@nexus/lib/shared/components/dropdown-menu/demo/with-submenu';

@Component({
  selector: 'playground-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonDemoDefault, ButtonDemoLoading, ButtonDemoSize, ButtonDemoVariants,
    InputDemoDefault, InputDemoDisabled, InputDemoError, InputDemoLoading, InputDemoSizes, InputDemoWithLabel,
    ComboboxDefaultDemo, ComboboxAsyncDemo, ComboboxClearableDemo, ComboboxDisabledDemo,
    ComboboxMultiSelectDemo, ComboboxWithFormDemo, ComboboxWithGroupsDemo,
    CheckboxDemoDefault, CheckboxDemoWithLabel, CheckboxDemoIndeterminate,
    CheckboxDemoSizes, CheckboxDemoDisabled, CheckboxDemoWithForm,
    DropdownMenuDefaultDemo, DropdownMenuDestructiveItemDemo, DropdownMenuFormActionsDemo,
    DropdownMenuWithGroupsDemo, DropdownMenuWithShortcutsDemo, DropdownMenuWithSubmenuDemo,
    SkeletonDefaultDemo, SkeletonCardDemo, SkeletonShapesDemo,
  ],
  template: `
    <div class="max-w-5xl mx-auto px-6 py-12 space-y-16">

      <div>
        <h1 class="text-3xl font-bold tracking-tight">Playground</h1>
        <p class="mt-1 text-muted-foreground text-sm">All components, all demos.</p>
      </div>

      <!-- Button -->
      <section>
        <h2 class="text-xl font-semibold mb-6 pb-2 border-b border-border">Button</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Default</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-button-default />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Loading</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-button-loading />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sizes</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-button-size />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Variants</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-button-variants />
            </div>
          </div>
        </div>
      </section>

      <!-- Input -->
      <section>
        <h2 class="text-xl font-semibold mb-6 pb-2 border-b border-border">Input</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Default</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-input-default class="w-full max-w-sm" />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Disabled</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-input-disabled class="w-full max-w-sm" />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Error</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-input-error class="w-full max-w-sm" />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Loading</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-input-loading class="w-full max-w-sm" />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sizes</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-input-sizes class="w-full max-w-sm" />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">With Label</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-input-with-label class="w-full max-w-sm" />
            </div>
          </div>
        </div>
      </section>

      <!-- Combobox -->
      <section>
        <h2 class="text-xl font-semibold mb-6 pb-2 border-b border-border">Combobox</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Default</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-combobox-default />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Async</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-combobox-async />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Clearable</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-combobox-clearable />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Disabled</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-combobox-disabled />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Multi Select</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-combobox-multi-select />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">With Form</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-combobox-with-form />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3 sm:col-span-2">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">With Groups</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-combobox-with-groups />
            </div>
          </div>
        </div>
      </section>

      <!-- Skeleton -->
      <section>
        <h2 class="text-xl font-semibold mb-6 pb-2 border-b border-border">Skeleton</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Default</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-skeleton-default />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Card</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-skeleton-card />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3 sm:col-span-2">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Shapes</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-skeleton-shapes />
            </div>
          </div>
        </div>
      </section>

      <!-- Checkbox -->
      <section>
        <h2 class="text-xl font-semibold mb-6 pb-2 border-b border-border">Checkbox</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Default</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-checkbox-default />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sizes</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-checkbox-sizes />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Disabled</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-checkbox-disabled />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">With Label</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-checkbox-with-label />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Indeterminate</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-checkbox-indeterminate />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">With Form</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-checkbox-with-form />
            </div>
          </div>
        </div>
      </section>

      <!-- Dropdown Menu -->
      <section>
        <h2 class="text-xl font-semibold mb-6 pb-2 border-b border-border">Dropdown Menu</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Default</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-dropdown-menu-default />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Destructive Item</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-dropdown-menu-destructive-item />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">With Groups</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-dropdown-menu-with-groups />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">With Shortcuts</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-dropdown-menu-with-shortcuts />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">With Submenu</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-dropdown-menu-with-submenu />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Form Actions</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-dropdown-menu-form-actions />
            </div>
          </div>
        </div>
      </section>

    </div>
  `,
})
export class PlaygroundPage {}

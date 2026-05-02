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
import { InputDemoWithForm } from '@nexus/lib/shared/components/input/demo/with-form';

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

// Datepicker demos
import { DatepickerDefaultDemo } from '@nexus/lib/shared/components/datepicker/demo/default';
import { DatepickerWithLabelDemo } from '@nexus/lib/shared/components/datepicker/demo/with-label';
import { DatepickerWithFormDemo } from '@nexus/lib/shared/components/datepicker/demo/with-form';
import { DatepickerMinMaxDemo } from '@nexus/lib/shared/components/datepicker/demo/min-max';
import { DatepickerDisabledWeekendsDemo } from '@nexus/lib/shared/components/datepicker/demo/disabled-weekends';
import { DatepickerSizesDemo } from '@nexus/lib/shared/components/datepicker/demo/sizes';
import { DatepickerErrorDemo } from '@nexus/lib/shared/components/datepicker/demo/error';
import { DatepickerInlineCalendarDemo } from '@nexus/lib/shared/components/datepicker/demo/inline-calendar';

// Separator demos
import { SeparatorDefaultDemo } from '@nexus/lib/shared/components/separator/demo/default';
import { SeparatorVerticalDemo } from '@nexus/lib/shared/components/separator/demo/vertical';
import { SeparatorWithLabelDemo } from '@nexus/lib/shared/components/separator/demo/with-label';
import { SeparatorWithIconDemo } from '@nexus/lib/shared/components/separator/demo/with-icon';
import { SeparatorVariantsDemo } from '@nexus/lib/shared/components/separator/demo/variants';
import { SeparatorGradientDemo } from '@nexus/lib/shared/components/separator/demo/gradient';

// Select demos
import { SelectDefaultDemo } from '@nexus/lib/shared/components/select/demo/default';
import { SelectMultipleDemo } from '@nexus/lib/shared/components/select/demo/multiple';
import { SelectGroupsDemo } from '@nexus/lib/shared/components/select/demo/groups';
import { SelectWithIconsDemo } from '@nexus/lib/shared/components/select/demo/with-icons';
import { SelectSelectAllDemo } from '@nexus/lib/shared/components/select/demo/select-all';
import { SelectWithFormDemo } from '@nexus/lib/shared/components/select/demo/with-form';
import { SelectLoadingDemo } from '@nexus/lib/shared/components/select/demo/loading';

// Radio demos
import { RadioDefaultDemo } from '@nexus/lib/shared/components/radio/demo/default';
import { RadioCardDemo } from '@nexus/lib/shared/components/radio/demo/card';
import { RadioColorsDemo } from '@nexus/lib/shared/components/radio/demo/colors';
import { RadioDisabledDemo } from '@nexus/lib/shared/components/radio/demo/disabled';
import { RadioHorizontalDemo } from '@nexus/lib/shared/components/radio/demo/horizontal';
import { RadioLoadingDemo } from '@nexus/lib/shared/components/radio/demo/loading';
import { RadioReactiveFormDemo } from '@nexus/lib/shared/components/radio/demo/reactive-form';
import { RadioRichDescriptionDemo } from '@nexus/lib/shared/components/radio/demo/rich-description';
import { RadioSizesDemo } from '@nexus/lib/shared/components/radio/demo/sizes';

@Component({
  selector: 'playground-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonDemoDefault, ButtonDemoLoading, ButtonDemoSize, ButtonDemoVariants,
    InputDemoDefault, InputDemoDisabled, InputDemoError, InputDemoLoading, InputDemoSizes, InputDemoWithLabel, InputDemoWithForm,
    ComboboxDefaultDemo, ComboboxAsyncDemo, ComboboxClearableDemo, ComboboxDisabledDemo,
    ComboboxMultiSelectDemo, ComboboxWithFormDemo, ComboboxWithGroupsDemo,
    CheckboxDemoDefault, CheckboxDemoWithLabel, CheckboxDemoIndeterminate,
    CheckboxDemoSizes, CheckboxDemoDisabled, CheckboxDemoWithForm,
    DropdownMenuDefaultDemo, DropdownMenuDestructiveItemDemo, DropdownMenuFormActionsDemo,
    DropdownMenuWithGroupsDemo, DropdownMenuWithShortcutsDemo, DropdownMenuWithSubmenuDemo,
    SkeletonDefaultDemo, SkeletonCardDemo, SkeletonShapesDemo,
    RadioDefaultDemo, RadioCardDemo, RadioColorsDemo, RadioDisabledDemo,
    RadioHorizontalDemo, RadioLoadingDemo, RadioReactiveFormDemo,
    RadioRichDescriptionDemo, RadioSizesDemo,
    DatepickerDefaultDemo, DatepickerWithLabelDemo, DatepickerWithFormDemo,
    DatepickerMinMaxDemo, DatepickerDisabledWeekendsDemo, DatepickerSizesDemo,
    DatepickerErrorDemo, DatepickerInlineCalendarDemo,
    SelectDefaultDemo, SelectMultipleDemo, SelectGroupsDemo, SelectWithIconsDemo,
    SelectSelectAllDemo, SelectWithFormDemo, SelectLoadingDemo,
    SeparatorDefaultDemo, SeparatorVerticalDemo, SeparatorWithLabelDemo,
    SeparatorWithIconDemo, SeparatorVariantsDemo, SeparatorGradientDemo,
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
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3 sm:col-span-2">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">With Form</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-input-with-form class="w-full max-w-sm" />
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

      <!-- Radio -->
      <section>
        <h2 class="text-xl font-semibold mb-6 pb-2 border-b border-border">Radio</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Default</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-radio-default />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sizes</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-radio-sizes />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Colors</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-radio-colors />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Disabled</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-radio-disabled />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Horizontal</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-radio-horizontal />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Loading</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-radio-loading />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Rich Description</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-radio-rich-description />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Card</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-radio-card />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3 sm:col-span-2">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Reactive Form</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-radio-reactive-form />
            </div>
          </div>
        </div>
      </section>

      <!-- Separator -->
      <section id="separator">
        <h2 class="text-xl font-semibold mb-6 pb-2 border-b border-border">Separator</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Default</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-separator-default />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Vertical</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-separator-vertical />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">With Label</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-separator-with-label />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">With Icon</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-separator-with-icon />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Variants</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-separator-variants />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Gradient</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-separator-gradient />
            </div>
          </div>
        </div>
      </section>

      <!-- Select -->
      <section id="select">
        <h2 class="text-xl font-semibold mb-6 pb-2 border-b border-border">Select</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Default</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-select-default />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Multiple</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-select-multiple />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Groups</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-select-groups />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Icons + Description</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-select-with-icons />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Select All + Max</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-select-select-all />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Loading</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-select-loading />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3 sm:col-span-2">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">With Form</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-select-with-form />
            </div>
          </div>
        </div>
      </section>

      <!-- Datepicker -->
      <section>
        <h2 class="text-xl font-semibold mb-6 pb-2 border-b border-border">Datepicker</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Default</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-datepicker-default />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">With Label</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-datepicker-with-label />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Min / Max</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-datepicker-min-max />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Disabled Weekends</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-datepicker-disabled-weekends />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sizes</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-datepicker-sizes />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Error</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-datepicker-error />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3 sm:col-span-2">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">With Form</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-datepicker-with-form />
            </div>
          </div>
          <div class="rounded-lg border border-border p-6 flex flex-col gap-3 sm:col-span-2">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Inline Calendar</span>
            <div class="flex items-center justify-center min-h-16">
              <demo-datepicker-inline-calendar />
            </div>
          </div>
        </div>
      </section>

    </div>
  `,
})
export class PlaygroundPage {}

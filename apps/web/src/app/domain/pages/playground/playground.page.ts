import { ChangeDetectionStrategy, Component } from '@angular/core';

// Button demos
import { ButtonDemoDefault } from '@nexus/lib/shared/components/button/demo/default';
import { ButtonDemoLoading } from '@nexus/lib/shared/components/button/demo/loading';
import { ButtonDemoSize } from '@nexus/lib/shared/components/button/demo/size';
import { ButtonDemoVariants } from '@nexus/lib/shared/components/button/demo/variants';

// Button Group demos
import { ButtonGroupDefaultDemo } from '@nexus/lib/shared/components/button-group/demo/default';
import { ButtonGroupVerticalDemo } from '@nexus/lib/shared/components/button-group/demo/vertical';
import { ButtonGroupSizesDemo } from '@nexus/lib/shared/components/button-group/demo/sizes';
import { ButtonGroupVariantsDemo } from '@nexus/lib/shared/components/button-group/demo/variants';
import { ButtonGroupDisabledDemo } from '@nexus/lib/shared/components/button-group/demo/disabled';

// Input demos
import { InputDemoDefault } from '@nexus/lib/shared/components/input/demo/default';
import { InputDemoDisabled } from '@nexus/lib/shared/components/input/demo/disabled';
import { InputDemoError } from '@nexus/lib/shared/components/input/demo/error';
import { InputDemoLoading } from '@nexus/lib/shared/components/input/demo/loading';
import { InputDemoSizes } from '@nexus/lib/shared/components/input/demo/sizes';
import { InputDemoWithForm } from '@nexus/lib/shared/components/input/demo/with-form';
import { InputDemoWithLabel } from '@nexus/lib/shared/components/input/demo/with-label';

// Combobox demos
import { ComboboxAsyncDemo } from '@nexus/lib/shared/components/combobox/demo/async';
import { ComboboxClearableDemo } from '@nexus/lib/shared/components/combobox/demo/clearable';
import { ComboboxDefaultDemo } from '@nexus/lib/shared/components/combobox/demo/default';
import { ComboboxDisabledDemo } from '@nexus/lib/shared/components/combobox/demo/disabled';
import { ComboboxMultiSelectDemo } from '@nexus/lib/shared/components/combobox/demo/multi-select';
import { ComboboxWithFormDemo } from '@nexus/lib/shared/components/combobox/demo/with-form';
import { ComboboxWithGroupsDemo } from '@nexus/lib/shared/components/combobox/demo/with-groups';

// Skeleton demos
import { SkeletonCardDemo } from '@nexus/lib/shared/components/skeleton/demo/card';
import { SkeletonDefaultDemo } from '@nexus/lib/shared/components/skeleton/demo/default';
import { SkeletonShapesDemo } from '@nexus/lib/shared/components/skeleton/demo/shapes';

// Checkbox demos
import { CheckboxDemoDefault } from '@nexus/lib/shared/components/checkbox/demo/default';
import { CheckboxDemoDisabled } from '@nexus/lib/shared/components/checkbox/demo/disabled';
import { CheckboxDemoIndeterminate } from '@nexus/lib/shared/components/checkbox/demo/indeterminate';
import { CheckboxDemoSizes } from '@nexus/lib/shared/components/checkbox/demo/sizes';
import { CheckboxDemoWithForm } from '@nexus/lib/shared/components/checkbox/demo/with-form';
import { CheckboxDemoWithLabel } from '@nexus/lib/shared/components/checkbox/demo/with-label';

// Dropdown Menu demos
import { DropdownMenuDefaultDemo } from '@nexus/lib/shared/components/dropdown-menu/demo/default';
import { DropdownMenuDestructiveItemDemo } from '@nexus/lib/shared/components/dropdown-menu/demo/destructive-item';
import { DropdownMenuFormActionsDemo } from '@nexus/lib/shared/components/dropdown-menu/demo/form-actions';
import { DropdownMenuWithGroupsDemo } from '@nexus/lib/shared/components/dropdown-menu/demo/with-groups';
import { DropdownMenuWithShortcutsDemo } from '@nexus/lib/shared/components/dropdown-menu/demo/with-shortcuts';
import { DropdownMenuWithSubmenuDemo } from '@nexus/lib/shared/components/dropdown-menu/demo/with-submenu';

// Calendar demos
import { CalendarDefaultDemo } from '@nexus/lib/shared/components/calendar/demo/default';
import { CalendarDisabledDemo } from '@nexus/lib/shared/components/calendar/demo/disabled';
import { CalendarMultipleDemo } from '@nexus/lib/shared/components/calendar/demo/multiple';
import { CalendarRangeDemo } from '@nexus/lib/shared/components/calendar/demo/range';
import { CalendarWithFormDemo } from '@nexus/lib/shared/components/calendar/demo/with-form';

// Datepicker demos
import { DatepickerDefaultDemo } from '@nexus/lib/shared/components/datepicker/demo/default';
import { DatepickerDisabledWeekendsDemo } from '@nexus/lib/shared/components/datepicker/demo/disabled-weekends';
import { DatepickerErrorDemo } from '@nexus/lib/shared/components/datepicker/demo/error';
import { DatepickerMinMaxDemo } from '@nexus/lib/shared/components/datepicker/demo/min-max';
import { DatepickerSizesDemo } from '@nexus/lib/shared/components/datepicker/demo/sizes';
import { DatepickerWithFormDemo } from '@nexus/lib/shared/components/datepicker/demo/with-form';
import { DatepickerWithLabelDemo } from '@nexus/lib/shared/components/datepicker/demo/with-label';

// Separator demos
import { SeparatorDefaultDemo } from '@nexus/lib/shared/components/separator/demo/default';
import { SeparatorGradientDemo } from '@nexus/lib/shared/components/separator/demo/gradient';
import { SeparatorVariantsDemo } from '@nexus/lib/shared/components/separator/demo/variants';
import { SeparatorVerticalDemo } from '@nexus/lib/shared/components/separator/demo/vertical';
import { SeparatorWithIconDemo } from '@nexus/lib/shared/components/separator/demo/with-icon';
import { SeparatorWithLabelDemo } from '@nexus/lib/shared/components/separator/demo/with-label';

// Select demos
import { SelectDefaultDemo } from '@nexus/lib/shared/components/select/demo/default';
import { SelectGroupsDemo } from '@nexus/lib/shared/components/select/demo/groups';
import { SelectLoadingDemo } from '@nexus/lib/shared/components/select/demo/loading';
import { SelectMultipleDemo } from '@nexus/lib/shared/components/select/demo/multiple';
import { SelectSelectAllDemo } from '@nexus/lib/shared/components/select/demo/select-all';
import { SelectWithFormDemo } from '@nexus/lib/shared/components/select/demo/with-form';
import { SelectWithIconsDemo } from '@nexus/lib/shared/components/select/demo/with-icons';

// Badge demos
import { BadgeDefaultDemo } from '@nexus/lib/shared/components/badge/demo/default';
import { BadgeVariantsDemo } from '@nexus/lib/shared/components/badge/demo/variants';
import { BadgeWithAvatarDemo } from '@nexus/lib/shared/components/badge/demo/with-avatar';

// Avatar demos
import { AvatarDefaultDemo } from '@nexus/lib/shared/components/avatar/demo/default';
import { AvatarFallbackDemo } from '@nexus/lib/shared/components/avatar/demo/fallback';
import { AvatarGroupDemo } from '@nexus/lib/shared/components/avatar/demo/group';
import { AvatarShapesDemo } from '@nexus/lib/shared/components/avatar/demo/shapes';
import { AvatarSizesDemo } from '@nexus/lib/shared/components/avatar/demo/sizes';
import { AvatarStatusDemo } from '@nexus/lib/shared/components/avatar/demo/status';

// Breadcrumb demos
import { BreadcrumbCustomSeparatorDemo } from '@nexus/lib/shared/components/breadcrumb/demo/custom-separator';
import { BreadcrumbDefaultDemo } from '@nexus/lib/shared/components/breadcrumb/demo/default';
import { BreadcrumbSizesDemo } from '@nexus/lib/shared/components/breadcrumb/demo/sizes';
import { BreadcrumbWithEllipsisDemo } from '@nexus/lib/shared/components/breadcrumb/demo/with-ellipsis';

// Accordion demos
import { AccordionCustomIconDemo } from '@nexus/lib/shared/components/accordion/demo/accordion-custom-icon';
import { AccordionDefaultDemo } from '@nexus/lib/shared/components/accordion/demo/accordion-default';
import { AccordionDisabledDemo } from '@nexus/lib/shared/components/accordion/demo/accordion-disabled';
import { AccordionMultipleDemo } from '@nexus/lib/shared/components/accordion/demo/accordion-multiple';

// Textarea demos
import { TextareaAutoResizeDemo } from '@nexus/lib/shared/components/textarea/demo/auto-resize';
import { TextareaCharCountDemo } from '@nexus/lib/shared/components/textarea/demo/char-count';
import { TextareaDefaultDemo } from '@nexus/lib/shared/components/textarea/demo/default';
import { TextareaDisabledDemo } from '@nexus/lib/shared/components/textarea/demo/disabled';

// Slider demos
import { SliderDefaultDemo } from '@nexus/lib/shared/components/slider/demo/default';
import { SliderRangeDemo } from '@nexus/lib/shared/components/slider/demo/range';
import { SliderVerticalDemo } from '@nexus/lib/shared/components/slider/demo/vertical';
import { SliderWithInputsDemo } from '@nexus/lib/shared/components/slider/demo/with-inputs';
import { SliderWithMarksDemo } from '@nexus/lib/shared/components/slider/demo/with-marks';

// Switch demos
import { SwitchDemoColors } from '@nexus/lib/shared/components/switch/demo/colors';
import { SwitchDemoDefault } from '@nexus/lib/shared/components/switch/demo/default';
import { SwitchDemoDisabled } from '@nexus/lib/shared/components/switch/demo/disabled';
import { SwitchDemoIcons } from '@nexus/lib/shared/components/switch/demo/icons';
import { SwitchDemoLabelInside } from '@nexus/lib/shared/components/switch/demo/label-inside';
import { SwitchDemoLoading } from '@nexus/lib/shared/components/switch/demo/loading';
import { SwitchDemoSizes } from '@nexus/lib/shared/components/switch/demo/sizes';

// Sonner demos
import { SonnerDemoDefault } from '@nexus/lib/shared/components/sonner/demo/default';
import { SonnerDemoPromise } from '@nexus/lib/shared/components/sonner/demo/promise';
import { SonnerDemoVariants } from '@nexus/lib/shared/components/sonner/demo/variants';
import { SonnerComponent } from '@nexus/lib/shared/components/sonner/sonner.component';

// Pagination demos
import { PaginationCompactDemo } from '@nexus/lib/shared/components/pagination/demo/compact';
import { PaginationDefaultDemo } from '@nexus/lib/shared/components/pagination/demo/default';
import { PaginationDisabledDemo } from '@nexus/lib/shared/components/pagination/demo/disabled';
import { PaginationSizesDemo } from '@nexus/lib/shared/components/pagination/demo/sizes';
import { PaginationWithPageSizeDemo } from '@nexus/lib/shared/components/pagination/demo/with-page-size';

// Alert demos
import { AlertDefaultDemo } from '@nexus/lib/shared/components/alert/demo/default';
import { AlertVariantsDemo } from '@nexus/lib/shared/components/alert/demo/variants';
import { AlertDismissibleDemo } from '@nexus/lib/shared/components/alert/demo/dismissible';
import { AlertAutoDismissDemo } from '@nexus/lib/shared/components/alert/demo/auto-dismiss';

// Dialog demos
import { DialogAlertDemo } from '@nexus/lib/shared/components/dialog/demo/alert-dialog';
import { DialogDefaultDemo } from '@nexus/lib/shared/components/dialog/demo/default';
import { DialogScrollableDemo } from '@nexus/lib/shared/components/dialog/demo/scrollable';
import { DialogSizesDemo } from '@nexus/lib/shared/components/dialog/demo/sizes';
import { DialogWithFormDemo } from '@nexus/lib/shared/components/dialog/demo/with-form';

// Input OTP demos
import { InputOtpDemoDefault } from '@nexus/lib/shared/components/input-otp/demo/default';
import { InputOtpDemoSizes } from '@nexus/lib/shared/components/input-otp/demo/sizes';
import { InputOtpDemoMasked } from '@nexus/lib/shared/components/input-otp/demo/masked';
import { InputOtpDemoWithSeparator } from '@nexus/lib/shared/components/input-otp/demo/with-separator';
import { InputOtpDemoWithForm } from '@nexus/lib/shared/components/input-otp/demo/with-form';
import { InputOtpDemoAutoSubmit } from '@nexus/lib/shared/components/input-otp/demo/auto-submit';

// Radio demos
import { RadioCardDemo } from '@nexus/lib/shared/components/radio/demo/card';
import { RadioColorsDemo } from '@nexus/lib/shared/components/radio/demo/colors';
import { RadioDefaultDemo } from '@nexus/lib/shared/components/radio/demo/default';
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
    ButtonDemoDefault,
    ButtonDemoLoading,
    ButtonDemoSize,
    ButtonDemoVariants,
    ButtonGroupDefaultDemo,
    ButtonGroupVerticalDemo,
    ButtonGroupSizesDemo,
    ButtonGroupVariantsDemo,
    ButtonGroupDisabledDemo,
    InputDemoDefault,
    InputDemoDisabled,
    InputDemoError,
    InputDemoLoading,
    InputDemoSizes,
    InputDemoWithLabel,
    InputDemoWithForm,
    ComboboxDefaultDemo,
    ComboboxAsyncDemo,
    ComboboxClearableDemo,
    ComboboxDisabledDemo,
    ComboboxMultiSelectDemo,
    ComboboxWithFormDemo,
    ComboboxWithGroupsDemo,
    CheckboxDemoDefault,
    CheckboxDemoWithLabel,
    CheckboxDemoIndeterminate,
    CheckboxDemoSizes,
    CheckboxDemoDisabled,
    CheckboxDemoWithForm,
    DropdownMenuDefaultDemo,
    DropdownMenuDestructiveItemDemo,
    DropdownMenuFormActionsDemo,
    DropdownMenuWithGroupsDemo,
    DropdownMenuWithShortcutsDemo,
    DropdownMenuWithSubmenuDemo,
    AlertDefaultDemo,
    AlertVariantsDemo,
    AlertDismissibleDemo,
    AlertAutoDismissDemo,
    DialogDefaultDemo,
    DialogSizesDemo,
    DialogScrollableDemo,
    DialogAlertDemo,
    DialogWithFormDemo,
    SkeletonDefaultDemo,
    SkeletonCardDemo,
    SkeletonShapesDemo,
    BadgeDefaultDemo,
    BadgeVariantsDemo,
    BadgeWithAvatarDemo,
    AvatarDefaultDemo,
    AvatarFallbackDemo,
    AvatarSizesDemo,
    AvatarShapesDemo,
    AvatarStatusDemo,
    AvatarGroupDemo,
    BreadcrumbDefaultDemo,
    BreadcrumbCustomSeparatorDemo,
    BreadcrumbWithEllipsisDemo,
    BreadcrumbSizesDemo,
    AccordionDefaultDemo,
    AccordionMultipleDemo,
    AccordionDisabledDemo,
    AccordionCustomIconDemo,
    SwitchDemoDefault,
    SwitchDemoSizes,
    SwitchDemoColors,
    SwitchDemoIcons,
    SwitchDemoLoading,
    SwitchDemoLabelInside,
    SwitchDemoDisabled,
    SonnerDemoDefault,
    SonnerDemoVariants,
    SonnerDemoPromise,
    SonnerComponent,
    PaginationDefaultDemo,
    PaginationSizesDemo,
    PaginationCompactDemo,
    PaginationDisabledDemo,
    PaginationWithPageSizeDemo,
    InputOtpDemoDefault,
    InputOtpDemoSizes,
    InputOtpDemoMasked,
    InputOtpDemoWithSeparator,
    InputOtpDemoWithForm,
    InputOtpDemoAutoSubmit,
    RadioDefaultDemo,
    RadioCardDemo,
    RadioColorsDemo,
    RadioDisabledDemo,
    RadioHorizontalDemo,
    RadioLoadingDemo,
    RadioReactiveFormDemo,
    RadioRichDescriptionDemo,
    RadioSizesDemo,
    CalendarDefaultDemo,
    CalendarMultipleDemo,
    CalendarRangeDemo,
    CalendarWithFormDemo,
    CalendarDisabledDemo,
    DatepickerDefaultDemo,
    DatepickerWithLabelDemo,
    DatepickerWithFormDemo,
    DatepickerMinMaxDemo,
    DatepickerDisabledWeekendsDemo,
    DatepickerSizesDemo,
    DatepickerErrorDemo,
    SelectDefaultDemo,
    SelectMultipleDemo,
    SelectGroupsDemo,
    SelectWithIconsDemo,
    SelectSelectAllDemo,
    SelectWithFormDemo,
    SelectLoadingDemo,
    TextareaDefaultDemo,
    TextareaAutoResizeDemo,
    TextareaCharCountDemo,
    TextareaDisabledDemo,
    SliderDefaultDemo,
    SliderRangeDemo,
    SliderWithMarksDemo,
    SliderWithInputsDemo,
    SliderVerticalDemo,
    SeparatorDefaultDemo,
    SeparatorVerticalDemo,
    SeparatorWithLabelDemo,
    SeparatorWithIconDemo,
    SeparatorVariantsDemo,
    SeparatorGradientDemo,
  ],
  template: `
    <div class="mx-auto max-w-5xl space-y-16 px-6 py-12">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Playground</h1>
        <p class="text-muted-foreground mt-1 text-sm">All components, all demos.</p>
      </div>

      <!-- Sonner (toaster único compartilhado por todas as demos) -->
      <n-sonner nPosition="bottom-right" [nCloseButton]="false" [nRichColors]="false" />

      <!-- Sonner -->
      <section id="sonner">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Sonner</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">Notificação básica com título e descrição.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-sonner-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Promise</span>
            <p class="text-muted-foreground text-xs">
              loading → success/error automático via
              <code class="bg-muted rounded px-1 font-mono">toast.promise()</code>.
            </p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-sonner-promise />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Variants + Ação</span>
            <p class="text-muted-foreground text-xs">
              success, error, warning, info — com <code class="bg-muted rounded px-1 font-mono">nRichColors</code> e
              botão de ação inline.
            </p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-sonner-variants />
            </div>
          </div>
        </div>
      </section>

      <!-- Alert -->
      <section id="alert">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Alert</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">Basic alert with title and description.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-alert-default class="w-full" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Variants</span>
            <p class="text-muted-foreground text-xs">default · info · success · warning · destructive.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-alert-variants class="w-full" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Dismissible</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nDismissible</code> shows × button, emits <code class="bg-muted rounded px-1 font-mono">nDismiss</code>.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-alert-dismissible class="w-full" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Auto-dismiss</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nAutoDismissDuration</code> hides after N ms.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-alert-auto-dismiss class="w-full" />
            </div>
          </div>
        </div>
      </section>

      <!-- Breadcrumb -->
      <section id="breadcrumb">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Breadcrumb</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-breadcrumb-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Custom Separator</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-breadcrumb-custom-separator />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Ellipsis</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-breadcrumb-with-ellipsis />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-breadcrumb-sizes />
            </div>
          </div>
        </div>
      </section>

      <!-- Pagination -->
      <section id="pagination">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Pagination</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">Smart truncation — sibling + boundary ellipsis.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-pagination-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-pagination-sizes />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Compact</span>
            <p class="text-muted-foreground text-xs">Prev / "X / Y" / Next — ideal para mobile.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-pagination-compact />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Disabled</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-pagination-disabled />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Page Size Selector</span>
            <p class="text-muted-foreground text-xs">
              <code class="bg-muted rounded px-1 font-mono">nTotalItems</code> + dropdown de itens por página.
            </p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-pagination-with-page-size />
            </div>
          </div>
        </div>
      </section>

      <!-- Accordion -->
      <section id="accordion">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Accordion</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default (single)</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-accordion-default class="w-full max-w-md" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Multiple</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-accordion-multiple class="w-full max-w-md" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Disabled Item</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-accordion-disabled class="w-full max-w-md" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Plus/Minus Icon</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-accordion-custom-icon class="w-full max-w-md" />
            </div>
          </div>
        </div>
      </section>

      <!-- Button -->
      <section>
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Button</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-button-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Loading</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-button-loading />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-button-size />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Variants</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-button-variants />
            </div>
          </div>
        </div>
      </section>

      <!-- Button Group -->
      <section id="button-group">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Button Group</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">Botões conectados horizontalmente com bordas colapsadas.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-button-group-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Vertical</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nOrientation="vertical"</code> — empilhado.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-button-group-vertical />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nSize</code> no grupo propaga para todos os botões.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-button-group-sizes />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Variants</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nVariant</code> no grupo propaga para todos os botões.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-button-group-variants />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Disabled</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nDisabled</code> desabilita todos os botões filhos.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-button-group-disabled />
            </div>
          </div>
        </div>
      </section>

      <!-- Input -->
      <section>
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Input</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-default class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Disabled</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-disabled class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Error</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-error class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Loading</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-loading class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-sizes class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Label</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-with-label class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Form</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-with-form class="w-full max-w-sm" />
            </div>
          </div>
        </div>
      </section>

      <!-- Input OTP -->
      <section id="input-otp">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Input OTP</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">6-digit numeric OTP with two-way binding.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-otp-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <p class="text-muted-foreground text-xs">sm / default / lg slot sizes.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-otp-sizes />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Masked (PIN)</span>
            <p class="text-muted-foreground text-xs">4-digit PIN — slots render as password dots.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-otp-masked />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Auto-submit</span>
            <p class="text-muted-foreground text-xs">
              <code class="bg-muted rounded px-1 font-mono">(nComplete)</code> fires when last slot filled.
            </p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-otp-auto-submit />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Separator</span>
            <p class="text-muted-foreground text-xs">
              <code class="bg-muted rounded px-1 font-mono">nSeparatorIndex</code> splits slots into visual groups.
            </p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-otp-with-separator />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Form</span>
            <p class="text-muted-foreground text-xs">Full reactive forms integration via <code class="bg-muted rounded px-1 font-mono">formControlName</code>.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-otp-with-form />
            </div>
          </div>
        </div>
      </section>

      <!-- Textarea -->
      <section id="textarea">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Textarea</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-textarea-default class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Disabled</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-textarea-disabled class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Auto Resize</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-textarea-auto-resize class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Char Count</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-textarea-char-count class="w-full max-w-sm" />
            </div>
          </div>
        </div>
      </section>

      <!-- Slider -->
      <section id="slider">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Slider</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-slider-default class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Range</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-slider-range class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Marks</span>
            <div class="flex min-h-20 items-center justify-center">
              <demo-slider-with-marks class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Inputs</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-slider-with-inputs class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Vertical (Equalizer)</span>
            <div class="flex min-h-52 items-center justify-center">
              <demo-slider-vertical />
            </div>
          </div>
        </div>
      </section>

      <!-- Combobox -->
      <section>
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Combobox</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-combobox-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Async</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-combobox-async />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Clearable</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-combobox-clearable />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Disabled</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-combobox-disabled />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Multi Select</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-combobox-multi-select />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Form</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-combobox-with-form />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Groups</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-combobox-with-groups />
            </div>
          </div>
        </div>
      </section>

      <!-- Skeleton -->
      <section>
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Skeleton</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-skeleton-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Card</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-skeleton-card />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Shapes</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-skeleton-shapes />
            </div>
          </div>
        </div>
      </section>

      <!-- Checkbox -->
      <section>
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Checkbox</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-checkbox-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-checkbox-sizes />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Disabled</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-checkbox-disabled />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Label</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-checkbox-with-label />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Indeterminate</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-checkbox-indeterminate />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Form</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-checkbox-with-form />
            </div>
          </div>
        </div>
      </section>

      <!-- Dropdown Menu -->
      <section>
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Dropdown Menu</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-dropdown-menu-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Destructive Item</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-dropdown-menu-destructive-item />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Groups</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-dropdown-menu-with-groups />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Shortcuts</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-dropdown-menu-with-shortcuts />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Submenu</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-dropdown-menu-with-submenu />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Form Actions</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-dropdown-menu-form-actions />
            </div>
          </div>
        </div>
      </section>

      <!-- Dialog -->
      <section id="dialog">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Dialog</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">Dialog básico com header, body e footer.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-dialog-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <p class="text-muted-foreground text-xs">sm / default / lg / xl / full.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-dialog-sizes />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Scrollable</span>
            <p class="text-muted-foreground text-xs">Conteúdo longo com scroll interno — header e footer fixos.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-dialog-scrollable />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Alert Dialog</span>
            <p class="text-muted-foreground text-xs">
              <code class="bg-muted rounded px-1 font-mono">nRole="alertdialog"</code> — Escape e backdrop desabilitados.
            </p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-dialog-alert />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Form + Persistent</span>
            <p class="text-muted-foreground text-xs">
              Formulário reativo + <code class="bg-muted rounded px-1 font-mono">nPersistent</code> — clique fora para ver o shake.
            </p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-dialog-with-form />
            </div>
          </div>
        </div>
      </section>

      <!-- Badge -->
      <section>
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Badge</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-badge-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Variants</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-badge-variants />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Avatar</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-badge-with-avatar />
            </div>
          </div>
        </div>
      </section>

      <!-- Avatar -->
      <section>
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Avatar</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-avatar-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Fallback</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-avatar-fallback />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-avatar-sizes />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Shapes</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-avatar-shapes />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Status</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-avatar-status />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Group</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-avatar-group />
            </div>
          </div>
        </div>
      </section>

      <!-- Radio -->
      <section>
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Radio</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-radio-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-radio-sizes />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Colors</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-radio-colors />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Disabled</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-radio-disabled />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Horizontal</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-radio-horizontal />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Loading</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-radio-loading />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Rich Description</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-radio-rich-description />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Card</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-radio-card />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Reactive Form</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-radio-reactive-form />
            </div>
          </div>
        </div>
      </section>

      <!-- Switch -->
      <section id="switch">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Switch</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-switch-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-switch-sizes />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Colors</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-switch-colors />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Disabled</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-switch-disabled />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Loading</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-switch-loading />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Icons</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-switch-icons />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Track Labels</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-switch-label-inside />
            </div>
          </div>
        </div>
      </section>

      <!-- Separator -->
      <section id="separator">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Separator</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-separator-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Vertical</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-separator-vertical />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Label</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-separator-with-label />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Icon</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-separator-with-icon />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Variants</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-separator-variants />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Gradient</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-separator-gradient />
            </div>
          </div>
        </div>
      </section>

      <!-- Select -->
      <section id="select">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Select</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-select-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Multiple</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-select-multiple />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Groups</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-select-groups />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Icons + Description</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-select-with-icons />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Select All + Max</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-select-select-all />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Loading</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-select-loading />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Form</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-select-with-form />
            </div>
          </div>
        </div>
      </section>

      <!-- Datepicker -->
      <section>
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Datepicker</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-datepicker-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Label</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-datepicker-with-label />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Min / Max</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-datepicker-min-max />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Disabled Weekends</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-datepicker-disabled-weekends />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-datepicker-sizes />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Error</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-datepicker-error />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Form</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-datepicker-with-form />
            </div>
          </div>
        </div>
      </section>

      <!-- Calendar -->
      <section class="flex flex-col gap-6">
        <h2 class="text-foreground text-xl font-semibold">Calendar</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default (Single)</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-calendar-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Multiple</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-calendar-multiple />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Range</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-calendar-range />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Form</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-calendar-with-form />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Disabled</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-calendar-disabled />
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class PlaygroundPage {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

// Button demos
import { ButtonDemoDefault } from '@nexus/lib/shared/components/button/demo/default';
import { ButtonDemoLoading } from '@nexus/lib/shared/components/button/demo/loading';
import { ButtonDemoSize } from '@nexus/lib/shared/components/button/demo/size';
import { ButtonDemoVariants } from '@nexus/lib/shared/components/button/demo/variants';
import { ButtonDemoDisabled } from '@nexus/lib/shared/components/button/demo/disabled';
import { ButtonDemoWithIcon } from '@nexus/lib/shared/components/button/demo/with-icon';
import { ButtonDemoAsLink } from '@nexus/lib/shared/components/button/demo/as-link';
import { ButtonDemoHostTypes } from '@nexus/lib/shared/components/button/demo/host-types';

// Button Group demos
import { ButtonGroupDefaultDemo } from '@nexus/lib/shared/components/button-group/demo/default';
import { ButtonGroupDisabledDemo } from '@nexus/lib/shared/components/button-group/demo/disabled';
import { ButtonGroupSizesDemo } from '@nexus/lib/shared/components/button-group/demo/sizes';
import { ButtonGroupVariantsDemo } from '@nexus/lib/shared/components/button-group/demo/variants';
import { ButtonGroupVerticalDemo } from '@nexus/lib/shared/components/button-group/demo/vertical';

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
import { CheckboxComponent } from '@nexus/lib/shared/components/checkbox';
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
import { DatepickerWithTimeDemo } from '@nexus/lib/shared/components/datepicker/demo/with-time';

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
import { BadgeSizesDemo } from '@nexus/lib/shared/components/badge/demo/sizes';
import { BadgeAsLinkDemo } from '@nexus/lib/shared/components/badge/demo/as-link';

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
import { AlertAutoDismissDemo } from '@nexus/lib/shared/components/alert/demo/auto-dismiss';
import { AlertDefaultDemo } from '@nexus/lib/shared/components/alert/demo/default';
import { AlertDismissibleDemo } from '@nexus/lib/shared/components/alert/demo/dismissible';
import { AlertVariantsDemo } from '@nexus/lib/shared/components/alert/demo/variants';

// Card demos
import { CardDemoClickable } from '@nexus/lib/shared/components/card/demo/clickable';
import { CardDemoDefault } from '@nexus/lib/shared/components/card/demo/default';
import { CardDemoLoading } from '@nexus/lib/shared/components/card/demo/loading';
import { CardDemoSizes } from '@nexus/lib/shared/components/card/demo/sizes';
import { CardDemoVariants } from '@nexus/lib/shared/components/card/demo/variants';

// Drawer demos
import { DrawerDefaultDemo } from '@nexus/lib/shared/components/drawer/demo/default';
import { DrawerNavigationDemo } from '@nexus/lib/shared/components/drawer/demo/navigation';
import { DrawerPositionsDemo } from '@nexus/lib/shared/components/drawer/demo/positions';
import { DrawerSizesDemo } from '@nexus/lib/shared/components/drawer/demo/sizes';
import { DrawerPersistentDemo } from '@nexus/lib/shared/components/drawer/demo/persistent';
import { DrawerControlledDemo } from '@nexus/lib/shared/components/drawer/demo/controlled';
import { DrawerBackdropHandleDemo } from '@nexus/lib/shared/components/drawer/demo/backdrop-handle';
import { DrawerScrollableDemo } from '@nexus/lib/shared/components/drawer/demo/scrollable';

// Dialog demos
import { DialogAlertDemo } from '@nexus/lib/shared/components/dialog/demo/alert-dialog';
import { DialogDefaultDemo } from '@nexus/lib/shared/components/dialog/demo/default';
import { DialogScrollableDemo } from '@nexus/lib/shared/components/dialog/demo/scrollable';
import { DialogSizesDemo } from '@nexus/lib/shared/components/dialog/demo/sizes';
import { DialogWithFormDemo } from '@nexus/lib/shared/components/dialog/demo/with-form';

// Input OTP demos
import { InputOtpDemoAutoSubmit } from '@nexus/lib/shared/components/input-otp/demo/auto-submit';
import { InputOtpDemoDefault } from '@nexus/lib/shared/components/input-otp/demo/default';
import { InputOtpDemoMasked } from '@nexus/lib/shared/components/input-otp/demo/masked';
import { InputOtpDemoSizes } from '@nexus/lib/shared/components/input-otp/demo/sizes';
import { InputOtpDemoWithForm } from '@nexus/lib/shared/components/input-otp/demo/with-form';
import { InputOtpDemoWithSeparator } from '@nexus/lib/shared/components/input-otp/demo/with-separator';

// Collapsible demos
import { CollapsibleControlledDemo } from '@nexus/lib/shared/components/collapsible/demo/controlled';
import { CollapsibleDefaultDemo } from '@nexus/lib/shared/components/collapsible/demo/default';
import { CollapsibleLazyDemo } from '@nexus/lib/shared/components/collapsible/demo/lazy';
import { CollapsibleVariantsDemo } from '@nexus/lib/shared/components/collapsible/demo/variants';

// Context Menu demos
import { ContextMenuDefaultDemo } from '@nexus/lib/shared/components/context-menu/demo/default';
import { ContextMenuWithCheckboxesDemo } from '@nexus/lib/shared/components/context-menu/demo/with-checkboxes';
import { ContextMenuWithRadioGroupDemo } from '@nexus/lib/shared/components/context-menu/demo/with-radio-group';
import { ContextMenuWithShortcutsDemo } from '@nexus/lib/shared/components/context-menu/demo/with-shortcuts';
import { ContextMenuWithSubmenuDemo } from '@nexus/lib/shared/components/context-menu/demo/with-submenu';

// Table demos
import { TableBorderedDemo } from '@nexus/lib/shared/components/table/demo/bordered';
import { TableCompactDemo } from '@nexus/lib/shared/components/table/demo/compact';
import { TableDefaultDemo } from '@nexus/lib/shared/components/table/demo/default';
import { TableScrollableDemo } from '@nexus/lib/shared/components/table/demo/scrollable';
import { TableStripedDemo } from '@nexus/lib/shared/components/table/demo/striped';
import { TableWithCaptionDemo } from '@nexus/lib/shared/components/table/demo/with-caption';
import { TableWithFooterDemo } from '@nexus/lib/shared/components/table/demo/with-footer';

// Data Table demos
import { DataTableCustomCellDemo } from '@nexus/lib/shared/components/data-table/demo/custom-cell';
import { DataTableDefaultDemo } from '@nexus/lib/shared/components/data-table/demo/default';
import { DataTableLoadingDemo } from '@nexus/lib/shared/components/data-table/demo/loading';
import { DataTableServerSideDemo } from '@nexus/lib/shared/components/data-table/demo/server-side';
import { DataTableServerSidePaginatedDemo } from '@nexus/lib/shared/components/data-table/demo/server-side-paginated';
import { DataTableSortableDemo } from '@nexus/lib/shared/components/data-table/demo/sortable';
import { DataTableWithFilterDemo } from '@nexus/lib/shared/components/data-table/demo/with-filter';
import { DataTableWithPaginationDemo } from '@nexus/lib/shared/components/data-table/demo/with-pagination';
import { DataTableWithSelectionDemo } from '@nexus/lib/shared/components/data-table/demo/with-selection';

// Popover demos
import { PopoverDefaultDemo } from '@nexus/lib/shared/components/popover/demo/default';
import { PopoverHoverDemo } from '@nexus/lib/shared/components/popover/demo/hover';
import { PopoverPlacementDemo } from '@nexus/lib/shared/components/popover/demo/placement';
import { PopoverWithFormDemo } from '@nexus/lib/shared/components/popover/demo/with-form';

// Sidebar demos
import { SidebarCollapsibleGroupsDemo } from '@nexus/lib/shared/components/sidebar/demo/collapsible-groups';
import { SidebarDefaultDemo } from '@nexus/lib/shared/components/sidebar/demo/default';

// Form demos
import { FormDemoDefault } from '@nexus/lib/shared/components/form/demo/default';
import { FormDemoRequired } from '@nexus/lib/shared/components/form/demo/required';
import { FormDemoValidation } from '@nexus/lib/shared/components/form/demo/validation';

// Progress Bar demos
import { ProgressBarDemoAnimations } from '@nexus/lib/shared/components/progress-bar/demo/animations';
import { ProgressBarDemoDefault } from '@nexus/lib/shared/components/progress-bar/demo/default';
import { ProgressBarDemoIndeterminate } from '@nexus/lib/shared/components/progress-bar/demo/indeterminate';
import { ProgressBarDemoShowValue } from '@nexus/lib/shared/components/progress-bar/demo/show-value';
import { ProgressBarDemoSizes } from '@nexus/lib/shared/components/progress-bar/demo/sizes';
import { ProgressBarDemoStriped } from '@nexus/lib/shared/components/progress-bar/demo/striped';
import { ProgressBarDemoVariants } from '@nexus/lib/shared/components/progress-bar/demo/variants';

// Tabs demos
import { TabsControlledDemo } from '@nexus/lib/shared/components/tabs/demo/tabs-controlled';
import { TabsDefaultDemo } from '@nexus/lib/shared/components/tabs/demo/tabs-default';
import { TabsVariantsDemo } from '@nexus/lib/shared/components/tabs/demo/tabs-variants';
import { TabsVerticalDemo } from '@nexus/lib/shared/components/tabs/demo/tabs-vertical';

// Signature demos
import { SignatureDemoDefault } from '@nexus/lib/shared/components/signature/demo/default';
import { SignatureDemoOutputFormats } from '@nexus/lib/shared/components/signature/demo/output-formats';
import { SignatureDemoWithForm } from '@nexus/lib/shared/components/signature/demo/with-form';

// Input Group demos
import { InputGroupClearableDemo } from '@nexus/lib/shared/components/input-group/demo/clearable';
import { InputGroupCopyableDemo } from '@nexus/lib/shared/components/input-group/demo/copyable';
import { InputGroupDefaultDemo } from '@nexus/lib/shared/components/input-group/demo/default';
import { InputGroupDisabledDemo } from '@nexus/lib/shared/components/input-group/demo/disabled';
import { InputGroupLoadingDemo } from '@nexus/lib/shared/components/input-group/demo/loading';
import { InputGroupSizesDemo } from '@nexus/lib/shared/components/input-group/demo/sizes';
import { InputGroupTextareaDemo } from '@nexus/lib/shared/components/input-group/demo/textarea';
import { InputGroupWithButtonDemo } from '@nexus/lib/shared/components/input-group/demo/with-button';
import { InputGroupWithIconDemo } from '@nexus/lib/shared/components/input-group/demo/with-icon';

// Color Picker demos
import { ColorPickerDefaultDemo } from '@nexus/lib/shared/components/color-picker/demo/default';
import { ColorPickerFormatsDemo } from '@nexus/lib/shared/components/color-picker/demo/formats';
import { ColorPickerInlineDemo } from '@nexus/lib/shared/components/color-picker/demo/inline';
import { ColorPickerWithAlphaDemo } from '@nexus/lib/shared/components/color-picker/demo/with-alpha';
import { ColorPickerWithPresetsDemo } from '@nexus/lib/shared/components/color-picker/demo/with-presets';

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

// Image Upload demos
import { FileUploadDefaultDemo } from '@nexus/lib/shared/components/file-upload/demo/default';
import { FileUploadAvatarDemo } from '@nexus/lib/shared/components/file-upload/demo/avatar';
import { FileUploadMultipleDemo } from '@nexus/lib/shared/components/file-upload/demo/multiple';
import { FileUploadWithCropDemo } from '@nexus/lib/shared/components/file-upload/demo/with-crop';
import { FileUploadAcceptPresetsDemo } from '@nexus/lib/shared/components/file-upload/demo/accept-presets';
import { FileUploadProgressDemo } from '@nexus/lib/shared/components/file-upload/demo/progress';
import { FileUploadIconPreviewDemo } from '@nexus/lib/shared/components/file-upload/demo/icon-preview';
import { FileUploadReactiveFormDemo } from '@nexus/lib/shared/components/file-upload/demo/reactive-form';
import { FileUploadVideosDemo } from '@nexus/lib/shared/components/file-upload/demo/videos';
import { FileUploadAudioDemo } from '@nexus/lib/shared/components/file-upload/demo/audio';
import { FileUploadArchivesDemo } from '@nexus/lib/shared/components/file-upload/demo/archives';
import { FileUploadMixedDemo } from '@nexus/lib/shared/components/file-upload/demo/mixed';
import { FileUploadDimensionsDemo } from '@nexus/lib/shared/components/file-upload/demo/dimensions';
import { FileUploadDisabledDemo } from '@nexus/lib/shared/components/file-upload/demo/disabled';
import { FileUploadProgressMultipleDemo } from '@nexus/lib/shared/components/file-upload/demo/progress-multiple';
import { FileUploadErrorDemo } from '@nexus/lib/shared/components/file-upload/demo/error';
import { FileUploadSizesDemo } from '@nexus/lib/shared/components/file-upload/demo/sizes';

// Image demos
import { ImageDefaultDemo } from '@nexus/lib/shared/components/image/demo/default';
import { ImageFillDemo } from '@nexus/lib/shared/components/image/demo/fill';
import { ImageRatioDemo } from '@nexus/lib/shared/components/image/demo/ratio';
import { ImageSkeletonDemo } from '@nexus/lib/shared/components/image/demo/skeleton';
import { ImageFallbackDemo } from '@nexus/lib/shared/components/image/demo/fallback';
import { ImageCdnDemo } from '@nexus/lib/shared/components/image/demo/cdn';

// Tooltip demos
import { TooltipBasicDemo } from '@nexus/lib/shared/components/tooltip/demo/basic';
import { TooltipDiagonalsDemo } from '@nexus/lib/shared/components/tooltip/demo/diagonals';
import { TooltipSidesDemo } from '@nexus/lib/shared/components/tooltip/demo/sides';
import { TooltipTemplateDemo } from '@nexus/lib/shared/components/tooltip/demo/template';

// Ripple demos
import { RippleDefaultDemo } from '@nexus/lib/shared/components/ripple/demo/default';
import { RippleOnButtonDemo } from '@nexus/lib/shared/components/ripple/demo/on-button';
import { RippleColorsDemo } from '@nexus/lib/shared/components/ripple/demo/colors';
import { RippleCenteredDemo } from '@nexus/lib/shared/components/ripple/demo/centered';
import { RippleUnboundedDemo } from '@nexus/lib/shared/components/ripple/demo/unbounded';

@Component({
  selector: 'playground-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonDemoDefault,
    ButtonDemoLoading,
    ButtonDemoSize,
    ButtonDemoVariants,
    ButtonDemoDisabled,
    ButtonDemoWithIcon,
    ButtonDemoAsLink,
    ButtonDemoHostTypes,
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
    CheckboxComponent,
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
    CardDemoDefault,
    CardDemoVariants,
    CardDemoClickable,
    CardDemoLoading,
    CardDemoSizes,
    DrawerDefaultDemo,
    DrawerPositionsDemo,
    DrawerSizesDemo,
    DrawerNavigationDemo,
    DrawerPersistentDemo,
    DrawerControlledDemo,
    DrawerBackdropHandleDemo,
    DrawerScrollableDemo,
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
    BadgeSizesDemo,
    BadgeAsLinkDemo,
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
    CollapsibleDefaultDemo,
    CollapsibleControlledDemo,
    CollapsibleLazyDemo,
    CollapsibleVariantsDemo,
    ContextMenuDefaultDemo,
    ContextMenuWithCheckboxesDemo,
    ContextMenuWithRadioGroupDemo,
    ContextMenuWithSubmenuDemo,
    ContextMenuWithShortcutsDemo,
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
    TableDefaultDemo,
    TableStripedDemo,
    TableBorderedDemo,
    TableCompactDemo,
    TableWithCaptionDemo,
    TableWithFooterDemo,
    TableScrollableDemo,
    DataTableDefaultDemo,
    DataTableSortableDemo,
    DataTableWithSelectionDemo,
    DataTableLoadingDemo,
    DataTableWithFilterDemo,
    DataTableServerSideDemo,
    DataTableCustomCellDemo,
    DataTableServerSidePaginatedDemo,
    DataTableWithPaginationDemo,
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
    DatepickerWithTimeDemo,
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
    PopoverDefaultDemo,
    PopoverWithFormDemo,
    PopoverPlacementDemo,
    PopoverHoverDemo,
    SidebarDefaultDemo,
    SidebarCollapsibleGroupsDemo,
    FormDemoDefault,
    FormDemoValidation,
    FormDemoRequired,
    ProgressBarDemoDefault,
    ProgressBarDemoSizes,
    ProgressBarDemoVariants,
    ProgressBarDemoIndeterminate,
    ProgressBarDemoShowValue,
    ProgressBarDemoStriped,
    ProgressBarDemoAnimations,
    TabsDefaultDemo,
    TabsVariantsDemo,
    TabsVerticalDemo,
    TabsControlledDemo,
    SignatureDemoDefault,
    SignatureDemoWithForm,
    SignatureDemoOutputFormats,
    InputGroupDefaultDemo,
    InputGroupWithButtonDemo,
    InputGroupWithIconDemo,
    InputGroupClearableDemo,
    InputGroupCopyableDemo,
    InputGroupDisabledDemo,
    InputGroupLoadingDemo,
    InputGroupSizesDemo,
    InputGroupTextareaDemo,
    ColorPickerDefaultDemo,
    ColorPickerWithAlphaDemo,
    ColorPickerWithPresetsDemo,
    ColorPickerInlineDemo,
    ColorPickerFormatsDemo,
    ImageDefaultDemo,
    ImageFillDemo,
    ImageRatioDemo,
    ImageSkeletonDemo,
    ImageFallbackDemo,
    ImageCdnDemo,
    FileUploadDefaultDemo,
    FileUploadAvatarDemo,
    FileUploadMultipleDemo,
    FileUploadWithCropDemo,
    FileUploadAcceptPresetsDemo,
    FileUploadProgressDemo,
    FileUploadIconPreviewDemo,
    FileUploadReactiveFormDemo,
    FileUploadVideosDemo,
    FileUploadAudioDemo,
    FileUploadArchivesDemo,
    FileUploadMixedDemo,
    FileUploadDimensionsDemo,
    FileUploadDisabledDemo,
    FileUploadProgressMultipleDemo,
    FileUploadErrorDemo,
    FileUploadSizesDemo,
    TooltipBasicDemo,
    TooltipDiagonalsDemo,
    TooltipSidesDemo,
    TooltipTemplateDemo,
    RippleDefaultDemo,
    RippleOnButtonDemo,
    RippleColorsDemo,
    RippleCenteredDemo,
    RippleUnboundedDemo,
  ],
  template: `
    <div class="mx-auto max-w-5xl space-y-16 px-6 py-12">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Playground</h1>
        <p class="text-muted-foreground mt-1 text-sm">All components, all demos.</p>
      </div>

      <!-- Sonner (toaster único compartilhado por todas as demos) -->
      <n-sonner nPosition="bottom-right" [nCloseButton]="false" [nRichColors]="false" />

      <!-- Ripple -->
      <section id="ripple">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Ripple</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">
              <code class="bg-muted rounded px-1 font-mono">nRipple</code> em qualquer host — ondulação a partir do ponto do clique.
            </p>
            <div class="flex min-h-32 items-center justify-center">
              <demo-ripple-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">On Button</span>
            <p class="text-muted-foreground text-xs">
              Combinado com <code class="bg-muted rounded px-1 font-mono">n-button</code> + cor customizada.
            </p>
            <div class="flex min-h-32 items-center justify-center">
              <demo-ripple-on-button />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Colors</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nRippleColor</code> — qualquer cor CSS.</p>
            <div class="flex min-h-32 items-center justify-center">
              <demo-ripple-colors />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Centered &amp; Unbounded</span>
            <p class="text-muted-foreground text-xs">
              <code class="bg-muted rounded px-1 font-mono">nRippleCentered</code> e
              <code class="bg-muted rounded px-1 font-mono">nRippleUnbounded</code> — ideais para icon buttons.
            </p>
            <div class="flex min-h-32 items-center justify-center gap-6">
              <demo-ripple-centered />
              <demo-ripple-unbounded />
            </div>
          </div>
        </div>
      </section>

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

      <!-- Card -->
      <section id="card">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Card</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">Header + Content + Footer com sub-componentes compostos.</p>
            <div class="flex min-h-40 items-center justify-center">
              <demo-card-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Variants</span>
            <p class="text-muted-foreground text-xs">default · elevated · filled · ghost.</p>
            <div class="flex min-h-40 items-center justify-center">
              <demo-card-variants />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Clickable + Selected</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nClickable</code> + <code class="bg-muted rounded px-1 font-mono">nSelected</code> — seletor de plano com teclado.</p>
            <div class="flex min-h-40 items-center justify-center">
              <demo-card-clickable />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Loading</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nLoading</code> — overlay animado com spinner sobre conteúdo existente.</p>
            <div class="flex min-h-40 items-center justify-center">
              <demo-card-loading />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nSize</code> — sm · default · lg (padding).</p>
            <div class="flex min-h-40 items-center justify-center">
              <demo-card-sizes />
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

      <!-- Collapsible -->
      <section id="collapsible">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Collapsible</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">Single-item expand/collapse com chevron animado.</p>
            <div class="flex min-h-24 items-center justify-center">
              <demo-collapsible-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Controlled</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">[(nOpen)]</code> two-way binding com controle externo.</p>
            <div class="flex min-h-24 items-center justify-center">
              <demo-collapsible-controlled />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Lazy</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nLazy</code> — desmonta o conteúdo ao fechar.</p>
            <div class="flex min-h-24 items-center justify-center">
              <demo-collapsible-lazy />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Variants</span>
            <p class="text-muted-foreground text-xs">default · bordered · card — padding herdado via contexto.</p>
            <div class="flex min-h-24 items-center justify-center">
              <demo-collapsible-variants />
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
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Disabled</span>
            <p class="text-muted-foreground text-xs">
              <code class="bg-muted rounded px-1 font-mono">nDisabled</code> via
              <code class="bg-muted rounded px-1 font-mono">data-disabled</code> — funciona em button, âncora e custom element.
            </p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-button-disabled />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Icon</span>
            <p class="text-muted-foreground text-xs">Ícone leading/trailing via <code class="bg-muted rounded px-1 font-mono">ng-content</code> + gap automático. Botões só de ícone: use <code class="bg-muted rounded px-1 font-mono">nAriaLabel</code>.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-button-with-icon />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">As Link</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">a[n-button]</code> — âncora com estilo de botão.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-button-as-link />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Host Types</span>
            <p class="text-muted-foreground text-xs">
              Mesmo seletor em 3 hosts: <code class="bg-muted rounded px-1 font-mono">n-button</code> (custom el, navegável por teclado),
              <code class="bg-muted rounded px-1 font-mono">button[n-button]</code>, <code class="bg-muted rounded px-1 font-mono">a[n-button]</code>.
            </p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-button-host-types />
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
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nVariant</code> no grupo propaga para todos os botões (inclui <code class="bg-muted rounded px-1 font-mono">success</code> / <code class="bg-muted rounded px-1 font-mono">warning</code>).</p>
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

      <!-- Input Group -->
      <section id="input-group">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Input Group</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">Addon de texto antes do campo via <code class="bg-muted rounded px-1 font-mono">nAddonBefore</code>.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-group-default class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Com Ícone</span>
            <p class="text-muted-foreground text-xs">Addon com <code class="bg-muted rounded px-1 font-mono">TemplateRef</code> — SVG inline passado via <code class="bg-muted rounded px-1 font-mono">[nAddonBefore]</code>.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-group-with-icon class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Com Botão</span>
            <p class="text-muted-foreground text-xs">Addon com <code class="bg-muted rounded px-1 font-mono">n-button</code> via <code class="bg-muted rounded px-1 font-mono">[nAddonAfter]</code>.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-group-with-button class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Clearable</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nClearable</code> — botão X aparece ao digitar, limpa o campo.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-group-clearable class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Copyable</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nCopyable</code> — copia para clipboard com feedback visual.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-group-copyable class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Loading</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nLoading</code> — spinner no campo, desabilita interação.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-group-loading class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Disabled</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nDisabled</code> — estado desabilitado visual no grupo inteiro.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-input-group-disabled class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <p class="text-muted-foreground text-xs">sm · default · lg — propagados ao input interno.</p>
            <div class="flex min-h-24 items-center justify-center">
              <demo-input-group-sizes class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Textarea</span>
            <p class="text-muted-foreground text-xs">Addons detectados automaticamente em modo bloco — acima e abaixo do textarea.</p>
            <div class="flex min-h-24 items-center justify-center">
              <demo-input-group-textarea class="w-full max-w-lg" />
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
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Hint &amp; Error</span>
            <div class="flex min-h-16 items-center justify-center">
              <div class="flex flex-col gap-4">
                <n-checkbox nLabel="Subscribe to newsletter" nHint="We'll send weekly updates." />
                <n-checkbox nLabel="Accept terms" nError="You must accept the terms to continue." />
              </div>
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

      <!-- Context Menu -->
      <section id="context-menu">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Context Menu</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">Right-click na área — itens padrão + item destructive.</p>
            <div class="flex min-h-48 items-center justify-center">
              <demo-context-menu-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Checkbox Items</span>
            <p class="text-muted-foreground text-xs">Toggle de opções sem fechar o menu — <code class="bg-muted rounded px-1 font-mono">[(nChecked)]</code>.</p>
            <div class="flex min-h-48 items-center justify-center">
              <demo-context-menu-with-checkboxes />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Radio Group</span>
            <p class="text-muted-foreground text-xs">Seleção exclusiva via <code class="bg-muted rounded px-1 font-mono">n-context-menu-radio-group</code> + <code class="bg-muted rounded px-1 font-mono">[(nValue)]</code>.</p>
            <div class="flex min-h-48 items-center justify-center">
              <demo-context-menu-with-radio-group />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Submenu</span>
            <p class="text-muted-foreground text-xs">Menu aninhado via <code class="bg-muted rounded px-1 font-mono">n-context-menu-sub</code> — conectado ao trigger element.</p>
            <div class="flex min-h-48 items-center justify-center">
              <demo-context-menu-with-submenu />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Shortcuts</span>
            <p class="text-muted-foreground text-xs">Atalhos de teclado via <code class="bg-muted rounded px-1 font-mono">n-context-menu-shortcut</code> alinhados à direita.</p>
            <div class="flex min-h-48 items-center justify-center">
              <demo-context-menu-with-shortcuts />
            </div>
          </div>
        </div>
      </section>

      <!-- Drawer -->
      <section id="drawer">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Drawer</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">Drawer básico com header, body scrollável e footer.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-drawer-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Positions</span>
            <p class="text-muted-foreground text-xs">left · right · top · bottom — animação deslizante por borda.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-drawer-positions />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <p class="text-muted-foreground text-xs">sm / md / lg / xl / full — largura (left/right) ou altura (top/bottom).</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-drawer-sizes />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Navigation</span>
            <p class="text-muted-foreground text-xs">
              <code class="bg-muted rounded px-1 font-mono">nRole="navigation"</code> — menu lateral com links.
            </p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-drawer-navigation />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Persistent</span>
            <p class="text-muted-foreground text-xs">
              <code class="bg-muted rounded px-1 font-mono">nPersistent</code> — backdrop/ESC apenas treme, não fecha.
            </p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-drawer-persistent />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Controlled</span>
            <p class="text-muted-foreground text-xs">
              <code class="bg-muted rounded px-1 font-mono">[(nOpen)]</code> — estado dirigido por signal externo.
            </p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-drawer-controlled />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Backdrop &amp; Handle</span>
            <p class="text-muted-foreground text-xs">
              <code class="bg-muted rounded px-1 font-mono">[nBackdrop]="false"</code> + toggle de <code class="bg-muted rounded px-1 font-mono">nHandle</code>.
            </p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-drawer-backdrop-handle />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Scrollable</span>
            <p class="text-muted-foreground text-xs">
              <code class="bg-muted rounded px-1 font-mono">nScrollable</code> — header/footer fixos, corpo rola.
            </p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-drawer-scrollable />
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
            <p class="text-muted-foreground text-xs">Dialog básico com header, body e footer. Abre/fecha com animação fade + zoom (respeita <code class="bg-muted rounded px-1 font-mono">prefers-reduced-motion</code>).</p>
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
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-badge-sizes />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">As Link</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-badge-as-link />
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
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Time</span>
            <div class="flex min-h-16 items-center justify-center">
              <demo-datepicker-with-time />
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

      <!-- Table -->
      <section id="table">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Table</h2>
        <div class="grid grid-cols-1 gap-4">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">Tabela básica com header, body e linhas.</p>
            <demo-table-default />
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Striped</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nVariant="striped"</code> — linhas alternadas com fundo sutil.</p>
            <demo-table-striped />
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Bordered</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nVariant="bordered"</code> — borda em todas as células.</p>
            <demo-table-bordered />
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Compact</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nSize="compact"</code> — padding reduzido e fonte menor.</p>
            <demo-table-compact />
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Caption</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">caption[n-table-caption]</code> — legenda abaixo da tabela.</p>
            <demo-table-with-caption />
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Footer</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">tfoot[n-table-footer]</code> — rodapé para totais e sumários.</p>
            <demo-table-with-footer />
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Scrollable</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">n-table-scroll</code> — wrapper com <code class="bg-muted rounded px-1 font-mono">overflow-x-auto</code> para tabelas largas em telas pequenas.</p>
            <demo-table-scrollable />
          </div>
        </div>
      </section>

      <!-- Data Table -->
      <section id="data-table">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Data Table</h2>
        <div class="grid grid-cols-1 gap-4">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">Tabela básica com dados estáticos.</p>
            <demo-data-table-default />
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sortable</span>
            <p class="text-muted-foreground text-xs">Colunas com <code class="bg-muted rounded px-1 font-mono">sortable: true</code> — clique no header para ordenar asc/desc/none.</p>
            <demo-data-table-sortable />
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Row Selection</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nSelectable</code> + <code class="bg-muted rounded px-1 font-mono">[(nSelectedRows)]</code> — checkbox individual e select-all com indeterminate.</p>
            <demo-data-table-with-selection />
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Loading (Skeleton)</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nLoading</code> exibe skeleton rows — <code class="bg-muted rounded px-1 font-mono">nSkeletonRows</code> controla quantidade.</p>
            <demo-data-table-loading />
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Filter + Column Toggle</span>
            <p class="text-muted-foreground text-xs">Busca global via <code class="bg-muted rounded px-1 font-mono">nFilterValue</code> + <code class="bg-muted rounded px-1 font-mono">n-data-table-column-toggle</code> para visibilidade de colunas.</p>
            <demo-data-table-with-filter />
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Server-side (sem paginação)</span>
            <p class="text-muted-foreground text-xs">Busca real na API JSONPlaceholder <code class="bg-muted rounded px-1 font-mono">/users</code> — sort e filter via query params, debounce 400ms.</p>
            <demo-data-table-server-side />
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Server-side + Paginação</span>
            <p class="text-muted-foreground text-xs">API JSONPlaceholder <code class="bg-muted rounded px-1 font-mono">/posts</code> — 100 posts com <code class="bg-muted rounded px-1 font-mono">_page</code> + <code class="bg-muted rounded px-1 font-mono">_limit</code>, total via <code class="bg-muted rounded px-1 font-mono">X-Total-Count</code>, integração com <code class="bg-muted rounded px-1 font-mono">n-pagination</code>.</p>
            <demo-data-table-server-side-paginated />
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Paginação Client-side</span>
            <p class="text-muted-foreground text-xs">Dados estáticos com <code class="bg-muted rounded px-1 font-mono">n-pagination</code> — slice no componente, sem requisição extra.</p>
            <demo-data-table-with-pagination />
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Custom Cell Templates</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">cellTemplate</code> na definição de coluna — <code class="bg-muted rounded px-1 font-mono">ng-template</code> com contexto <code class="bg-muted rounded px-1 font-mono">$implicit</code> + <code class="bg-muted rounded px-1 font-mono">row</code>.</p>
            <demo-data-table-custom-cell />
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
      <!-- Popover -->
      <section id="popover">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Popover</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">Clique para abrir. Fecha ao clicar fora ou pressionar <code class="bg-muted rounded px-1 font-mono">Esc</code>.</p>
            <div class="flex min-h-20 items-center justify-center">
              <demo-popover-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Hover</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nTrigger="hover"</code> — abre ao passar o mouse, fecha ao sair.</p>
            <div class="flex min-h-20 items-center justify-center">
              <demo-popover-hover />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Placement</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nSide</code>: top · bottom · left · right. Flip automático se não couber.</p>
            <div class="flex min-h-20 items-center justify-center">
              <demo-popover-placement />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Form</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nModal</code> + <code class="bg-muted rounded px-1 font-mono">nPersistent</code> — focus trap, não fecha ao clicar fora.</p>
            <div class="flex min-h-20 items-center justify-center">
              <demo-popover-with-form />
            </div>
          </div>
        </div>
      </section>

      <!-- Form -->
      <section id="form">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Form</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">
              <code class="bg-muted rounded px-1 font-mono">n-form-field</code> +
              <code class="bg-muted rounded px-1 font-mono">n-form-control</code> +
              <code class="bg-muted rounded px-1 font-mono">n-form-description</code>.
              Label auto-linked via context.
            </p>
            <div class="flex min-h-20 items-center justify-center">
              <demo-form-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Required</span>
            <p class="text-muted-foreground text-xs">
              <code class="bg-muted rounded px-1 font-mono">nRequired</code> no <code class="bg-muted rounded px-1 font-mono">n-form-field</code> — asterisco visual no label via context, sem lógica de validação no componente.
            </p>
            <div class="flex min-h-20 items-center justify-center">
              <demo-form-required />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Validation</span>
            <p class="text-muted-foreground text-xs">
              Reactive form com
              <code class="bg-muted rounded px-1 font-mono">nType="error"</code> no
              <code class="bg-muted rounded px-1 font-mono">n-form-message</code>.
              <code class="bg-muted rounded px-1 font-mono">n-form-field</code> com <code class="bg-muted rounded px-1 font-mono">nInvalid</code> — label herda estado via context.
              ARIA <code class="bg-muted rounded px-1 font-mono">aria-describedby</code> via
              <code class="bg-muted rounded px-1 font-mono">ctrl.messageId()</code>.
            </p>
            <div class="flex min-h-20 items-center justify-center">
              <demo-form-validation />
            </div>
          </div>
        </div>
      </section>

      <!-- Progress Bar -->
      <section id="progress-bar">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Progress Bar</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">Determinate progress via <code class="bg-muted rounded px-1 font-mono">nValue</code> (0–100).</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-progress-bar-default class="w-full" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Indeterminate</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nIndeterminate</code> — animated, for unknown duration.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-progress-bar-indeterminate class="w-full" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sizes</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nSize</code>: sm · default · lg.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-progress-bar-sizes class="w-full" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Variants</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nVariant</code>: default · success · warning · destructive.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-progress-bar-variants class="w-full" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Show Value</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nShowValue</code> renders percentage label. Animated width transition via <code class="bg-muted rounded px-1 font-mono">nAnimated</code>.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-progress-bar-show-value class="w-full max-w-sm" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Striped</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nStriped</code> — diagonal stripe pattern, animated when <code class="bg-muted rounded px-1 font-mono">nAnimated</code>.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-progress-bar-striped class="w-full" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Animation variants</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nAnimation</code>: slide · bounce · pulse + striped indeterminate.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-progress-bar-animations class="w-full" />
            </div>
          </div>
        </div>
      </section>

      <!-- Sidebar -->
      <section id="sidebar">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Sidebar</h2>
        <div class="grid grid-cols-1 gap-4">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default — Rail Mode (icon)</span>
            <p class="text-muted-foreground text-xs">
              <code class="bg-muted rounded px-1 font-mono">nCollapsible="icon"</code> — colapsa para tira de ícones.
              Use <kbd class="rounded border border-border px-1 text-xs">Ctrl+B</kbd> ou clique no trigger.
              Estado salvo em <code class="bg-muted rounded px-1 font-mono">localStorage</code>.
            </p>
            <demo-sidebar-default />
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Collapsible Groups — Offcanvas</span>
            <p class="text-muted-foreground text-xs">
              <code class="bg-muted rounded px-1 font-mono">nCollapsible="offcanvas"</code> — sidebar some completamente.
              Grupos de navegação com estado ativo.
            </p>
            <demo-sidebar-collapsible-groups />
          </div>
        </div>
      </section>

      <!-- Signature -->
      <section id="signature">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Signature</h2>
        <div class="grid grid-cols-1 gap-4">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">Mouse no desktop, dedo/caneta no mobile. Undo, clear, placeholder.</p>
            <div class="flex min-h-48 items-start justify-start">
              <demo-signature-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Reactive Form</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">formControlName</code> com validação obrigatória — erro aparece ao submeter sem assinar.</p>
            <div class="flex min-h-48 items-start justify-start">
              <demo-signature-with-form />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Output Formats</span>
            <p class="text-muted-foreground text-xs">Alterne entre <code class="bg-muted rounded px-1 font-mono">base64-png</code>, <code class="bg-muted rounded px-1 font-mono">base64-svg</code> e <code class="bg-muted rounded px-1 font-mono">svg</code> e veja a saída ao vivo.</p>
            <div class="flex min-h-48 items-start justify-start">
              <demo-signature-output-formats />
            </div>
          </div>
        </div>
      </section>

      <!-- Tabs -->
      <section id="tabs">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Tabs</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default (pills)</span>
            <p class="text-muted-foreground text-xs">Variante padrão com <code class="bg-muted rounded px-1 font-mono">nDefaultValue</code>.</p>
            <div class="flex min-h-24 items-start justify-start">
              <demo-tabs-default class="w-full" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Controlled</span>
            <p class="text-muted-foreground text-xs">Modo controlado via <code class="bg-muted rounded px-1 font-mono">[(nValue)]</code> com controle externo.</p>
            <div class="flex min-h-24 items-start justify-start">
              <demo-tabs-controlled class="w-full" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Variants — pills · line · boxed</span>
            <p class="text-muted-foreground text-xs">Três estilos visuais. Cada um adapta borda ativa ao eixo da orientação.</p>
            <div class="flex min-h-24 items-start justify-start">
              <demo-tabs-variants class="w-full" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Vertical + Disabled</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nOrientation="vertical"</code> — border-r ativo. Última aba desabilitada.</p>
            <div class="flex min-h-32 items-start justify-start">
              <demo-tabs-vertical class="w-full" />
            </div>
          </div>
        </div>
      </section>

      <!-- Color Picker -->
      <section id="color-picker">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Color Picker</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default (popup)</span>
            <p class="text-muted-foreground text-xs">Picker em popup com output HEX. <code class="bg-muted rounded px-1 font-mono">[(nValue)]</code> two-way binding.</p>
            <div class="flex min-h-24 items-start justify-start">
              <demo-color-picker-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Alpha</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nShowAlpha="true"</code> — slider de opacidade, preview em tempo real.</p>
            <div class="flex min-h-24 items-start justify-start">
              <demo-color-picker-with-alpha />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">With Presets</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nPresets</code> — swatches clicáveis + últimas 8 cores recentes em localStorage.</p>
            <div class="flex min-h-24 items-start justify-start">
              <demo-color-picker-with-presets />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Output Formats</span>
            <p class="text-muted-foreground text-xs">Três instâncias com <code class="bg-muted rounded px-1 font-mono">nFormat="hex"</code>, <code class="bg-muted rounded px-1 font-mono">"rgb"</code>, <code class="bg-muted rounded px-1 font-mono">"hsl"</code> e <code class="bg-muted rounded px-1 font-mono">"oklch"</code>. Formato também alterável via botão no picker.</p>
            <div class="flex min-h-24 items-start justify-start">
              <demo-color-picker-formats />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Inline</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nMode="inline"</code> — picker embutido direto no layout, sem popup.</p>
            <div class="flex min-h-64 items-start justify-start">
              <demo-color-picker-inline />
            </div>
          </div>
        </div>
      </section>

      <!-- Image -->
      <section id="image">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Image</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default</span>
            <p class="text-muted-foreground text-xs">Imagem básica com dimensões intrínsecas e cantos arredondados.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-image-default />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Fill</span>
            <p class="text-muted-foreground text-xs">Modo fill — ocupa todo o container com <code class="bg-muted rounded px-1 font-mono">nFill</code> e <code class="bg-muted rounded px-1 font-mono">nFit="cover"</code>.</p>
            <div class="w-full">
              <demo-image-fill />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Aspect Ratios</span>
            <p class="text-muted-foreground text-xs">square, video 16:9, portrait 3:4, landscape 4:3 via <code class="bg-muted rounded px-1 font-mono">nRatio</code>.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-image-ratio />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Skeleton</span>
            <p class="text-muted-foreground text-xs">Placeholder animado enquanto carrega via <code class="bg-muted rounded px-1 font-mono">nSkeleton</code>.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-image-skeleton />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Fallback</span>
            <p class="text-muted-foreground text-xs">Fallback via <code class="bg-muted rounded px-1 font-mono">nFallbackSrc</code> URL ou slot <code class="bg-muted rounded px-1 font-mono">[nImageFallback]</code> customizado.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-image-fallback />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">CDN Loaders</span>
            <p class="text-muted-foreground text-xs">Exemplos de configuração com Imgix, Cloudinary, ImageKit e Netlify.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-image-cdn />
            </div>
          </div>
        </div>
      </section>

      <!-- Image Upload -->
      <section id="file-upload">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Image Upload</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Default (Dropzone)</span>
            <p class="text-muted-foreground text-xs">Drag & drop ou clique. Validação de tipo e tamanho máximo. Preview de thumbnail.</p>
            <div class="flex min-h-40 items-start justify-start">
              <demo-file-upload-default class="w-full max-w-lg" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Avatar</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nVariant="avatar"</code> — circular. Botão de edição sobreposto. Tamanhos sm · default · lg. Versão central com crop 1:1.</p>
            <div class="flex min-h-32 items-center justify-center">
              <demo-file-upload-avatar />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Multiple</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nMultiple</code> + <code class="bg-muted rounded px-1 font-mono">nMaxFiles</code> — lista de arquivos com botão "Adicionar mais".</p>
            <div class="flex min-h-40 items-start justify-start">
              <demo-file-upload-multiple class="w-full" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Com Crop</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nCrop</code> + <code class="bg-muted rounded px-1 font-mono">nCropAspectRatio</code> — overlay canvas com regra dos terços, handles de canto e lock de proporção 16:9.</p>
            <div class="flex min-h-40 items-start justify-start">
              <demo-file-upload-with-crop class="w-full max-w-lg" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Accept Presets</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nAccept</code> aceita presets nomeados (<code class="bg-muted rounded px-1 font-mono">'images'</code>, <code class="bg-muted rounded px-1 font-mono">'spreadsheets'</code>, <code class="bg-muted rounded px-1 font-mono">'documents'</code>...) ou string manual. Label do tipo exibida no empty state.</p>
            <div class="flex min-h-40 items-start justify-start">
              <demo-file-upload-accept-presets />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Progresso</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nProgress</code> — barra de upload controlada pelo consumidor. Simulação automática ao selecionar.</p>
            <div class="flex min-h-40 items-start justify-start">
              <demo-file-upload-progress />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Icon Preview</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nPreview="icon"</code> — ícone genérico em vez de thumbnail. Ideal para documentos e planilhas.</p>
            <div class="flex min-h-40 items-start justify-start">
              <demo-file-upload-icon-preview />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">ReactiveForm</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">[formControl]</code> — integração nativa com ReactiveForms. Validação required + markAllAsTouched no submit.</p>
            <div class="flex min-h-40 items-start justify-start">
              <demo-file-upload-reactive-form />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Vídeos</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nAccept="videos"</code> — MP4, MOV, AVI. Ícone genérico, limite de 100 MB.</p>
            <div class="flex min-h-40 items-start justify-start">
              <demo-file-upload-videos />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Áudio</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nAccept="audio"</code> — MP3, WAV, AAC. Múltiplos arquivos, limite por arquivo.</p>
            <div class="flex min-h-40 items-start justify-start">
              <demo-file-upload-audio />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Arquivos compactados</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nAccept="archives"</code> — ZIP, RAR, TAR, 7Z. Limite de 500 MB.</p>
            <div class="flex min-h-40 items-start justify-start">
              <demo-file-upload-archives />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Misto / Manual</span>
            <p class="text-muted-foreground text-xs">String manual <code class="bg-muted rounded px-1 font-mono">"image/*,.pdf"</code> e preset <code class="bg-muted rounded px-1 font-mono">"all"</code> sem restrição.</p>
            <div class="flex min-h-40 items-start justify-start">
              <demo-file-upload-mixed />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Validação de dimensões</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nMinWidth</code>/<code class="bg-muted rounded px-1 font-mono">nMaxWidth</code> + altura — rejeita imagens fora da faixa com reason <code class="bg-muted rounded px-1 font-mono">'dimensions'</code>.</p>
            <div class="flex min-h-40 items-start justify-start">
              <demo-file-upload-dimensions class="w-full max-w-lg" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Desabilitado</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nDisabled</code> — dropzone e avatar sem interação, foco bloqueado.</p>
            <div class="flex min-h-40 items-start justify-start">
              <demo-file-upload-disabled class="w-full max-w-lg" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Progresso por arquivo</span>
            <p class="text-muted-foreground text-xs">Barra independente por item via <code class="bg-muted rounded px-1 font-mono">UploadFile.progress</code>. Simulação paralela ao selecionar múltiplos.</p>
            <div class="flex min-h-40 items-start justify-start">
              <demo-file-upload-progress-multiple class="w-full max-w-lg" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Erro manual</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nError</code> — mensagem controlada pelo consumidor com <code class="bg-muted rounded px-1 font-mono">role="alert"</code> e borda destructive.</p>
            <div class="flex min-h-40 items-start justify-start">
              <demo-file-upload-error class="w-full max-w-lg" />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Tamanhos (dropzone)</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nSize</code> — sm · default · lg ajustam padding e altura mínima do dropzone.</p>
            <div class="flex min-h-40 items-start justify-start">
              <demo-file-upload-sizes class="w-full max-w-lg" />
            </div>
          </div>
        </div>
      </section>

      <!-- Tooltip -->
      <section id="tooltip">
        <h2 class="border-border mb-6 border-b pb-2 text-xl font-semibold">Tooltip</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Basic</span>
            <p class="text-muted-foreground text-xs">Hover para ver o tooltip. <code class="bg-muted rounded px-1 font-mono">nTooltip="..."</code> em qualquer elemento.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-tooltip-basic />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Sides</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nTooltipSide</code> — top · right · bottom · left. Flip automático.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-tooltip-sides />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Diagonals</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">nTooltipSide</code> — top-left · top-right · bottom-left · bottom-right. Ancorado no canto.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-tooltip-diagonals />
            </div>
          </div>
          <div class="border-border flex flex-col gap-3 rounded-lg border p-6 sm:col-span-2">
            <span class="text-muted-foreground text-xs font-medium tracking-wide uppercase">Template Content</span>
            <p class="text-muted-foreground text-xs"><code class="bg-muted rounded px-1 font-mono">[nTooltip]="templateRef"</code> — conteúdo rico via <code class="bg-muted rounded px-1 font-mono">ng-template</code>.</p>
            <div class="flex min-h-16 items-center justify-center">
              <demo-tooltip-template />
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class PlaygroundPage {}

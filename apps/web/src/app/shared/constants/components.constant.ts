export interface ComponentEntry {
  name: string;
  description: string;
  loadDemo: () => Promise<unknown>;
}

export const COMPONENTS_REGISTRY: ComponentEntry[] = [
  {
    name: 'button',
    description: 'Displays a button or a component that looks like a button.',
    loadDemo: () => import('@nexus/lib/shared/components/button/demo/default').then((m) => m.ButtonDemoDefault),
  },
  {
    name: 'checkbox',
    description: 'A control that allows users to toggle between checked, unchecked, and indeterminate states.',
    loadDemo: () => import('@nexus/lib/shared/components/checkbox/demo/default').then((m) => m.CheckboxDemoDefault),
  },
];

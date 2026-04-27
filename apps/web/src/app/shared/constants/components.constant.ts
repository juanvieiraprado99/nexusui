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
];

import { primitivesRegistry } from './primitives';
import { formsRegistry } from './forms';
import { overlaysRegistry } from './overlays';
import { dataDisplayRegistry } from './data-display';
import { navigationRegistry } from './navigation';
import { feedbackRegistry } from './feedback';

export const registry = [
  ...primitivesRegistry,
  ...formsRegistry,
  ...overlaysRegistry,
  ...dataDisplayRegistry,
  ...navigationRegistry,
  ...feedbackRegistry,
];

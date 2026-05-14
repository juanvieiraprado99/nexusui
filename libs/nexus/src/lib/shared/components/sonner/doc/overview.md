# Sonner (Toast)

A toast notification component powered by the Sonner library. Displays transient feedback messages.

## Usage

Add `<n-sonner />` once to your root component, then use the `toast` function anywhere.

```typescript
import { NToasterComponent } from '@/shared/components/sonner';
import { toast } from 'sonner';

@Component({
  imports: [NToasterComponent],
  template: `<n-sonner />`
})
export class AppComponent {
  showToast() {
    toast('Event has been created');
    toast.success('Saved successfully');
    toast.error('Something went wrong');
    toast.warning('Low disk space');
    toast.info('Update available');
  }
}
```

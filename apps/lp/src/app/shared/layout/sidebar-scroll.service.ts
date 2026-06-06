import { Injectable } from '@angular/core';

/** Persists the docs sidebar scroll position across route changes.
 *  The sidebar lives inside the per-route DocsLayout, so it is destroyed and
 *  recreated on every navigation — this service survives to restore scrollTop. */
@Injectable({ providedIn: 'root' })
export class SidebarScrollService {
  private scrollTop = 0;

  save(value: number): void {
    this.scrollTop = value;
  }

  get(): number {
    return this.scrollTop;
  }
}

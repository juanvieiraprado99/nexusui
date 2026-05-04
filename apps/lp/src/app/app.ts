import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppShellComponent } from './shared/layout/app-shell.component';

@Component({
  selector: 'app-root',
  imports: [AppShellComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}

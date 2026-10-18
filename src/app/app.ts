import { Component, signal } from '@angular/core';
import { Monaco } from './monaco';

@Component({
  imports: [Monaco],
  selector: 'app-root',
  styleUrl: './app.css',
  template: `<mo-monaco></mo-monaco>`,
})
export class App { }

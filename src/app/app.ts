import { Component } from '@angular/core';
import { Monaco } from './monaco';

@Component({
  imports: [Monaco],
  selector: 'app-root',
  template: `<mo-monaco></mo-monaco>`,
})
export class App { }

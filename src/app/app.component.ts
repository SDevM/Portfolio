import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private stopwatch: any;
  private screenSave: boolean = false;
  public get screenSaverActive(): boolean {
    return this.screenSave;
  }

  constructor() {
    this.stopwatch = setTimeout(() => (this.screenSave = true), 1000 * 30);
  }

  @HostListener('document:mousemove')
  /**
   * Digest mouse movement in order to control screen saver logic
   */
  onMouseMove() {
    this.screenSave = false;
    clearTimeout(this.stopwatch);
    this.stopwatch = setTimeout(() => (this.screenSave = true), 1000 * 60);
  }
}

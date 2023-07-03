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

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: any) {
    this.screenSave = false;
    clearTimeout(this.stopwatch);
    this.stopwatch = setTimeout(() => (this.screenSave = true), 1000 * 5);
  }
}

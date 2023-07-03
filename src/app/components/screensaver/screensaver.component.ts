import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Vector } from 'src/app/interfaces/vector.interface';

@Component({
  selector: 'app-screensaver',
  templateUrl: './screensaver.component.html',
  styleUrls: ['./screensaver.component.scss'],
})
export class ScreensaverComponent implements AfterViewInit, OnDestroy {
  @Input('container') container!: HTMLDivElement;
  @Input('speed') speed!: number;
  @ViewChild('sdevm') sdevm!: ElementRef<HTMLSpanElement>;
  private yDiff: number = 1;
  private xDiff: number = 1;
  private bounds?: Vector;
  private floatingBounds?: Vector;
  private timer: any;

  ngAfterViewInit(): void {
    // console.log(this.sdevm.nativeElement.offsetLeft);
    // console.log(this.sdevm.nativeElement.offsetTop);

    /**
     * Set the bounds of the container and foating div
     */
    this.bounds = {
      x: this.container.offsetWidth,
      y: this.container.offsetHeight,
    };
    this.floatingBounds = {
      x: this.sdevm.nativeElement.offsetWidth,
      y: this.sdevm.nativeElement.offsetHeight,
    };

    /**
     * Begin looping animation at 30fps
     */
    this.timer = setInterval(this.updateLoop, 1000 / 120);
  }

  /**
   * Continuous loop responsible for animation
   */
  updateLoop = () => {
    /**
     * Logic for bounding on the x-axis
     */
    if (
      this.sdevm.nativeElement.offsetLeft + this.floatingBounds!.x / 2 >=
      this.bounds!.x
    ) {
      //Purple
      this.sdevm.nativeElement.style.color = '#ff00ff';
      this.xDiff = -1;
    } else if (
      this.sdevm.nativeElement.offsetLeft - this.floatingBounds!.x / 2 <=
      0
    ) {
      //Aqua
      this.sdevm.nativeElement.style.color = '#00ffff';
      this.xDiff = 1;
    }
    /**
     * Logic for bounding on the y-axis
     */
    if (
      this.sdevm.nativeElement.offsetTop + this.floatingBounds!.y / 2 >=
      this.bounds!.y
    ) {
      //Yellow
      this.sdevm.nativeElement.style.color = '#ffff00';
      this.yDiff = -1;
    } else if (
      this.sdevm.nativeElement.offsetTop - this.floatingBounds!.y / 2 <=
      0
    ) {
      //White
      this.sdevm.nativeElement.style.color = '#ffffff';
      this.yDiff = 1;
    }

    this.sdevm.nativeElement.style.left =
      this.sdevm.nativeElement.offsetLeft + this.xDiff * this.speed + 'px';
    this.sdevm.nativeElement.style.top =
      this.sdevm.nativeElement.offsetTop + this.yDiff * this.speed + 'px';
  };

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}

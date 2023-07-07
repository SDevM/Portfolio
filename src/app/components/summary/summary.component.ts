import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Monologue } from '../../classes/monologue';
import { Statement } from 'src/app/interfaces/statement.interface';
import { SoundPlayer } from 'src/app/helpers/soundPlayer.helper';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements AfterViewInit {
  private soundPlayer: SoundPlayer = new SoundPlayer();
  private monologue: Monologue = new Monologue([
    {
      trueVal: 'Codename: ',
      etchRate: 1000 * 0.025,
      bipCode: 0,
      postDelay: 1000 * 1,
    },
    {
      trueVal: 'Software Developer',
      etchRate: 1000 * 0.05,
      bipCode: 1,
      postDelay: 1000 * 0.5,
    },
    {
      trueVal: 'Handle: ',
      etchRate: 1000 * 0.025,
      bipCode: 0,
      postDelay: 1000 * 1,
    },
    {
      trueVal: 'Simon Dominic Maxwell',
      etchRate: 1000 * 0.05,
      bipCode: 1,
      postDelay: 1000 * 0.5,
    },
    {
      trueVal: 'Contact Code: ',
      etchRate: 1000 * 0.025,
      bipCode: 0,
      postDelay: 1000 * 0.5,
    },
    {
      trueVal: 'sdevm@outlook.com',
      etchRate: 1000 * 0.1,
      bipCode: 1,
      postDelay: 1000 * 1,
    },
    {
      trueVal: 'Coordinates: ',
      etchRate: 1000 * 0.025,
      bipCode: 0,
      postDelay: 1000 * 0.5,
    },
    {
      trueVal: '█!█@██#$█^ (encrypted)',
      etchRate: 1000 * 0.1,
      bipCode: 1,
      postDelay: 1000 * 0.5,
    },
    {
      trueVal: 'Decoding Network Traffic',
      etchRate: 1000 * 0.001,
      bipCode: -1,
      postDelay: 1000 * 1,
    },
    {
      trueVal: '...',
      etchRate: 1000 * 1,
      bipCode: 1,
      postDelay: 1000 * 0.5,
      postComplete: (index) => {
        this.monologue.replaceVal([index, index - 1], '');
        this.soundPlayer.sfx('open', 0.5);
      },
    },
  ]);

  public get sequence(): Statement[] {
    return this.monologue.typeTrail;
  }

  private stopRinging: () => void = () => {};
  ngAfterViewInit(): void {
    this.stopRinging = this.soundPlayer.ring(0, 0.1);
  }
  @ViewChild('startSpan') startSpan!: ElementRef<HTMLSpanElement>;

  start() {
    this.startSpan.nativeElement.remove();
    this.stopRinging();
    this.monologue.init();
  }
}
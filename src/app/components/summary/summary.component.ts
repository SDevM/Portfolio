import { AfterViewInit, Component } from '@angular/core';
import { Monologue } from '../classes/monologue';
import { Statement } from 'src/app/interfaces/statement.interface';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements AfterViewInit {
  private monologue: Monologue = new Monologue([
    {
      trueVal: 'Codename: Video Game/Web Developer',
      etchRate: 1000 * 0.1,
      bipCode: 1,
      postDelay: 1000 * 0.5,
    },
    {
      trueVal: 'Handle: Simon Dominic Maxwell, sdevm@outlook.com',
      etchRate: 1000 * 0.05,
      bipCode: 1,
      postDelay: 1000 * 0.4,
    },
    {
      trueVal: 'Channel Code: ',
      etchRate: 1000 * 0.1,
      bipCode: 1,
      postDelay: 1000 * 0.2,
    },
    {
      trueVal: '01EB35F',
      etchRate: 1000 * 0.3,
      bipCode: 1,
      postDelay: 1000 * 0.2,
    },
    {
      trueVal: 'Encryption Key: ',
      etchRate: 1000 * 0.1,
      bipCode: 1,
      postDelay: 1000 * 0.1,
    },
    {
      trueVal: '█!█@██#$█^',
      etchRate: 1000 * 0.3,
      bipCode: 2,
      postDelay: 1000 * 0.2,
    },
    {
      trueVal: 'Decoding Network Traffic',
      etchRate: 1000 * 0.05,
      bipCode: 1,
      postDelay: 1000 * 1,
    },
    {
      trueVal: '...',
      bipCode: 3,
      etchRate: 1000 * 0.6,
      postDelay: 1000 * 0,
    },
  ]);
  public get sequence(): Statement[] {
    return this.monologue.typeTrail;
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.monologue.init(), 1000);
  }
}

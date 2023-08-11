import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Monologue } from '../../classes/monologue';
import { Statement } from 'src/app/interfaces/statement.interface';
import { SoundPlayer } from 'src/app/helpers/soundPlayer.helper';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements AfterViewInit, OnDestroy {
  // Responsible for playing audio
  private soundPlayer: SoundPlayer = new SoundPlayer(this.configs);
  // A trigger used to begin the second phase of the summary animation
  public phase2 = false;
  // Contains the main script for the page
  private monologue: Monologue = new Monologue(
    [
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
        trueVal: 'lat:█!█@█ long:█#$█^',
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
        postDelay: 1000 * 2,
        preComplete: (index) => {
          this.monologue.replaceVal([index, index - 1], '');
          this.soundPlayer.sfx('open', 0.8);
          this.phase2 = true;
        },
      },
      {
        trueVal:
          'The target has been investigated. Initializing the report on this mysterious individual...',
        etchRate: 1000 * 0.03,
        bipCode: 0,
        postDelay: 1000 * 1,
      },
      {
        trueVal:
          "Our background checks show that he is from the island of Jamaica, a beautiful tropical country in the Caribbean. There, he fell in love with video games and decided to become a programmer, what he would consider a 'logic wizard' performing magical feats of 1s and 0s.",
        etchRate: 1000 * 0.03,
        bipCode: 1,
        postDelay: 1000 * 1,
      },
      {
        trueVal:
          'Surveillance shows he enjoys playing volleyball, reading manga and playing video games in his free time. Even though he’s a [software developer], he seems to enjoy coding in his free time as well!',
        etchRate: 1000 * 0.03,
        bipCode: 0,
        postDelay: 1000 * 1,
      },
      {
        trueVal:
          "After interrogating his acquaintances we've gained critical information on his character...",
        etchRate: 1000 * 0.03,
        bipCode: 1,
        postDelay: 1000 * 1,
      },
      {
        trueVal: ' -> Interrogation Room',
        etchRate: 1000 * 0.03,
        bipCode: 1,
        postDelay: 1000 * 1,
      },
      {
        trueVal:
          'Subject Skull: ‘Talented and fearless. One who relentlessly breaks limits and creates the extraordinary.’',
        etchRate: 1000 * 0.03,
        bipCode: 0,
        postDelay: 1000 * 1,
      },
      {
        trueVal:
          'Subject Steel: ‘A calculative soul with an eye for detail and a creed of persistence that can adapt to any change.’',
        etchRate: 1000 * 0.03,
        bipCode: 0,
        postDelay: 1000 * 1,
      },
      {
        trueVal:
          'Subject Rose: ‘A true ninja and devoted master of the ancient arts of web development. Seamlessly using prowess in stealth and precision to integrate stacks into peerless websites.’',
        etchRate: 1000 * 0.03,
        bipCode: 0,
        postDelay: 1000 * 1,
      },
      {
        trueVal:
          "Captain, given the information we've compiled, we think he would be a great asset to your team! Access their past projects and resume below.",
        etchRate: 1000 * 0.03,
        bipCode: 1,
        postDelay: 1000 * 1,
      },
      {
        trueVal: 'View Projects',
        etchRate: 1000 * 0.03,
        bipCode: 1,
        postDelay: 1000 * 1,
      },
      {
        trueVal: 'DOWNLOAD RESUME DATA',
        etchRate: 1000 * 0.03,
        bipCode: 1,
        postDelay: 1000 * 1,
      },
    ],
    this.configs
  );
  // List of skills to display on the skillwheel
  private skills: string[] = [];

  constructor(private configs: ConfigService) {}

  // Used to access the text values for display as they are updated by the monologue
  public get sequence(): Statement[] {
    return this.monologue.typeTrail;
  }

  // Prepare funcitons needed to stop looped sounds
  private stopRinging: () => void = () => {};
  private stopMusic: () => void = () => {};
  ngAfterViewInit(): void {
    this.stopRinging = this.soundPlayer.ring(0, 0.2);
    this.stopMusic = this.soundPlayer.music('suspense', 0.3);

    // Prepare scroll behavior for the skill wheel
    let prevScroll = this.skillWheel.nativeElement.scrollTop;
    let angularUnit = 360 / this.skills.length;
    this.skills.forEach((skill, i) => {});
    this.skillWheel.nativeElement.addEventListener('scroll', (event: Event) => {
      if (this.skillWheel.nativeElement.scrollTop > prevScroll) {
      }
    });
  }
  // Children of the component that appear in html and need to be dynamically modified
  @ViewChild('startSpan') startSpan!: ElementRef<HTMLSpanElement>;
  @ViewChild('skillWheel') skillWheel!: ElementRef<HTMLDivElement>;

  /**
   * Begins the summary
   */
  start() {
    this.startSpan.nativeElement.remove();
    this.stopRinging();
    this.stopRinging = () => {};
    this.monologue.init();
  }

  ngOnDestroy(): void {
    this.stopRinging();
    this.stopMusic();
    this.monologue.halt();
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Monologue } from '../../classes/monologue';
import { Statement } from 'src/app/interfaces/statement.interface';
import { SoundPlayer } from 'src/app/helpers/soundPlayer.helper';
import { ConfigService } from 'src/app/services/config.service';
import { gsap } from 'gsap';
import { Throttle } from 'src/app/classes/throttle';
import { CustomEase } from 'gsap/all';

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
          this.skillWheel.nativeElement.style.opacity = '1';
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
  private skills: string[] = [
    'HTML/CSS/Js',
    'TypeScript(Angular)',
    'Node.js(Express)',
    'Python',
    'Flutter (Android)',
    'Unity 2D',
    'Database Management',
    'Project Management',
    'Team Leadership',
  ];

  constructor(private configs: ConfigService) {
    gsap.registerPlugin(CustomEase);
  }

  // Used to access the text values for display as they are updated by the monologue
  public get sequence(): Statement[] {
    return this.monologue.typeTrail;
  }

  // Prepare funcitons needed to stop looped sounds
  private stopRinging: () => void = () => {};
  private stopMusic: () => void = () => {};
  private scrollThrottle?: Throttle;

  ngAfterViewInit(): void {
    this.stopRinging = this.soundPlayer.ring(0, 0.2);
    this.stopMusic = this.soundPlayer.music('suspense', 0.3);
    this.configSkillWheel();
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

  configSkillBubble(div: HTMLDivElement, span: HTMLSpanElement, skill: string) {
    div.appendChild(span);
    span.innerText = skill;
    span.style.position = 'absolute';
    span.style.padding = '0.5rem 1rem';
    span.style.border = 'solid 0.25rem white';
    span.style.borderRadius = '0.5rem';
    span.style.translate = '0 -50%';
    this.skillWheel.nativeElement.appendChild(div);
    div.style.position = 'absolute';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.width = 'max-content';
    div.style.color = 'white';
  }

  configSkillWheel() {
    // Prepare scroll behavior for the skill wheel
    let angularUnit = 360 / this.skills.length;
    let angle = 0;

    this.scrollThrottle = new Throttle(500, (params: any[]) => {
      angle += params[0] * angularUnit;
      var tween = gsap.to(this.skillWheel.nativeElement, {
        rotation: angle,
        duration: 0.5,
        ease: CustomEase.create(
          'custom',
          'M0,0 C0.14,0 0.426,0.401 0.436,0.414 0.492,0.484 0.719,0.981 0.726,0.998 0.788,0.914 0.84,0.936 0.859,0.95 0.878,0.964 0.897,0.985 0.911,0.998 0.922,0.994 0.939,0.984 0.954,0.984 0.969,0.984 1,1 1,1 '
        ),
      });
      console.log(tween, params[0] * angularUnit);
    });

    this.skillWheel.nativeElement.innerHTML = '';
    this.skills.forEach((skill, i) => {
      let skillCartesian = document.createElement('span');
      let skillElement = document.createElement('div');
      this.configSkillBubble(skillElement, skillCartesian, skill);

      // Rotate the skill elements and translate them in order to create a circle
      gsap.set(skillElement, {
        rotation: -i * angularUnit,
      });
      gsap.set(skillCartesian, {
        translateX: (this.skillWheel.nativeElement.offsetWidth / 2) * -1,
      });
    });
    this.skillWheel.nativeElement.onscroll = () => {};
    this.skillWheel.nativeElement.addEventListener(
      'wheel',
      (event: WheelEvent) => {
        this.scrollThrottle?.tick([event.deltaY / 100]);
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.configSkillWheel();
  }

  ngOnDestroy(): void {
    this.stopRinging();
    this.stopMusic();
    this.monologue.halt();
  }
}

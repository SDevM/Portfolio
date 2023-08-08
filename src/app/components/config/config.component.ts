import { Component } from '@angular/core';
import { SoundPlayer } from 'src/app/helpers/soundPlayer.helper';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent {
  private soundPlayer: SoundPlayer = new SoundPlayer(this.configs);
  constructor(public configs: ConfigService) {}

  music() {
    this.configs.music.update((val) => !val);
    if (this.configs.music()) this.soundPlayer.sfx('yes', 0.5);
    else this.soundPlayer.sfx('no', 0.5);
  }
  sfx() {
    this.configs.sfx.update((val) => !val);

    if (this.configs.sfx()) this.soundPlayer.sfx('yes', 0.5);
    else this.soundPlayer.sfx('no', 0.8);
  }
  type() {
    this.configs.animatedText.update((val) => !val);
    if (this.configs.animatedText()) this.soundPlayer.sfx('yes', 0.5);
    else this.soundPlayer.sfx('no', 0.8);
  }
  continue() {
    this.soundPlayer.sfx('open', 0.5);
  }
}

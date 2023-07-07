import { Component } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent {
  constructor(public configs: ConfigService) {}

  music() {
    this.configs.music.update((val) => !val);
  }
  sfx() {
    this.configs.sfx.update((val) => !val);
  }
  type() {
    this.configs.animatedText.update((val) => !val);
  }
}

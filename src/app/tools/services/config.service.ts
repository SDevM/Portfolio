import { Injectable, WritableSignal, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  //Controls the toggling of music audio
  public music: WritableSignal<boolean> = signal(true);
  //Controls the toggling sfx audio
  public sfx: WritableSignal<boolean> = signal(true);
  //Controls the toggling of text animation
  public animatedText: WritableSignal<boolean> = signal(true);

  constructor() {
    if (localStorage.getItem('configs')) {
      let configs = JSON.parse(localStorage.getItem('configs')!);

      this.music.set(configs.music);
      this.sfx.set(configs.sfx);
      this.animatedText.set(configs.animatedText);
    }
    effect(() => {
      let configs = JSON.stringify({
        music: this.music(),
        sfx: this.sfx(),
        animatedText: this.animatedText(),
      });
      localStorage.setItem('configs', configs);
    });
  }
}

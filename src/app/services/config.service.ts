import { Injectable, WritableSignal, signal } from '@angular/core';

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
}

export class Throttle {
  private cooldown: boolean = false;

  constructor(private ms: number, private callback: (params: any[]) => void) {}

  tick(params: any[]) {
    if (this.cooldown) return;
    console.log('Tick');
    this.cooldown = true;
    setTimeout(() => (this.cooldown = false), this.ms);
    try {
      this.callback(params);
    } catch (error) {
      console.error(error);
    }
  }
}

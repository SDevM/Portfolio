export class SoundPlayer {
  private bips: string[] = ['assets/sfx/bip1.wav', 'assets/sfx/bip2.wav'];
  bip(index: number, volume: number) {
    if (index != -1) this.play(this.bips[index], volume);
  }

  private rings: string[] = ['assets/sfx/ring.wav'];
  ring(index: number, volume: number): () => void {
    return this.playLoop(this.rings[index], volume);
  }

  private sfxList: Map<string, string> = new Map([
    ['open', 'assets/sfx/Unlock.mp3'],
  ]);
  sfx(name: string, volume: number) {
    if (this.sfxList.has(name)) this.play(this.sfxList.get(name)!, volume);
  }

  /**
   * Plays a sound once
   * @param url Url to the sound asset
   */
  private play(url: string, volume: number) {
    //Create a new audio element
    const audioElement = document.createElement('audio');
    //Set the audio element's source to the blob URL
    audioElement.src = url;
    audioElement.volume = volume;
    //Play the audio and subsequently dispose of the element
    audioElement.play().then(() => {
      audioElement.remove();
    });
  }

  /**
   * Plays a sound on a loop
   * @param url Url to the sound asset
   * @returns Function to stop looping sound
   */
  private playLoop(url: string, volume: number): () => void {
    //Create a new audio element
    const audioElement = document.createElement('audio');
    //Set the audio element's source to the blob URL
    audioElement.src = url;
    audioElement.volume = volume;
    audioElement.loop = true;
    //Play the audio
    audioElement.play();
    //Return function responsible for stopping audio
    return () => {
      audioElement.pause();
      audioElement.remove();
    };
  }
}

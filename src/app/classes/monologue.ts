import { SoundPlayer } from 'src/app/helpers/soundPlayer.helper';
import { Statement } from 'src/app/interfaces/statement.interface';
import { asyncTools } from 'src/app/tools/async.toolset';
import { ConfigService } from '../services/config.service';

/**
 * Abstracts management of a type-animated sequence
 */
export class Monologue {
  private complete = false;
  public get isComplete(): boolean {
    return this.complete;
  }

  private sequence: Statement[] = [];
  public get typeTrail(): Statement[] {
    return this.sequence;
  }

  private soundPlayer: SoundPlayer = new SoundPlayer(this.configs);

  /**
   * Create a new Monologue, an initial sequence may be provided
   * @param digest Initial sequence of statement, more can be added using addStatement
   */
  constructor(private digest?: Statement[], private configs?: ConfigService) {
    if (digest) this.sequence = digest;
  }

  /**
   * Adds a new statement to the array to be managed
   * @param trueVal The final value of the statement once type-animation is complete
   * @param etchRate How quickly in ms each letter is rendered
   * @param postDelay How long to pause after arriving at the end of the type-animation before starting the next
   * @param complete A function to perform once this statement is fully type-animated
   * @returns The index of the newly added statement
   */
  addStatement(
    trueVal: string,
    etchRate: number,
    bipCode: number,
    postDelay: number,
    preComplete?: (index: number) => void,
    postComplete?: (index: number) => void
  ): number {
    let displayVal = '';
    this.sequence.push({
      trueVal,
      displayVal,
      etchRate,
      bipCode,
      postDelay,
      preComplete,
      postComplete,
    });
    return this.sequence.length - 1;
  }

  replaceVal(indexes: number[], replace: string) {
    indexes.forEach((index) => (this.sequence[index].displayVal = replace));
  }

  /**
   * Executes the type-animation sequence
   */
  async init() {
    this.complete = false;
    if (this.configs && this.configs.animatedText() == false) this.skip();
    /**
     * Iterate the statement array if animated text is on
     */ else
      for (let i = 0; i < this.sequence.length; i++) {
        const statement = this.sequence[i];
        //Iterate the final value of the type-animation, each time assigning an updated portion to the display value
        for (let a = 0; a < statement.trueVal.length; a++) {
          if (this.complete) return;
          statement.displayVal =
            statement.trueVal.substring(0, a + 1) +
            (statement.trueVal.length > a + 1 ? '_' : '');
          //Play sound based on bipCode
          this.soundPlayer.bip(statement.bipCode, 0.2);
          //Delay according the the etchrate before the next update
          await asyncTools.delay(statement.etchRate);
        }
        //If there is a complete function, trigger it once the final value is reached
        if (statement.preComplete) statement.preComplete(i);
        //Delay according to the postdelay before the next statement begins
        await asyncTools.delay(statement.postDelay);
        //If there is a complete function, trigger it once the final value is reached
        if (statement.postComplete) statement.postComplete(i);
      }
    //Set monologue status to complete once the sequence is fully iterated
    this.complete = true;
    //Initiate false cursor animation
    let flip = true;
    let buffer = this.sequence[this.sequence.length - 1].displayVal;
    setInterval(() => {
      this.sequence[this.sequence.length - 1].displayVal =
        buffer + (flip ? '_' : '');
      flip = !flip;
    }, 500);
  }

  /**
   * Skips the animation process
   */
  skip() {
    this.sequence.forEach((statement, i) => {
      statement.displayVal = statement.trueVal;
      if (statement.preComplete) statement.preComplete(i);
      if (statement.postComplete) statement.postComplete(i);
    });
  }

  /**
   * Forcefully stops functionality
   */
  halt() {
    this.complete = true;
  }
}

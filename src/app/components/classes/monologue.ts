import { Statement } from 'src/app/interfaces/statement.interface';
import { asyncTools } from 'src/app/tools/async.toolset';

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

  constructor() {}

  /**
   * Adds a new statement to the array to be managed
   * @param trueVal The final value of the statement once type-animation is complete
   * @param displayVal The currently displayed stage of the type-animation
   * @param etchRate How quickly in ms each letter is rendered
   * @param postDelay How long to pause after arriving at the end of the type-animation before starting the next
   * @param complete A function to perform once this statement is fully type-animated
   * @returns The index of the newly added statement
   */
  addStatement(
    trueVal: string,
    displayVal: string,
    etchRate: number,
    postDelay: number,
    complete?: (statement: Statement) => {}
  ): number {
    this.sequence.push({ trueVal, displayVal, etchRate, postDelay, complete });
    return this.sequence.length - 1;
  }

  /**
   * Executes the type-animation sequence
   */
  async init() {
    /**
     * Iterate the statement array
     */
    for (let i = 0; i < this.sequence.length; i++) {
      const statement = this.sequence[i];
      //Iterate the final value of the type-animation, each time assinging an updated portion to the display value
      for (let a = 0; a < statement.trueVal.length; a++) {
        statement.displayVal = statement.trueVal.substring(0, a + 1);
        //Delay according the the etchrate before the next update
        await asyncTools.delay(statement.etchRate);
      }
      //If there is a complete function, trigger it once the final value is reached
      if (statement.complete) statement.complete(statement);
      //Delay according to the postdelay before the next statement begins
      await asyncTools.delay(statement.postDelay);
    }
    //Set monologue status to complete once the sequence is fully iterated
    this.complete = true;
  }
}

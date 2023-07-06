/**
 * Object that serves as a component of the Monogolue class, used to manage type-animated content
 */
export interface Statement {
  trueVal: string;
  displayVal?: string;
  bipCode: number;
  etchRate: number;
  postDelay: number;
  complete?: (statement: Statement) => {};
}

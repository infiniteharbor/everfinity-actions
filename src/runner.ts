



export interface ActionRunnerSupport<T> {
  findRecordById(id: string): Optional<T>;
}

export default class ActionRunner<T> {

  static UNEXPECTED_ERROR: string = "UNEXPECTED ERROR!";
  static RESULT_MSG_FORMAT: string = "Operation Complete | OK: {} | WARN: {} | FAIL: {}";

  

} 
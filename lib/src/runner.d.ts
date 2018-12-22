import { Optional } from "./option";
export interface ActionRunnerSupport<T> {
    findRecordById(id: string): Optional<T>;
}
export default class ActionRunner<T> {
    static UNEXPECTED_ERROR: string;
    static RESULT_MSG_FORMAT: string;
}

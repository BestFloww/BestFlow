/* istanbul ignore file */
import { InputBoundaryInterface } from "./input-boundary-interface.js";
/**
 * @class Interface for flag
 */
export class SetFlagInterface extends InputBoundaryInterface{
    /**
    *  @param {Object} filter object passed to mangoose to find the question
    *  @param {Object} status the flag status
    * */
        static async setFlagStatus(filter = {}, status = {}) {
        throw new Error("not implemented");
    }
}
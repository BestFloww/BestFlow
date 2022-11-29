/* istanbul ignore file */
import { InputBoundaryInterface } from "./input-boundary-interface.js";
/**
 * @class Interface for star
 */
export class SetStarInterface extends InputBoundaryInterface{
     /**
     *  @param {Object} filter object passed to mangoose to find the question
     *  @param {Object} status the star status
     * */
      static async setStarStatus(filter = {}, status = {}) {
        throw new Error("not implemented");
    }
}
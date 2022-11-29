/* istanbul ignore file */
/**
 * Abstract Class InputBoundaryInterface.
 *
 * @class Input boundary
 * Inherited by all other input interfaces
 */
export class InputBoundaryInterface{
    static isInputBoundaryInterface = true;
    /**
     * @param {Object} dao data access object
     */
     static async setIntentDao(dao){
        throw new Error("not implemented");
    }
}
/* istanbul ignore file */
import { InputBoundaryInterface } from "./input-boundary-interface.js";
/**
 * @class Interface for get request
 */
export class GetTranscriptInterface extends InputBoundaryInterface{
    /**
     * @param {Object} query find specific intent(s)
     */
    static async getTranscript(query = {}){
        throw new Error("not implemented");
    }
}
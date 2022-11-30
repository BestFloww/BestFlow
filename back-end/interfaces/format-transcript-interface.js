/* istanbul ignore file */
import { InputBoundaryInterface } from "./input-boundary-interface.js";
/**
 * @class Interface for formatting (post requests)
 */
export class FormatTranscriptInterface extends InputBoundaryInterface{
    /**
     *  @param {Object} rawTranscript raw transcript uploaded by user
     *  @return {Object} properly formatted data from the transcript
     * */
     static async formatTranscript(rawTranscript = {}) {
        throw new Error("not implemented");
    }
}
/* istanbul ignore file */
/**
 * Abstract Class TranscriptDataInterface.
 *
 * @class Interface
 */
export class InputBoundaryInterface {
    static isInputBoundaryInterface = true;

    /**
     *  @param {Object} rawTranscript raw transcript uploaded by user
     *  @return {Object} properly formatted data from the transcript
     * */
    async formatTranscript(rawTranscript = {}) {
        throw new Error("not implemented");
    }
}
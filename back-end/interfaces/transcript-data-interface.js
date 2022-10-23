/* istanbul ignore file */
/**
 * Abstract Class TranscriptDataInterface.
 *
 * @class Interface
 */
 export class TranscriptDataInterface {
    static isTranscriptDataInterface = true;

    /**
     *  @param {Object} rawTranscript raw transcript uploaded by user
     *  @return {Object} properly formatted data from the transcript
     * */
    static async formatTranscript(rawTranscript = {}) {
      throw new Error("not implemented");
    }
 }
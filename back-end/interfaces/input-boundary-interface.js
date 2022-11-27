/* istanbul ignore file */
/**
 * Abstract Class InputBoundaryInterface.
 *
 * @class Interface
 */
export class InputBoundaryInterface{
    static isInputBoundaryInterface = true;

    /**
     * @param {Object} query find specific intent(s)
     */
    static async getTranscript(query = {}){
        throw new Error("not implemented");
    }

    /**
     *  @param {Object} rawTranscript raw transcript uploaded by user
     *  @return {Object} properly formatted data from the transcript
     * */
    static async formatTranscript(rawTranscript = {}) {
        throw new Error("not implemented");
    }

    /**
     *  @param {Object} filter filters to find the question
     *  @param {Object} status the star status
     * */
     static async setStarStatus(filter = {}, status = {}) {
        throw new Error("not implemented");
    }
}
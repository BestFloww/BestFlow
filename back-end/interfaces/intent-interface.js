/**
 * Abstract Class IntentInterface.
 *
 * @class Interface
 */
 export class IntentInterface {
  
      /**
     *  @param {Object} query find specific intent(s)
     *  @return {Query} the queried items
     * */
    static async getIntent(query = {}) {
      throw new Error("not implemented");
    }
    
    /**
     *  @param {Array} content list of intents to post
     *  @return {Object} Status of the post request
     * */
    static async postIntents(query = {}) {
      throw new Error("not implemented");
    }

    /**
     *  @param {Number} intentID the id of the intent that should be changed 
     *  @param {Object} newContent the new content for the intent
     *  @return {Object} Status of the put request
     * */
    static async putIntent(query = {}) {
      throw new Error("not implemented");
    }
    
    /**
     *  @param {Intent} intent 
     *  @return {Object} Status of the request
     * */
    static async saveIntent(query = {}) {
      throw new Error("not implemented");
    }
  }
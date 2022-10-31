/* istanbul ignore file */
/**
 * Abstract Class IntentInterface.
 *
 * @class Interface
 */
 import { EventEmitter } from 'node:events'

 export class IntentInterface extends EventEmitter{

    /**
     *  @param {Object} query find specific intent(s)
     *  @emit {Query} the queried items
     * */

    async getIntent(query = {}) {
      throw new Error("not implemented");
    }
    
    /**
     *  @param {Array} content list of intents to post
     *  @emit {Object} Status of the post request
     * */
    async postIntents(query = {}) {
      throw new Error("not implemented");
    }

    /**
     *  @param {Number} intentID the id of the intent that should be changed 
     *  @param {Object} newContent the new content for the intent
     *  @emit {Object} Status of the put request
     * */
    async putIntent(query = {}) {
      throw new Error("not implemented");
    }
    
    /**
     *  @param {Intent} intent 
     *  @emit {Object} Status of the request
     * */
    async saveIntent(query = {}) {
      throw new Error("not implemented");
    }
  }
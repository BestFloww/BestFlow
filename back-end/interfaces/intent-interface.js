import { EventEmitter } from 'node:events'
/* istanbul ignore file */
/**
 * Abstract Class IntentInterface.
 *
 * @class Interface
 */
 export class IntentInterface extends EventEmitter{
    isIntentInterface = true;
    /**
     *  @param {Object} query find specific intent(s)
     * */
    async getIntent(query = {}) {
      throw new Error("not implemented");
    }
    
    /**
     *  @param {Array} content list of intents to post
     * */
    async postIntents(query = {}) {
      throw new Error("not implemented");
    }

    /**
     *  @param {Number} intentID the id of the intent that should be changed 
     *  @param {Object} newContent the new content for the intent
     * */
    async putIntent(query = {}) {
      throw new Error("not implemented");
    }
    
    /**
     *  @param {Intent} intent 
     * */
    async saveIntent(query = {}) {
      throw new Error("not implemented");
    }
  }
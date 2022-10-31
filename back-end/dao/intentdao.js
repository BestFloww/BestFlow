import { Intent } from "../schema/intent-schema.js";
import {IntentInterface} from "../interfaces/intent-interface.js";

export default class IntentDao extends IntentInterface{
  /**
   *  @param {Object} query find specific intent(s)
   * */

  async getIntent(query = {}) {
    try {
      const intentList = await Intent.find(query).exec();
      this.emit("getIntent", intentList);
    } catch (e) {
      this.emit("getIntent",{status: 500, error: e});
    }
  }
  
  async postIntents(content) {
    try {
      for (const intent of content) {
        const newIntent = new Intent(intent);
        await newIntent.save();
      }
      this.emit("postIntent",{status: 201, message: "success"});
    } catch (e) {
      this.emit("postIntent",{status: 500, error: e});
    }
  }

  async putIntent(intentID, newContent) {
    try {
      Intent.findByIdAndUpdate(intentID, newContent);
      this.emit("putIntent",{status: 200});
    } catch (e) {
      this.emit("putIntent",{status: 500, error: e});
    }
  }

  async saveIntent(intent) {
    try {
      await intent.save();
      this.emit("saveIntent",{status: 200});
    } catch (e) {
      this.emit("saveIntent",{status: 500, error: e});
    }
  }
}
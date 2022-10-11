import { Query } from "mongoose";
import { Intent } from "../schema/intent-schema.js";
import {IntentInterface} from "../interfaces/intent-interface.js";

export default class intentDao extends IntentInterface{
  /**
   *  @param {Object} query find specific intent(s)
   *  @return {Query} the queried items
   * */
  static async getIntent(query = {}) {
    try {
      const intentList = await Intent.find(query).exec();
      return intentList;
    } catch (e) {
      return {error: e};
    }
  }
  
  static async postIntents(content) {
    try {
      const intentList = [];
      for (const intent of content) {
        const newIntent = new Intent(intent);
        intentList.push(newIntent.save((err) => {throw err}));
      }
      Promise.all(intentList);
      return { status: 200 };
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async putIntent(intentID, newContent) {
    try {
      Intent.findByIdAndUpdate(intentID, newContent);
      return { status: 200 };
    } catch (e) {
      return {error: e};
    }
  }

  static async saveIntent(intent) {
    try {
      await intent.save();
      return { status: 200 };
    } catch (e) {
      return {error: e};
    }
  }
}
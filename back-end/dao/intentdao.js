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
  
  async postIntents(content, override) {
    try {
      const checkedIds = new Set();
      for (const intent of content) {

        // Checks if the project ID is already present without an override.
        if (!override && !checkedIds.has(intent.project_id)) {
          const isPresent = await this.isProjectIdPresent(intent.project_id)
          // double nested so it uses a promise correctly
          if (isPresent) {
            throw new Error("Project ID is already present. Do you want to override?");
          }
        }
        const newIntent = new Intent(intent);
        await newIntent.save();
        checkedIds.add(intent.project_id);
      }
      this.emit("postIntent",{status: 201, message: "success", projectIds: Array.from(checkedIds)});
    } catch (e) {
      this.emit("postIntent",{status: 500, error: e.message});
    }
  }

  async isProjectIdPresent(id) {
    const query = await Intent.find({project_id: id});
    return query.length !== 0;
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
import { Intent } from "../schema/intent-schema.js";
import {IntentInterface} from "../interfaces/intent-interface.js";

export default class IntentDao extends IntentInterface{
  /**
   *  @param {Object} query find specific intent(s) and emit it
   * */
  async getIntent(query = {}) {
    try {
      const intentList = await Intent.find(query).exec();
      this.emit("getIntent", intentList);
    } catch (e) {
      this.emit("getIntent",{status: 500, error: e});
    }
  }
  /**
   *  @param {Object} query find specific intent(s) and return it
   *  @return {Array} return list of intents
   * */
  async getImmediateIntent(query = {}) {
    try {
      const intentList = await Intent.find(query).exec();
      return intentList;
    } catch (e) {
      this.emit("getIntent",{status: 500, error: e});
    }
  }
  
  async postIntents(content, override) {
    try {
      const checkedIds = new Set();
      
      if (override) {
        // Delete previous intents with same project id
        for (const override_intent of content){
          const projectId = override_intent.project_id;
          const present = this.isProjectIdPresent(projectId);
          if (present) {
            await Intent.deleteMany({project_id: projectId});
          }
        }
      }
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

  async putIntent(filter, newContent) {
    try {
      await Intent.findOneAndUpdate(filter, newContent);
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
import { Test } from "../schema/test-schema.js";

export default class testDAO {

  static async getTestData({query} = {}) {
    try {
      const thingsList = await Test.find(query);
      return {thingsList};
    } catch (e) {
      return {error: e};
    }
  }

  static async postTestData(content) {
    try {
      const newData = new Test({text: content});
      await newData.save(
        (err) => {throw err}
      );
      return { status: 200 };
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }
}
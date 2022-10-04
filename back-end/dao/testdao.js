import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId;

let things;
let new_things;

export default class testDAO {
  static async injectDB(conn) {
    if (things) {
      return
    }
    try {
      things = await conn.db(process.env.TESTDATA_NS).collection("Test")
      new_things = await conn.db(process.env.TESTDATA_NS).collection("new_Test")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in testDAO: ${e}`,
      )
    }
  }

  static async getTestData({
    page = 0,
    thingsPerPage = 20,
  } = {}) {
    let query

    let cursor
    
    try {
      query = {};
      cursor = await things
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { thingsList: [], totalNumThings: 0 }
    }

    const displayCursor = cursor.limit(thingsPerPage).skip(thingsPerPage * page)

    try {
      const thingsList = await displayCursor.toArray()
      const totalNumThings = await things.countDocuments(query)

      return { thingsList, totalNumThings }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { thingsList: [], totalNumThings: 0 }
    }
  }

  static async postTestData(id, content) {
    try {
      const testDoc = { 
        _id: ObjectId(id),
        text: content,
      }

      return await new_things.insertOne(testDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }
}
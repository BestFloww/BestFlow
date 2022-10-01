import mongodb from "mongodb"
let things;

export default class testDAO {
  static async injectDB(conn) {
    if (things) {
      return
    }
    try {
      things = await conn.db(process.env.TESTDATA_NS).collection("restaurants")
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
      cursor = await things
        .find(query)
        console.log(cursor)
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
}
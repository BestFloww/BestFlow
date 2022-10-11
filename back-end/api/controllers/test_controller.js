import testDAO from "../../dao/testdao.js";


export default class TestController {
    static async getTest(req, res, next) {
    
        const { thingsList} = await testDAO.getTestData({});
    
        let response = {
          things: thingsList,
          filters: {},
          total_results: totalNumThings,
        };
        res.json(response);
      }
      
      static async postTest(req, res, next) {
        try {
          const content = req.body.text
    
          const TestResponse = await testDAO.postTestData(content)
          res.json({ status: "success" })
        } catch (e) {
          res.status(500).json({ error: e.message })
          res.status(500).json({ error: "new"})
        }
      }
}
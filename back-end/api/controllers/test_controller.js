import testDAO from "../../dao/testdao.js";


export default class TestController {
    static async getTest(req, res, next) {
        const thingsPerPage = req.query.thingsPerPage ? parseInt(req.query.thingsPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    
        const { thingsList, totalNumThings } = await testDAO.getTestData({
          page,
          thingsPerPage,
        });
    
        let response = {
          things: thingsList,
          page: page,
          filters: {},
          entries_per_page: thingsPerPage,
          total_results: totalNumThings,
        };
        res.json(response);
      }
      
      static async postTest(req, res, next) {
        try {
          const id = req.body._id
          const content = req.body.text
    
          const TestResponse = await testDAO.postTestData(
            id,
            content,
          )
          res.json({ status: "success" })
        } catch (e) {
          res.status(500).json({ error: e.message })
          res.status(500).json({ error: "new"})
        }
      }
}
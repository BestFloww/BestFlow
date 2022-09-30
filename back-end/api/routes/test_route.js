import express from "express";

const router = express.Router();

export default class TestController {
    static async getTest(req, res, next) {
        const thingsPerPage = req.query.thingsPerPage ? parseInt(req.query.thingsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0
    
        const { thingList, totalThings } = await testDAO.getTestData({
          filters,
          page,
          thingsPerPage,
        })
    
        let response = {
          restaurants: thingList,
          page: page,
          filters: {},
          entries_per_page: thingsPerPage,
          total_results: totalThings,
        }
        res.json(response)
      }
}
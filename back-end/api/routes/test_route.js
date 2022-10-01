import express from "express";
import TestController from "../controllers/test_controller.js";

const router = express.Router();

router.route("/").get(TestController.getTest);

export default router;


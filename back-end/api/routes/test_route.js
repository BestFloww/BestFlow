import express from "express";
import TestController from "../controllers/test_controller.js";

const router = express.Router();

router.route("/").get(TestController.getTest);

router.route("/").post(TestController.postTest);

export default router;
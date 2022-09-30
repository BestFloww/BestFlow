import express from "express";
// import TestController from "../controllers/test_controller.js";

const router = express.Router();

router.route("/").get((req, res) => res.send("hello world"));

export default router;


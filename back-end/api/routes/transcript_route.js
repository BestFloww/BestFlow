import express from "express";
import TranscriptController from "../controllers/transcript_controller.js";
import intentDao from "../dao/intentdao.js";

const router = express.Router();

TranscriptController.setIntentDao(intentDao);

router.route("/").get(TranscriptController.getTranscript);

router.route("/").post(TranscriptController.postTranscript);

export default router;
import express from "express";
import TranscriptController from "../controllers/transcript_controller.js";
import intentDao from "../../dao/intentdao.js";
import TranscriptFormatter from "../../helpers/transcript_data_formatter.js";

const router = express.Router();

router.route("/").get((req, res, next) => {
    TranscriptController.setIntentDao(intentDao)
    TranscriptController.setTranscriptFormatter(TranscriptFormatter)
    TranscriptController.get(req, res, next)
})

router.route("/").post((req, res, next) => {
    TranscriptController.setIntentDao(intentDao)
    TranscriptController.setTranscriptFormatter(TranscriptFormatter)
    TranscriptController.post(req, res, next)
})

export default router;
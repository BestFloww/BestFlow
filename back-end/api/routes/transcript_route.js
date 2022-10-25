import express from "express";
import TranscriptController from "../controllers/transcript_controller.js";
import intentDao from "../../dao/intentdao.js";
import TranscriptIntentFormatter from "../../helpers/transcript_upload_interactor.js";

const router = express.Router();

router.route("/").get((req, res, next) => {
    TranscriptIntentFormatter.setIntentDao(intentDao)
    TranscriptController.setTranscriptFormatter(TranscriptIntentFormatter)
    TranscriptController.get(req, res, next)
})

router.route("/").post((req, res, next) => {
    TranscriptIntentFormatter.setIntentDao(intentDao)
    TranscriptController.setTranscriptFormatter(TranscriptIntentFormatter)
    TranscriptController.post(req, res, next)
})

export default router;
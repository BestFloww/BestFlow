import express from "express";
import TranscriptController from "../controllers/transcript_controller.js";
import intentDao from "../../dao/intentdao.js";
import TranscriptInteractor from "../../helpers/transcript_interactor.js";

const router = express.Router();

router.route("/").get((req, res, next) => {
    TranscriptInteractor.setIntentDao(intentDao)
    TranscriptController.setTranscriptInteractor(TranscriptInteractor)
    TranscriptController.getTranscript(req, res, next)
})

router.route("/").post((req, res, next) => {
    TranscriptInteractor.setIntentDao(intentDao)
    TranscriptController.setTranscriptInteractor(TranscriptInteractor)
    TranscriptController.postTranscript(req, res, next)
})

export default router;
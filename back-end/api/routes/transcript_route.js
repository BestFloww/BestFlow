import express from "express";
import TranscriptController from "../controllers/transcript_controller.js";
import IntentDao from "../../dao/intentdao.js";
import TranscriptInteractor from "../../helpers/transcript_interactor.js";
import OutputDataBoundary from "../../helpers/output_data_boundary.js";

const router = express.Router();

router.route("/").get((req, res, next) => {
    const dao = new IntentDao();
    TranscriptInteractor.setIntentDao(dao);
    TranscriptController.setTranscriptInteractor(TranscriptInteractor);
    TranscriptController.setOutputBoundary(OutputDataBoundary);
    TranscriptController.getAnalyzedTranscript(req, res, next);
})

router.route("/").post((req, res, next) => {
    const dao = new IntentDao();
    TranscriptInteractor.setIntentDao(dao);
    TranscriptController.setTranscriptInteractor(TranscriptInteractor);
    TranscriptController.setOutputBoundary(OutputDataBoundary);
    TranscriptController.postTranscript(req, res, next);
})

export default router;
import express from "express";
import StarController from "../controllers/star_controller.js";
import IntentDao from "../../dao/intentdao.js";
import GetTranscriptInteractor from "../../helpers/get_transcript_interactor.js";
import PostTranscriptInteractor from "../../helpers/post_transcript_interactor.js";
import OutputDataBoundary from "../../helpers/output_data_boundary.js";

const router = express.Router();

router.route("/").get((req, res, next) => {
    const dao = new IntentDao();
    GetTranscriptInteractor.setIntentDao(dao);
    StarController.setTranscriptInteractor(GetTranscriptInteractor);
    StarController.setOutputBoundary(OutputDataBoundary);
    StarController.getAnalyzedTranscript(req, res, next);
});

router.route("/").post((req, res, next) => {
    const dao = new IntentDao();
    PostTranscriptInteractor.setIntentDao(dao);
    StarController.setTranscriptInteractor(PostTranscriptInteractor);
    StarController.setOutputBoundary(OutputDataBoundary);
    StarController.postTranscript(req, res, next);
});

export default router;
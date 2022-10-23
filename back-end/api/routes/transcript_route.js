import express from "express";
import TranscriptController from "../controllers/transcript_controller.js";
import intentDao from "../../dao/intentdao.js";
import TranscriptFormatter from "../../helpers/transcript_data_formatter.js";

const router = express.Router();

TranscriptController.setIntentDao(intentDao);
TranscriptController.setTranscriptFormatter(TranscriptFormatter);

getTranscript((req, res, next) => {
    TranscriptController.get(req, res, next);
})

postTranscript((req, res, next) => {
    TranscriptController.post(req, res, next);
})

router.route("/").get(TranscriptController.getTranscript);

router.route("/").post(TranscriptController.postTranscript);

export default router;
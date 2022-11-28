import express from "express";
import FlagController from "../controllers/flag_controller.js";
import IntentDao from "../../dao/intentdao.js";
import PutFlagInteractor from "../../helpers/put_flag_interactor.js";
import OutputDataBoundary from "../../helpers/output_data_boundary.js";

const router = express.Router();

router.route("/").put((req, res, next) => {
    const dao = new IntentDao();
    PutFlagInteractor.setIntentDao(dao);
    FlagController.setTranscriptInteractor(PutFlagInteractor);
    FlagController.setOutputBoundary(OutputDataBoundary);
    FlagController.putFlag(req, res, next);
});

export default router;
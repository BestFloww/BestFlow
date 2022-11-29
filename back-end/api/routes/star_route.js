import express from "express";
import StarController from "../controllers/star_controller.js";
import IntentDao from "../../dao/intentdao.js";
import PutStarInteractor from "../../helpers/put/put_star_interactor.js";
import OutputDataBoundary from "../../helpers/general/output_data_boundary.js";

const router = express.Router();

router.route("/").put((req, res, next) => {
    const dao = new IntentDao();
    PutStarInteractor.setIntentDao(dao);
    StarController.setTranscriptInteractor(PutStarInteractor);
    StarController.setOutputBoundary(OutputDataBoundary);
    StarController.putStar(req, res, next);
});

export default router;
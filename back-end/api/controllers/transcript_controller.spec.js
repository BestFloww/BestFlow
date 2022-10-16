import intentDao from "../../dao/intentdao.js";
import TranscriptController from "./transcript_controller.js";

jest.mock("../../dao/intentdao.js");

describe("transcriptController", () => {
    it("Should correctly set intentDao and get transcript", () => {
        TranscriptController.setIntentDao(intentDao);
        TranscriptController.getTranscript();
        expect(intentDao.getIntent()).toHaveBeenCalled();
    });

    it("Should correctly set intentDao and post transcript", () => {
        TranscriptController.setIntentDao(intentDao);
        TranscriptController.postTranscript();
        expect(intentDao.postIntents()).toHaveBeenCalled();
    });
});
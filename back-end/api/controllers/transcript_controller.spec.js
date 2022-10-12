import intentDao from "../../dao/intentdao.js";
import TranscriptController from "./transcript_controller.js";

jest.mock("../../dao/intentdao.js");

describe("transcriptController", () => {
    it("Should correctly set intentDao", () => {
        TranscriptController.setIntentDao(intentDao);
        expect(TranscriptController.intentDao).toBe(intentDao);
    });
});
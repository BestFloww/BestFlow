import intentDao from "../../dao/intentdao.js";
import TranscriptController from "./transcript_controller.js";
import { Intent } from "../../schema/intent-schema.js";

jest.mock("../../dao/intentdao.js");
jest.mock("../../schema/intent-schema.js");

const mockResponse = () => {
    let res = {}
    res = {
        status: () => res,
        json: jest.fn().mockReturnValue(res),
    };
    return res
}

TranscriptController.setIntentDao(intentDao);

describe("transcriptController", () => {
    it("Should correctly set intentDao and get transcript", async() => {
        await TranscriptController.getTranscript({}, mockResponse(), {});
        expect(intentDao.getIntent).toHaveBeenCalled();
    });

    it("Should correctly set intentDao and post transcript", async() => {
        await TranscriptController.postTranscript({}, mockResponse(), {});
        expect(intentDao.postIntents).toHaveBeenCalled();
    });

    it("Should correctly throw an error for get transcript", async() => {
        Intent.find.mockImplementation(() => {throw "error"});
        const result = await TranscriptController.getTranscript({}, {}, {});
        expect(result.error).toBe("error");
    });

    it("Should correctly throw an error for post transcript", async() => {
        Intent.find.mockImplementation(() => {throw "error"});
        const result = await TranscriptController.postTranscript({},{},{});
        expect(result.error).toBe("error");
    });

});
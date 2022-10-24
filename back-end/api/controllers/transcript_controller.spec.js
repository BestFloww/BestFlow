import intentDao from "../../dao/intentdao.js";
import TranscriptController from "./transcript_controller.js";
import {TranscriptFormatter} from "../../helpers/transcript_data_formatter.js";

jest.mock("../../dao/intentdao.js");
jest.mock("../../schema/intent-schema.js");
jest.mock("../../helpers/transcript_data_formatter.js")

const mockResponse = () => {
    let res = {}
    res = {
        status: () => res,
        json: jest.fn().mockImplementation((obj) => obj),
        error: "error",
    };
    return res
}

TranscriptController.setIntentDao(intentDao);

describe("transcriptController", () => {
    it("Should correctly set intentDao and get transcript", async() => {
        intentDao.getIntent.mockImplementation().mockReturnValue({});
        await TranscriptController.getTranscript({}, mockResponse(), {});
        expect(intentDao.getIntent).toHaveBeenCalled();
    });

    it("Should correctly set intentDao and post transcript", async() => {
        await TranscriptController.postTranscript({body:{payload : {"a" : "a"}}}, mockResponse(), {});
        expect(intentDao.postIntents).toHaveBeenCalled();
    });

    it("Should correctly throw an error for post transcript", async() => {
        intentDao.postIntents.mockImplementation(() => {throw {message : "error"}});
        const res = mockResponse();
        const result = await TranscriptController.postTranscript({body:{payload : {"a" : "a"}}}, res,{});
        expect(res.json).toHaveBeenCalledWith({error : "error"});
    });

});
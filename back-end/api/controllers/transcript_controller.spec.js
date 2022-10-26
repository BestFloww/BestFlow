import intentDao from "../../dao/intentdao.js";
import TranscriptController from "./transcript_controller.js";
import TranscriptInteractor from "../../helpers/transcript_interactor.js";

jest.mock("../../dao/intentdao.js");
jest.mock("../../schema/intent-schema.js");
jest.mock("../../helpers/transcript_interactor.js")

const mockResponse = () => {
    let res = {};
    res = {
        status: () => res,
        json: jest.fn().mockImplementation((obj) => obj),
        error: "error",
    };
    return res;
}

TranscriptController.setTranscriptInteractor(TranscriptInteractor);

describe("transcriptController", () => {
    it("Should correctly get transcript", async() => {
        TranscriptInteractor.getTranscript.mockImplementation().mockReturnValue({});
        await TranscriptController.getTranscript({}, mockResponse(), {});
        expect(TranscriptInteractor.getTranscript).toHaveBeenCalled();
    });

    it("Should correctly post transcript", async() => {
        await TranscriptController.postTranscript({body:{payload : {"a" : "a"}}}, mockResponse(), {});
        expect(TranscriptInteractor.formatTranscript).toHaveBeenCalled();
    });

    it("Should correctly throw an error for post transcript", async() => {
        TranscriptInteractor.formatTranscript.mockImplementation(() => {throw {message : "error"}});
        const res = mockResponse();
        await TranscriptController.postTranscript({body:{payload : {"a" : "a"}}}, res,{});
        expect(res.json).toHaveBeenCalledWith({error : "error"});
    });

});
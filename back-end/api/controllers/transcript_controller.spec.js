import TranscriptController from "./transcript_controller.js";
import GetTranscriptInteractor from "../../helpers/get_transcript_interactor.js";
import PostTranscriptInteractor from "../../helpers/post_transcript_interactor.js";
import OutputDataBoundary from "../../helpers/output_data_boundary.js"

jest.mock("../../helpers/get_transcript_interactor.js");
jest.mock("../../helpers/post_transcript_interactor.js");
jest.mock("../../helpers/output_data_boundary.js")

const mockResponse = () => {
    let res = {};
    res = {
        status: () => res,
        json: jest.fn().mockImplementation((obj) => obj),
        error: "error",
    };
    return res;
}

// Note that setting the interactors and output boundaries implicitly tests that these functions work correctly
TranscriptController.setOutputBoundary(OutputDataBoundary);

describe("TranscriptController", () => {
    it("Should correctly get an analyzed transcript", async() => {
        TranscriptController.setTranscriptInteractor(GetTranscriptInteractor);
        OutputDataBoundary.getOutput.mockImplementation().mockReturnValue({});
        await TranscriptController.getAnalyzedTranscript({}, mockResponse(), {});
        expect(OutputDataBoundary.getOutput).toHaveBeenCalled();
    });

    it("Should correctly handle errors on get transcript", async() => {
        TranscriptController.setTranscriptInteractor(GetTranscriptInteractor);
        OutputDataBoundary.getOutput.mockImplementation(() => {throw {message: "e"}})
        const res = mockResponse();
        await TranscriptController.getAnalyzedTranscript({}, res, {});
        expect(OutputDataBoundary.getOutput).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({error : "e"});
    });

    it("Should correctly post transcript", async() => {
        TranscriptController.setTranscriptInteractor(PostTranscriptInteractor);
        await TranscriptController.postTranscript({body:{payload : {"a" : "a"}}}, mockResponse(), {});
        expect(PostTranscriptInteractor.formatTranscript).toHaveBeenCalledWith({"a": "a"}, undefined);
    });

    it("Should correctly post transcript with override", async() => {
        TranscriptController.setTranscriptInteractor(PostTranscriptInteractor);
        await TranscriptController.postTranscript({body:{payload : {"a" : "a", override: true}}}, mockResponse(), {});
        expect(PostTranscriptInteractor.formatTranscript).toHaveBeenCalledWith({"a": "a", override: true}, true);
    });

    it("Should correctly throw an error for post transcript", async() => {
        TranscriptController.setTranscriptInteractor(PostTranscriptInteractor);
        PostTranscriptInteractor.formatTranscript.mockImplementation(() => {throw {message : "error"}});
        const res = mockResponse();
        await TranscriptController.postTranscript({body:{payload : {"a" : "a"}}}, res,{});
        expect(res.json).toHaveBeenCalledWith({error : "error"});
    });

    it("should correctly throw an error for the input boundary not being the right object", () => {
        expect.assertions(1);
        try {
            TranscriptController.setTranscriptInteractor({})
        } catch (e) {
            expect(e).toEqual(new Error("not an InputBoundary"));
        }
    });

    it("should correctly throw an error for the output boundary not being the right object", () => {
        expect.assertions(1);
        try {
            TranscriptController.setOutputBoundary({})
        } catch (e) {
            expect(e).toEqual(new Error("not an OutputBoundary"));
        }
    });

});
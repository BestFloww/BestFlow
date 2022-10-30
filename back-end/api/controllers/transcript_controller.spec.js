import TranscriptController from "./transcript_controller.js";
import TranscriptInteractor from "../../helpers/transcript_interactor.js";
import OutputDataBoundary from "../../helpers/output_data_boundary.js"

jest.mock("../../helpers/transcript_interactor.js");
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

// Note that setting these implicitely tests these functions work correctly
TranscriptController.setTranscriptInteractor(TranscriptInteractor);
TranscriptController.setOutputBoundary(OutputDataBoundary);

describe("transcriptController", () => {
    it("Should correctly get transcript", async() => {
        OutputDataBoundary.getOutput.mockImplementation().mockReturnValue({});
        await TranscriptController.getAnalyzedTranscript({}, mockResponse(), {});
        expect(OutputDataBoundary.getOutput).toHaveBeenCalled();
    });

    it("Should correctly handle errors on get transcript", async() => {
        OutputDataBoundary.getOutput.mockImplementation(() => {throw {message: "e"}})
        const res = mockResponse();
        await TranscriptController.getAnalyzedTranscript({}, res, {});
        expect(OutputDataBoundary.getOutput).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({error : "e"});
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

    it("should correctly throw an error for the input boundary not being the right object", () => {
        expect.assertions(1);
        try {
            TranscriptController.setTranscriptInteractor({})
        } catch (e) {
            expect(e).toEqual(new Error("not an InputBoundary"));
        }
    });

    it("should correctly throw an error for the input boundary not being the right object", () => {
        expect.assertions(1);
        try {
            TranscriptController.setOutputBoundary({})
        } catch (e) {
            expect(e).toEqual(new Error("not an OutputBoundary"));
        }
    });

});
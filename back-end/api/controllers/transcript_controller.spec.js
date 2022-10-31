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

TranscriptController.setTranscriptInteractor(TranscriptInteractor);
TranscriptController.setOutputBoundary(OutputDataBoundary);

describe("transcriptController", () => {
    it("Should correctly get transcript", async() => {
        OutputDataBoundary.getOutput.mockImplementation().mockReturnValue({});
        await TranscriptController.getTranscript({}, mockResponse(), {});
        expect(OutputDataBoundary.getOutput).toHaveBeenCalled();
    });

    it("Should correctly post transcript", async() => {
        const outputReturn = {status: 201, message: "success"};
        OutputDataBoundary.getOutput.mockImplementation(() => {return outputReturn});
        const res = mockResponse();
        await TranscriptController.postTranscript({body:{payload : {"a" : "a"}}}, res,{});
        
        expect(TranscriptInteractor.formatTranscript).toHaveBeenCalled();
        expect(OutputDataBoundary.getOutput).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(outputReturn);
    });

    it("Should correctly throw an error for post transcript", async() => {
        TranscriptInteractor.formatTranscript.mockImplementation(() => {throw {message : "error"}});
        const res = mockResponse();
        await TranscriptController.postTranscript({body:{payload : {"a" : "a"}}}, res,{});
        expect(res.json).toHaveBeenCalledWith({error : "error"});
    });

});
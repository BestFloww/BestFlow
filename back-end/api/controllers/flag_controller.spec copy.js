import FlagController from "./flag_controller.js";
import PutFlagInteractor from "../../helpers/put_flag_interactor.js";
import OutputDataBoundary from "../../helpers/output_data_boundary.js"

jest.mock("../../helpers/put_flag_interactor.js");
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

FlagController.setOutputBoundary(OutputDataBoundary);

describe("FlagController", () => {

    it("Should correctly put flag", async() => {
        FlagController.setTranscriptInteractor(PutFlagInteractor);
        await FlagController.putStar({body:{"question" : "a", "projectId" : "b", "starStatus" : true}}, mockResponse(), {});
        expect(PutFlagInteractor.setFlagStatus).toHaveBeenCalledWith({question: "a", project_id: "b"}, {flag : true});
    });

    it("Should correctly throw an error for put flag", async() => {
        FlagController.setTranscriptInteractor(PutFlagInteractor);
        PutFlagInteractor.setFlagStatus.mockImplementation(() => {throw {message : "error"}});
        const res = mockResponse();
        await StarController.putFlag({body : {"a" : "a"}}, res,{});
        expect(res.json).toHaveBeenCalledWith({error : "error"});
    });

    it("should correctly throw an error for the input boundary not being the right object", () => {
        expect.assertions(1);
        try {
            FlagController.setTranscriptInteractor({})
        } catch (e) {
            expect(e).toEqual(new Error("not an InputBoundary"));
        }
    });

    it("should correctly throw an error for the output boundary not being the right object", () => {
        expect.assertions(1);
        try {
            FlagController.setOutputBoundary({})
        } catch (e) {
            expect(e).toEqual(new Error("not an OutputBoundary"));
        }
    });

});
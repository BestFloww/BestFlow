import StarController from "./star_controller.js";
import PutStarInteractor from "../../helpers/put_star_interactor.js";
import OutputDataBoundary from "../../helpers/output_data_boundary.js"

jest.mock("../../helpers/put_star_interactor.js");
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

StarController.setOutputBoundary(OutputDataBoundary);

describe("StarController", () => {

    it("Should correctly put star", async() => {
        StarController.setTranscriptInteractor(PutStarInteractor);
        await StarController.putStar({body:{body:{"question" : "a", "projectId" : "b", "starStatus" : true}}}, mockResponse(), {});
        expect(PutStarInteractor.setStarStatus).toHaveBeenCalledWith({question: "a", project_id: "b"}, {star : true});
    });

    it("Should correctly throw an error for put star", async() => {
        StarController.setTranscriptInteractor(PutStarInteractor);
        PutStarInteractor.setStarStatus.mockImplementation(() => {throw {message : "error"}});
        const res = mockResponse();
        await StarController.putStar({body:{body : {"a" : "a"}}}, res,{});
        expect(res.json).toHaveBeenCalledWith({error : "error"});
    });

    it("should correctly throw an error for the input boundary not being the right object", () => {
        expect.assertions(1);
        try {
            StarController.setTranscriptInteractor({})
        } catch (e) {
            expect(e).toEqual(new Error("not an InputBoundary"));
        }
    });

    it("should correctly throw an error for the output boundary not being the right object", () => {
        expect.assertions(1);
        try {
            StarController.setOutputBoundary({})
        } catch (e) {
            expect(e).toEqual(new Error("not an OutputBoundary"));
        }
    });

});
import intentDao from "../../dao/intentdao.js";
import { IntentInterface } from "../../interfaces/intent-interface.js";
import PutFlagInteractor from "./put_flag_interactor.js"

jest.mock("../../dao/intentdao.js");
jest.mock("../../interfaces/intent-interface.js")

let dao;

describe("PutFlagInteractor", () => {
    beforeEach(() => {
        intentDao.prototype = Object.create(IntentInterface.prototype);
        const newDao = new intentDao;
        newDao.prototype = new IntentInterface();
        PutFlagInteractor.setIntentDao(newDao);
        dao = newDao;
        jest.clearAllMocks();
    });

    it("Should correctly throw an error for setFlagStatus", async() => {
        dao.putIntent.mockImplementationOnce(() => {throw {message : "error"}})
        const result = await PutFlagInteractor.setFlagStatus({},{});
        expect(result.error.message).toBe("error");
    });

    it("should correctly call dao with the passed arguments", async() => {
        const filter = {question: "a", project_id: "b"};
        const status = {flag : true}
        const result = await PutFlagInteractor.setFlagStatus(filter,status);
        expect(dao.putIntent).toHaveBeenCalledWith(filter, status);
    });

    it("should correctly throw an error for the intent dao not being the right object", () => {
        expect.assertions(1);
        try {
            PutFlagInteractor.setIntentDao({})
        } catch (e) {
            expect(e).toEqual(new Error("not an IntentInterface"));
        }
    });
});
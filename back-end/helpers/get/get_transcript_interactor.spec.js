import intentDao from "../../dao/intentdao.js";
import { IntentInterface } from "../../interfaces/intent-interface.js";
import GetTranscriptInteractor from "./get_transcript_interactor.js";

jest.mock("../../dao/intentdao.js");
jest.mock("../../interfaces/intent-interface.js")

let dao;

describe("GetTranscriptInteractor", () => {
    beforeEach(() => {
        intentDao.prototype = Object.create(IntentInterface.prototype);
        const newDao = new intentDao;
        newDao.prototype = new IntentInterface();
        GetTranscriptInteractor.setIntentDao(newDao);
        dao = newDao;
        jest.clearAllMocks();
    });

    it("should correctly get an unanalyzed transcript", async() => {
        dao.getIntent.mockImplementation();
        await GetTranscriptInteractor.getTranscript({});
        expect(dao.getIntent).toHaveBeenCalledWith({});
    });

    it("should correctly throw an error for the intent dao not being the right object", () => {
        expect.assertions(1);
        try {
            GetTranscriptInteractor.setIntentDao({})
        } catch (e) {
            expect(e).toEqual(new Error("not an IntentInterface"));
        }
    });
});
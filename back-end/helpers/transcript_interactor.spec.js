import intentDao from "../dao/intentdao.js";
import { IntentInterface } from "../interfaces/intent-interface.js";
import TranscriptInteractor from "./transcript_interactor.js";
import TranscriptFormatter from "./transcript_data_formatter.js";

jest.mock("../dao/intentdao.js");
jest.mock("../interfaces/intent-interface.js")
jest.mock("./transcript_data_formatter.js");

const mock_transcript = {transcript: JSON.stringify({})};

let dao;

describe("transcriptInteractor", () => {
    beforeEach(() => {
        intentDao.prototype = Object.create(IntentInterface.prototype);
        const newDao = new intentDao;
        newDao.prototype = new IntentInterface();
        TranscriptInteractor.setIntentDao(newDao);
        dao = newDao;
        jest.clearAllMocks();
    });

    it("Should correctly throw an error for setIntentDao", async() => {
        dao.getIntent.mockImplementation().mockReturnValue({});
        await TranscriptInteractor.getTranscript({});
        expect(dao.getIntent).toHaveBeenCalled();
    });

    it("Should correctly throw an error for setIntentDao", async() => {
        dao.getIntent.mockImplementation().mockReturnValue({});
        await TranscriptInteractor.getTranscript({});
        expect(dao.getIntent).toHaveBeenCalled();
    });

    it("Should correctly set intentDao and get transcript", async() => {
        dao.getIntent.mockImplementation().mockReturnValue({});
        await TranscriptInteractor.getTranscript({});
        expect(dao.getIntent).toHaveBeenCalled();
    });

    it("Should correctly parse JSON transcript", async() => {
        const spy_parse = jest.spyOn(JSON, "parse");
        await TranscriptInteractor.formatTranscript(JSON.stringify(mock_transcript));
        expect(spy_parse).toHaveBeenCalledWith(JSON.stringify(mock_transcript));
        expect(spy_parse).toHaveBeenCalledWith(mock_transcript.transcript);
    });

    it("Should correctly call TranscriptFormatter", async() =>{
        await TranscriptInteractor.formatTranscript(JSON.stringify(mock_transcript));
        expect(TranscriptFormatter.formatTranscript).toHaveBeenCalledWith({});
    });

    it("Should correctly format transcript", async() => {
        await TranscriptInteractor.formatTranscript(JSON.stringify(mock_transcript));
        expect(dao.postIntents).toHaveBeenCalled();
    });

    it("Should correctly throw an error for format transcript", async() => {
        dao.postIntents.mockImplementationOnce(() => {throw {message : "error"}})
        const result = await TranscriptInteractor.formatTranscript(JSON.stringify(mock_transcript));
        expect(result.error.message).toBe("error");
    });

    it("should correctly postIntents with override being passed down", async() => {
        const result = await TranscriptInteractor.formatTranscript(JSON.stringify(mock_transcript), true);
        expect(dao.postIntents).toHaveBeenCalledWith(undefined, true);
    });

    it("should correctly postIntents with override being passed down defaulting to false", async() => {
        const result = await TranscriptInteractor.formatTranscript(JSON.stringify(mock_transcript));
        expect(dao.postIntents).toHaveBeenCalledWith(undefined, false);
    });

});
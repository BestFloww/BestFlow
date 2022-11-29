import intentDao from "../../dao/intentdao.js";
import { IntentInterface } from "../../interfaces/intent-interface.js";
import PostTranscriptInteractor from "../post/post_transcript_interactor.js";
import TranscriptFormatter from "./transcript_data_formatter.js";

jest.mock("../../dao/intentdao.js");
jest.mock("../../interfaces/intent-interface.js")
jest.mock("./transcript_data_formatter.js");

const mock_transcript = {transcript: JSON.stringify({})};

let dao;

describe("PostTranscriptInteractor", () => {
    beforeEach(() => {
        intentDao.prototype = Object.create(IntentInterface.prototype);
        const newDao = new intentDao;
        newDao.prototype = new IntentInterface();
        PostTranscriptInteractor.setIntentDao(newDao);
        dao = newDao;
        jest.clearAllMocks();
    });

    it("Should correctly parse JSON transcript", async() => {
        const spy_parse = jest.spyOn(JSON, "parse");
        await PostTranscriptInteractor.formatTranscript(JSON.stringify(mock_transcript));
        expect(spy_parse).toHaveBeenCalledWith(JSON.stringify(mock_transcript));
        expect(spy_parse).toHaveBeenCalledWith(mock_transcript.transcript);
    });

    it("Should correctly call TranscriptFormatter on the transcript", async() =>{
        await PostTranscriptInteractor.formatTranscript(JSON.stringify(mock_transcript));
        expect(TranscriptFormatter.formatTranscript).toHaveBeenCalledWith({});
    });

    it("Should correctly throw an error for format transcript", async() => {
        dao.postIntents.mockImplementationOnce(() => {throw {message : "error"}})
        const result = await PostTranscriptInteractor.formatTranscript(JSON.stringify(mock_transcript));
        expect(result.error.message).toBe("error");
    });

    it("should correctly postIntents with override being passed down defaulting to undefined", async() => {
        const result = await PostTranscriptInteractor.formatTranscript(JSON.stringify(mock_transcript));
        expect(dao.postIntents).toHaveBeenCalledWith(undefined, undefined);
    });

    it("should correctly postIntents with override being passed down", async() => {
        mock_transcript.override = true;
        const result = await PostTranscriptInteractor.formatTranscript(JSON.stringify(mock_transcript));
        expect(dao.postIntents).toHaveBeenCalledWith(undefined, true);
    });

    it("should correctly throw an error for the intent dao not being the right object", () => {
        expect.assertions(1);
        try {
            PostTranscriptInteractor.setIntentDao({})
        } catch (e) {
            expect(e).toEqual(new Error("not an IntentInterface"));
        }
    });
});
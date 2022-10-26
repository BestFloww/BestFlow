import intentDao from "../dao/intentdao.js";
import TranscriptInteractor from "./transcript_interactor.js";
import TranscriptFormatter from "./transcript_data_formatter.js";

jest.mock("../dao/intentdao.js");
jest.mock("./transcript_data_formatter.js");

TranscriptInteractor.setIntentDao(intentDao);
const mock_transcript = {transcript: JSON.stringify({})};

describe("transcriptInteractor", () => {
    it("Should correctly set intentDao and get transcript", async() => {
        intentDao.getIntent.mockImplementation().mockReturnValue({});
        await TranscriptInteractor.getTranscript({});
        expect(intentDao.getIntent).toHaveBeenCalled();
    });

    it("Should correctly parse JSON transcript", async() => {
        const spy_parse = jest.spyOn(JSON, "parse");
        await TranscriptInteractor.formatTranscript(JSON.stringify(mock_transcript));
        expect(spy_parse).toHaveBeenCalledWith(JSON.stringify(mock_transcript));
        expect(spy_parse).toHaveBeenCalledWith(mock_transcript.transcript);
    });

    it("Should correctly call TranscriptFormatter", async() =>{
        await TranscriptInteractor.formatTranscript(JSON.stringify(mock_transcript));
        expect(TranscriptFormatter.formatTranscript).toHaveBeenCalled();
    });

    it("Should correctly format transcript", async() => {
        await TranscriptInteractor.formatTranscript(JSON.stringify(mock_transcript));
        expect(intentDao.postIntents).toHaveBeenCalled();
    });

    it("Should correctly throw an error for format transcript", async() => {
        intentDao.postIntents.mockImplementation(() => {throw {message : "error"}})
        const result = await TranscriptInteractor.formatTranscript(JSON.stringify(mock_transcript));
        expect(result.error.message).toBe("error");
    });

});
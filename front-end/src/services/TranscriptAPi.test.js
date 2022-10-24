import axios from "axios";
import TranscriptAPI from "./TranscriptAPI.js";
jest.mock("axios");

describe("Transcript API", () => {
    it("should correctly get an analyzed transcript", async() => {
        axios.get.mockImplementation(() => { return {name: "hi"} });
        const result = await TranscriptAPI.getAnalysis();

        expect(axios.get).toHaveBeenCalled();
        expect(result.name).toBe("hi");
    });

    it("should correctly get an analyzed transcript with filter", async() => {
        axios.get.mockImplementation((string, filter) => { return filter });
        const filter = {name: "ratio"};
        const result = await TranscriptAPI.getAnalysis(filter);

        expect(axios.get).toHaveBeenCalledWith(expect.any(String), filter);
        expect(result).toBe(filter);
    });

    it("post a transcript", async() => {
        const fakeTranscript = {Wario: "waaa", Waluigi: "waaaa"};
        await TranscriptAPI.post(fakeTranscript);
        const payload = JSON.stringify(fakeTranscript);
        expect(axios.post).toHaveBeenCalledWith(expect.any(String), {payload});
    });
});


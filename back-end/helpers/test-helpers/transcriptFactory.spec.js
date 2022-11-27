import TranscriptFactory from "./transcriptFactory.js";
import FileGenerator from "./fileGenerator.js"
describe("TranscriptFactory", () => {

    const questionMsg = "How can I help you?"
    const text = {
        "project_id": "1",
        "trace_type": "text",
        "trace_payload": "{\"type\":\"text\",\"payload\":{" +
            "\"slate\":{\"id\":\"1\",\"content\":\"[{\\\"children\\\":[" +
            "{\\\"text\\\":\\\"How can I help you?\\\"}]}]\"}," +
            "\"message\":\"How can I help you?\"}}"
    }
    const speak = {
        "project_id": "1",
        "trace_type": "speak",
        "trace_payload": "{\"type\":\"speak\",\"payload\":{\"type\":\"message\",\"message\":\"<voice name=\\\"Alexa\\\">How can I help you?</voice>\"}}"
    }

    it("should create the right format of question for text", () => {
        const expected = [text]
        const question = TranscriptFactory.generateSingleEntry("1", "text", questionMsg)
        expect(question).toEqual(expected);
    });

    it("should create the right format of question for speak", () => {
        const expected = [speak]
        const question = TranscriptFactory.generateSingleEntry("1", "speak", questionMsg, "Alexa");
        expect(question).toEqual(expected);
    });

    it("should create the right format of question for text, lead", () => {
        const expected = [text,{}]
        const question = TranscriptFactory.generateSingleLeaf("1", "text", questionMsg);
        expect(question).toEqual(expected);
    });

    it("should create the right format of question for speak, leaf", () => {
        const expected = [speak, {}]
        const question = TranscriptFactory.generateSingleLeaf("1", "speak", questionMsg, "Alexa");
        expect(question).toEqual(expected);
    });
});
import TranscriptFormatter from "./transcript_data_formatter"
const global_database = {};
beforeAll(() => {
    const intent_1 = {
      "project_id": "1",
      "trace_type": "intent",
      "trace_payload": "{\"type\":\"intent\",\"ELICIT\":false,\"payload\":{\"query\":\"yeah\",\"intent\":{\"name\":\"key location\"},\"entities\":\"[{\\\"name\\\":\\\"key_location\\\",\\\"value\\\":\\\"yeah\\\"}]\"}}"
    };
    const speak_1 = {
      "project_id": "1",
      "trace_type": "speak",
      "trace_payload": "{\"type\":\"speak\",\"payload\":{\"type\":\"message\",\"message\":\"<voice name=\\\"Alexa\\\">\\\"I want to plan my schedule\\\" Is this a key location? </voice>\"}}"
    };
    const text_1 = {
      "project_id": "1",
      "trace_type": "text",
      "trace_payload": "{\"type\":\"text\",\"payload\":{\"slate\":{\"id\":\"6jaw3c6k\",\"content\":\"[{\\\"children\\\":[{\\\"text\\\":\\\"What would you like to buy? \\\"}]}]\"},\"message\":\"What would you like to buy?\"}}"
    };
    const text_2 = {
      "project_id": "2",
      "trace_type": "text",
      "trace_payload": "{\"type\":\"text\",\"payload\":{\"slate\":{\"id\":\"6jaw3c6k\",\"content\":\"[{\\\"children\\\":[{\\\"text\\\":\\\"What would you like to buy? \\\"}]}]\"},\"message\":\"What would you like to buy?\"}}"
    };

    const bad_entry = {
      "project_id": "2",
      "trace_type": "text"
    }
    global_database["raw_transcript"] = {"data":[]};
    global_database["speak1"] = speak_1;
    global_database["text1"] = text_1;
    global_database["intent1"] = intent_1;
    global_database["text2"] = text_2;
    global_database["bad_entry"] = bad_entry;
    
});

beforeEach(() => {
  global_database.raw_transcript = {"data" : []}
});


describe("formatTranscipt", () => {

    it("should throw an error when the transcript does not match specifications ", async() => {
        global_database.raw_transcript.data.push(global_database.bad_entry);
        const received = await TranscriptFormatter.formatTranscipt(global_database.raw_transcript);
        expect(received).toBe("The transcript does not match specifications!");
    });

    it("should return an empty array, when there's no speak or text", async() => {
        global_database.raw_transcript.data.push(global_database.intent1);
        const received = await TranscriptFormatter.formatTranscipt(global_database.raw_transcript);
        expect(received).toEqual([]);
    });


    it("should return an array containing one Intent initializer, when the type of question is speak, no children", async() => {
        global_database.raw_transcript.data.push(global_database.speak1);
        const received = await TranscriptFormatter.formatTranscipt(global_database.raw_transcript);
        expect(received.length).toBe(1);
        expect(received[0].question).toBe("<voice name=\"Alexa\">\"I want to plan my schedule\" Is this a key location? </voice>");
        expect(received[0].children).toEqual(new Map());
        expect(received[0].total_children).toBe(0);
        expect(received[0].project_id).toBe("1");
        
    });

    it("should return an array containing one Intent initializer, when the type of question is text, no children", async() => {
        global_database.raw_transcript.data.push(global_database.text2);
        const received = await TranscriptFormatter.formatTranscipt(global_database.raw_transcript);
        expect(received.length).toBe(1);
        expect(received[0].question).toBe("What would you like to buy?");
        expect(received[0].children).toEqual(new Map());
        expect(received[0].total_children).toBe(0);
        expect(received[0].project_id).toBe("2");
    });

    it("should return an array containing two Intent initializers, two different project ids, no children", async() => {
        global_database.raw_transcript.data.push(global_database.speak1);
        global_database.raw_transcript.data.push(global_database.text2);
        const received = await TranscriptFormatter.formatTranscipt(global_database.raw_transcript);
        expect(received.length).toBe(2);
        expect(received[0].children).toEqual(new Map());
        expect(received[0].total_children).toBe(0);
    });


    it("should return an array containing two Intent initializers, same project ids, one children of the other", async() => {
        global_database.raw_transcript.data.push(global_database.speak1)
        global_database.raw_transcript.data.push(global_database.text1)
        let children = new Map();
        children.set("What would you like to buy?", 1);
        const received = await TranscriptFormatter.formatTranscipt(global_database.raw_transcript);
        expect(received.length).toBe(2);
        expect(received[0].children).toEqual(children);
        expect(received[0].total_children).toBe(1);
      
    });


    it("should return an array containing 3 Intent initializers, various project ids, one children twice", async() => {
        global_database.raw_transcript.data.push(global_database.speak1)
        global_database.raw_transcript.data.push(global_database.text1)
        global_database.raw_transcript.data.push(global_database.text2)
        global_database.raw_transcript.data.push(global_database.speak1)
        global_database.raw_transcript.data.push(global_database.text1)
        let children = new Map();
        children.set("What would you like to buy?", 2);
        const received = await TranscriptFormatter.formatTranscipt(global_database.raw_transcript);
        expect(received.length).toBe(3);
        expect(received[0].children).toEqual(children);
        expect(received[0].total_children).toBe(2);
      
    });
});
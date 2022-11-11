import TranscriptFormatter from "./transcript_data_formatter"
const globalDatabase = {};

describe("formatTranscript", () => {
    beforeAll(() => {
        const intent1 = {
          "project_id": "1",
          "trace_type": "intent",
          "trace_payload": "{\"type\":\"intent\",\"ELICIT\":false,\"payload\":{\"query\":\"yeah\",\"intent\":{\"name\":\"key location\"},\"entities\":\"[{\\\"name\\\":\\\"key_location\\\",\\\"value\\\":\\\"yeah\\\"}]\"}}"
        };
        const speak1 = {
          "project_id": "1",
          "trace_type": "speak",
          "trace_payload": "{\"type\":\"speak\",\"payload\":{\"type\":\"message\",\"message\":\"<voice name=\\\"Alexa\\\">\\\"I want to plan my schedule\\\" Is this a key location? </voice>\"}}"
        };
        const text1 = {
          "project_id": "1",
          "trace_type": "text",
          "trace_payload": "{\"type\":\"text\",\"payload\":{\"slate\":{\"id\":\"6jaw3c6k\",\"content\":\"[{\\\"children\\\":[{\\\"text\\\":\\\"What would you like to buy? \\\"}]}]\"},\"message\":\"What would you like to buy?\"}}"
        };
        const text2 = {
          "project_id": "2",
          "trace_type": "text",
          "trace_payload": "{\"type\":\"text\",\"payload\":{\"slate\":{\"id\":\"6jaw3c6k\",\"content\":\"[{\\\"children\\\":[{\\\"text\\\":\\\"What would you like to buy? \\\"}]}]\"},\"message\":\"What would you like to buy?\"}}"
        };

        const badEntry = {
          "project_id": "2",
          "trace_type": "text"
        };

        globalDatabase["rawTranscript"] = {"data":[]};
        globalDatabase["speak1"] = speak1;
        globalDatabase["text1"] = text1;
        globalDatabase["intent1"] = intent1;
        globalDatabase["text2"] = text2;
        globalDatabase["badEntry"] = badEntry;
        
      });

      beforeEach(() => {
          globalDatabase.rawTranscript = {"data" : []};
      });

      it("should throw an error when the transcript does not match specifications ", async() => {
          globalDatabase.rawTranscript.data.push(globalDatabase.badEntry);
          try{
              const received = await TranscriptFormatter.formatTranscript(globalDatabase.rawTranscript);
          }
          catch(error){
              expect(error.message).toBe("The transcript does not match specifications! Error: Unexpected token u in JSON at position 0");
          }
      });

    it("should return an empty array, when there's no speak or text", async() => {
        globalDatabase.rawTranscript.data.push(globalDatabase.intent1);
        const received = await TranscriptFormatter.formatTranscript(globalDatabase.rawTranscript);
        expect(received).toEqual([]);
    });


    it("should return an array containing one Intent initializer, when the type of question is speak, no children", async() => {
        globalDatabase.rawTranscript.data.push(globalDatabase.speak1);
        const received = await TranscriptFormatter.formatTranscript(globalDatabase.rawTranscript);
        expect(received.length).toBe(1);
        expect(received[0].question).toBe("<voice name=\"Alexa\">\"I want to plan my schedule\" Is this a key location? </voice>");
        expect(received[0].children).toEqual(new Map());
        expect(received[0].total_children).toBe(0);
        expect(received[0].project_id).toBe("1");
        
    });

    it("should return an array containing one Intent initializer, when the type of question is text, no children", async() => {
        globalDatabase.rawTranscript.data.push(globalDatabase.text2);
        const received = await TranscriptFormatter.formatTranscript(globalDatabase.rawTranscript);
        expect(received.length).toBe(1);
        expect(received[0].question).toBe("What would you like to buy?");
        expect(received[0].children).toEqual(new Map());
        expect(received[0].total_children).toBe(0);
        expect(received[0].project_id).toBe("2");
    });

    it("should return an array containing two Intent initializers, two different project ids, no children", async() => {
        globalDatabase.rawTranscript.data.push(globalDatabase.speak1);
        globalDatabase.rawTranscript.data.push(globalDatabase.text2);
        const received = await TranscriptFormatter.formatTranscript(globalDatabase.rawTranscript);
        expect(received.length).toBe(2);
        expect(received[0].children).toEqual(new Map());
        expect(received[0].total_children).toBe(0);
    });


    it("should return an array containing two Intent initializers, same project ids, one children of the other", async() => {
        globalDatabase.rawTranscript.data.push(globalDatabase.speak1);
        globalDatabase.rawTranscript.data.push(globalDatabase.text1);
        const children = new Map();
        children.set("What would you like to buy?", 1);
        const received = await TranscriptFormatter.formatTranscript(globalDatabase.rawTranscript);
        expect(received.length).toBe(2);
        expect(received[0].children).toEqual(children);
        expect(received[0].total_children).toBe(1);
      
    });


    it("should return an array containing 3 Intent initializers, various project ids, one children twice", async() => {
        globalDatabase.rawTranscript.data.push(globalDatabase.speak1);
        globalDatabase.rawTranscript.data.push(globalDatabase.text1);
        globalDatabase.rawTranscript.data.push(globalDatabase.text2);
        globalDatabase.rawTranscript.data.push(globalDatabase.speak1);
        globalDatabase.rawTranscript.data.push(globalDatabase.text1);
        const children = new Map();
        children.set("What would you like to buy?", 2);
        const received = await TranscriptFormatter.formatTranscript(globalDatabase.rawTranscript);
        expect(received.length).toBe(3);
        expect(received[0].children).toEqual(children);
        expect(received[0].total_children).toBe(2);
      
    });
});
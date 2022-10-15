import {formatTranscipt} from "./transcript_data_formatter"

describe("formatTranscipt", () => {

    it("should return an empty array, when there's no speack or text", async() => {
        const raw_transcript = {"data":[{
            "project_id": "1",
            "trace_type": "intent",
            "trace_payload": "{\"type\":\"intent\",\"ELICIT\":false,\"payload\":{\"query\":\"yeah\",\"intent\":{\"name\":\"key location\"},\"entities\":\"[{\\\"name\\\":\\\"key_location\\\",\\\"value\\\":\\\"yeah\\\"}]\"}}"
        }]}
        const expected = []
        const received = await formatTranscipt(raw_transcript);
        expect(received).toEqual(expected)
      });


    it("should return an array containing one Intent initializer, speack, no children", async() => {
        const raw_transcript = {"data":[{
            "project_id": "1",
            "trace_type": "speak",
            "trace_payload": "{\"type\":\"speak\",\"payload\":{\"type\":\"message\",\"message\":\"<voice name=\\\"Alexa\\\">\\\"I want to plan my schedule\\\" Is this a key location? </voice>\"}}"
        }]}
        const expected = [{question: "<voice name=\"Alexa\">\"I want to plan my schedule\" Is this a key location? </voice>",children: new Map(),total_children: 0, project_id: "1"}]
        const received = await formatTranscipt(raw_transcript);
        expect(received).toEqual(expected)
      });

      it("should return an array containing one Intent initializer, text, no children", async() => {
        const raw_transcript = {"data":[{
            "project_id": "1",
            "trace_type": "text",
            "trace_payload": "{\"type\":\"text\",\"payload\":{\"slate\":{\"id\":\"6jaw3c6k\",\"content\":\"[{\\\"children\\\":[{\\\"text\\\":\\\"What would you like to buy? \\\"}]}]\"},\"message\":\"What would you like to buy?\"}}"
        }]}
        const expected = [{question: "What would you like to buy?",children: new Map(),total_children: 0, project_id: "1"}]
        const received = await formatTranscipt(raw_transcript);
        expect(received).toEqual(expected)
      });

      it("should return an array containing two Intent initializers, two different project ids, no children", async() => {
        const raw_transcript = {"data":[{
            "project_id": "1",
            "trace_type": "speak",
            "trace_payload": "{\"type\":\"speak\",\"payload\":{\"type\":\"message\",\"message\":\"<voice name=\\\"Alexa\\\">\\\"I want to plan my schedule\\\" Is this a key location? </voice>\"}}"
        },
        {
            "project_id": "2",
            "trace_type": "text",
            "trace_payload": "{\"type\":\"text\",\"payload\":{\"slate\":{\"id\":\"6jaw3c6k\",\"content\":\"[{\\\"children\\\":[{\\\"text\\\":\\\"What would you like to buy? \\\"}]}]\"},\"message\":\"What would you like to buy?\"}}"
        }
        ]}
        const expected = [{question: "<voice name=\"Alexa\">\"I want to plan my schedule\" Is this a key location? </voice>",children: new Map(),total_children: 0, project_id: "1"},
                            {question: "What would you like to buy?",children: new Map(),total_children: 0, project_id: "2"}]
        const received = await formatTranscipt(raw_transcript);
        expect(received).toEqual(expected);
        
      });


      it("should return an array containing two Intent initializers, same project ids, one children of the other", async() => {
        const raw_transcript = {"data":[{
            "project_id": "1",
            "trace_type": "speak",
            "trace_payload": "{\"type\":\"speak\",\"payload\":{\"type\":\"message\",\"message\":\"<voice name=\\\"Alexa\\\">\\\"I want to plan my schedule\\\" Is this a key location? </voice>\"}}"
        },
        {
            "project_id": "1",
            "trace_type": "text",
            "trace_payload": "{\"type\":\"text\",\"payload\":{\"slate\":{\"id\":\"6jaw3c6k\",\"content\":\"[{\\\"children\\\":[{\\\"text\\\":\\\"What would you like to buy? \\\"}]}]\"},\"message\":\"What would you like to buy?\"}}"
        }
        ]}
        let children = new Map();
        children.set("What would you like to buy?", 1)
        const expected = [{question: "<voice name=\"Alexa\">\"I want to plan my schedule\" Is this a key location? </voice>",children: children ,total_children: 1, project_id: "1"},
                            {question: "What would you like to buy?",children: new Map(),total_children: 0, project_id: "1"}]
        const received = await formatTranscipt(raw_transcript);
        expect(received).toEqual(expected);
        
      });


      it("should return an array containing 3 Intent initializers, various project ids, one children twice", async() => {
        const raw_transcript = {"data":[{
            "project_id": "1",
            "trace_type": "speak",
            "trace_payload": "{\"type\":\"speak\",\"payload\":{\"type\":\"message\",\"message\":\"<voice name=\\\"Alexa\\\">\\\"I want to plan my schedule\\\" Is this a key location? </voice>\"}}"
        },
        {
            "project_id": "1",
            "trace_type": "text",
            "trace_payload": "{\"type\":\"text\",\"payload\":{\"slate\":{\"id\":\"6jaw3c6k\",\"content\":\"[{\\\"children\\\":[{\\\"text\\\":\\\"What would you like to buy? \\\"}]}]\"},\"message\":\"What would you like to buy?\"}}"
        },
        {
            "project_id": "2",
            "trace_type": "text",
            "trace_payload": "{\"type\":\"text\",\"payload\":{\"slate\":{\"id\":\"6jaw3c6k\",\"content\":\"[{\\\"children\\\":[{\\\"text\\\":\\\"What would you like to buy? \\\"}]}]\"},\"message\":\"What would you like to buy?\"}}"
        },
        {
            "project_id": "1",
            "trace_type": "speak",
            "trace_payload": "{\"type\":\"speak\",\"payload\":{\"type\":\"message\",\"message\":\"<voice name=\\\"Alexa\\\">\\\"I want to plan my schedule\\\" Is this a key location? </voice>\"}}"
        },
        {
            "project_id": "1",
            "trace_type": "text",
            "trace_payload": "{\"type\":\"text\",\"payload\":{\"slate\":{\"id\":\"6jaw3c6k\",\"content\":\"[{\\\"children\\\":[{\\\"text\\\":\\\"What would you like to buy? \\\"}]}]\"},\"message\":\"What would you like to buy?\"}}"
        }
        ]}
        let children = new Map();
        children.set("What would you like to buy?", 2)
        const expected = [{question: "<voice name=\"Alexa\">\"I want to plan my schedule\" Is this a key location? </voice>",children: children ,total_children: 2, project_id: "1"},
                            {question: "What would you like to buy?",children: new Map(),total_children: 0, project_id: "1"},
                            {question: "What would you like to buy?",children: new Map(),total_children: 0, project_id: "2"}
                        ]
        const received = await formatTranscipt(raw_transcript);
        expect(received).toEqual(expected);
        
      });
    });
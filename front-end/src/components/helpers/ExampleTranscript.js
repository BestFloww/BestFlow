export const exampleTranscript = {"data": [
        {
            "project_id": "[INSERT UNIQUE ID]",
            "trace_type": "speak",
            "trace_payload": "{\"type\":\"speak\",\"payload\":{" +
                "\"type\":\"message\":\"<voice name=\\\"[AnyVoiceName]\\\">[INSERT CHATBOT MESSAGE]</voice>\"}}"
        },
        {
            "project_id": "[INSERT UNIQUE ID]",
            "trace_type": "intent",
            "trace_payload": "{\"type\":\"intent\",\"ELICIT\":false,\"payload\":{" +
                "\"query\":\"[INSERT QUERY]\",\"intent\":{\"name\":\"[INSERT INTENT]\"},\"confidence\":1}}"
        }]};
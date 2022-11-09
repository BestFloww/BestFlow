export const exampleTranscript = {"data": [
        {
            "project_id": "[INSERT UNIQUE PROJECT ID]",
            "trace_type": "speak",
            "trace_payload": "{\"type\":\"speak\",\"payload\":{\"type\":\"message\",\"message\":\"<voice name=\\\"[AnyVoiceName]\\\">[INSERT MESSAGE]</voice>\"}}"
        },
        {
            "project_id": "[INSERT UNIQUE PROJECT ID]",
            "trace_type": "text",
            "trace_payload": "{\"type\":\"text\",\"payload\":{" +
                "\"slate\":{\"id\":\"[INSERT ID]\",\"content\":\"[{\\\"children\\\":[" +
                "{\\\"text\\\":\\\"[INSERT TEXT]\\\"}]}]\"}," +
                "\"message\":\"[INSERT TEXT]\"}}"
        }
    ]
};
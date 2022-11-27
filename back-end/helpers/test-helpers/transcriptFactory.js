/* istanbul ignore file */
export default class TranscriptFactory {
    static generateTranscript(root, children) {
        const transcript = []
        for(let branch of children){
            const numberOfOccurrence = branch[0]
            const entry = branch[1]
            for (let i = 0; i < numberOfOccurrence; i++) {
                transcript.push.apply(transcript,root);
                transcript.push.apply(transcript,entry);
              }
        }
        return transcript;
    };

    static generateSingleEntry(id, type, message, name = "", isLeaf = false) {
        let entry = {};
        if(type == "text"){
            entry = {
                "project_id":id,
                "trace_type":"text",
                "trace_payload":"{\"type\":\"text\",\"payload\":{\"slate\":{\"id\":\"" + id + 
                "\",\"content\":\"[{\\\"children\\\":[{\\\"text\\\":\\\"" + message +
                "\\\"}]}]\"},\"message\":\"" + message + "\"}}"
            };
        }
        else{
            entry= {
                "project_id": id,
                "trace_type": "speak",
                "trace_payload": "{\"type\":\"speak\",\"payload\":{\"type\":\"message\",\"message\":\"<voice name=\\\"" + 
                name + "\\\">" + message+ " </voice>\"}}"
            };
        }
        if(isLeaf){
            return [entry, {}]
        }
        else{
            return [entry];
        }
        
    }
}
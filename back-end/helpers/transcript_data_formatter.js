export default class TranscriptFormatter {
    static async formatTranscript(rawTranscript){
        let content = {};
        let prev = "";
        try{
            for(const entry of rawTranscript["data"]){
                prev = this.#updateContent(entry, content, prev);
            }
            return Object.values(content);   
        }
        catch(error){
            throw new Error("The transcript does not match specifications!" + ` Error: ${error.message}`);
        }
    }

    static #updateContent(entry, content, prev){
        if(entry["trace_type"] == "text" || entry["trace_type"] == "speak"){
            const tracePayload = JSON.parse(entry["trace_payload"]);
            const id = entry["project_id"];
            const message = tracePayload.payload.message;
            this.#addIntent(content, message, id);
            if(prev in content){
                this.#addChild(content, prev, message, id);
            }
            prev = (message + id);
        }
        return prev;
    }

    static #addIntent(content, message, id){
        if(!((message + id) in content)){
            // adds question only if it's not already existing
            const intent = {question: message, children: new Map(), totalChildren: 0, project_id: id};
            // creates default intent object to be passed to an Intent(see intent_scehma)
            content[(message + id)] = intent;
        }
    }

    static #addChild(content, prev, message, id){
        const prevIntent = content[prev];
        // adds/updates child only if it has the same project id as its previous question
        if(prevIntent.project_id == id){
            if(!(prevIntent.children.has(message))){
                prevIntent.children.set(message, 0);
            }
            prevIntent.children.set(message, prevIntent.children.get(message) + 1);
            prevIntent.totalChildren += 1;
            content[prev] = prevIntent;
        }
    }
}
import {TranscriptDataInterface} from "../interfaces/transcript-data-interface.js";

export default class TranscriptFormatter extends TranscriptDataInterface{
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
        if(entry["trace_type"] == "text" || entry["trace_type"] == "speak"){ // filter just questions
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
        if(!((message + id) in content)){ // add question to array if does not already exist
            const intent = {question: message, children: new Map(), totalChildren: 0, projectId: id}; // create intent initializer 
            content[(message + id)] = intent;
        }
    }

    static #addChild(content, prev, message, id){
        const prevIntent = content[prev];
        if(prevIntent.projectId == id){ // add child only if it has the same project id as its previous question
            if(!(prevIntent.children.has(message))){ 
                prevIntent.children.set(message, 0); // add child to children if does not already exist
            }
            prevIntent.children.set(message, prevIntent.children.get(message) + 1); // update the number of this child
            prevIntent.totalChildren += 1; // update the number of the question's children
            content[prev] = prevIntent;
        }
    }
}
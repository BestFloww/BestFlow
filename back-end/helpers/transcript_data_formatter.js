
export default class TranscriptFormatter{
    
    static async formatTranscipt(raw_transcript){
        let content = {};
        let prev = "";
        try{
            for(const entry of raw_transcript["data"]){
                if(entry["trace_type"] == "text" || entry["trace_type"] == "speak"){
                    const trace_payload = JSON.parse(entry["trace_payload"]);
                    const id = entry["project_id"];
                    const message = trace_payload.payload.message;
                    this.add_intent(content, message, id);
    
                    if(prev in content){
                        this.add_child(content, prev, message, id);
                    }
    
                    prev = (message + id);
                }
            }
            return Object.values(content);
        }
        catch{
            return("The transcript does not match specifications!");
        }
    }

    static add_intent(content, message, id){
        if(!((message + id) in content)){
            const intent = {question: message, children: new Map(),total_children: 0, project_id: id};
            content[(message + id)] = intent;
        }
    }

    static add_child(content, prev, message, id){
        const prev_intent = content[prev];
        if(prev_intent.project_id == id){
            if(!(prev_intent.children.has(message))){
                prev_intent.children.set(message, 0);
            }
            prev_intent.children.set(message, prev_intent.children.get(message) + 1);
            prev_intent.total_children += 1;
            content[prev] = prev_intent;
        }
    }
}
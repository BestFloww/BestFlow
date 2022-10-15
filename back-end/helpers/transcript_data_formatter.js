
export async function formatTranscipt(raw_transcript){
    let content = {};
    let prev = "";
    for(var index in raw_transcript["data"]){
        let entry = raw_transcript["data"][index];
        if(entry["trace_type"] == "text" || entry["trace_type"] == "speak"){
            let obj = JSON.parse(entry["trace_payload"]);
            let message = obj.payload.message;
            let id = entry["project_id"]
            if(!((message + id) in content)){
                let intent = {question: message, children: new Map(),total_children: 0, project_id: id};
                content[(message + id)] = intent;
            }

            if(prev in content){
                let prev_intent = content[prev];
                if(prev_intent.project_id == id){
                    if(!(prev_intent.children.has(message))){
                        prev_intent.children.set(message, 0);
                    }
                    prev_intent.children.set(message, prev_intent.children.get(message)+1);
                    prev_intent.total_children += 1;
                    content[prev] = prev_intent;
                }
            }
            prev = (message+id);
        }
    }
    return Object.values(content);
}
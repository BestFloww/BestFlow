import TranscriptFactory from "./transcriptFactory.js";
describe("formatTranscript", () => {
    it("checks", () => {
        const a = TranscriptFactory.generateSingleEntry("yWBrsfuFya", "speak", "a", "Alexa");
        const b3 = TranscriptFactory.generateSingleEntry("yWBrsfuFya", "speak", "b3", "Alexa");
        const b6 = TranscriptFactory.generateSingleEntry("yWBrsfuFya", "speak", "b6", "Alexa");
        const c = TranscriptFactory.generateSingleEntry("yWBrsfuFya", "speak", "c", "Alexa");
        const d = TranscriptFactory.generateSingleEntry("yWBrsfuFya", "speak", "d", "Alexa", true);
        const e = TranscriptFactory.generateSingleEntry("yWBrsfuFya", "speak", "e", "Alexa", true);
        // First create all nodes of your tree passing id, type, message, name(if type = speack), true(if the node is a leaf)
        const ct = TranscriptFactory.generateTranscript(c, [[1,d]])
        // Working from leaves upwards create partial transcript for every node that is not a leaf.
        // give the created root of that tree as the first input 
        // Second input is more confusing. you should pass a list of lists 
        // each inner list has the number of occurrence of and the child node. 
        // the number of occurrence doesn't need to be exact. think of it kinda as RV :)) 
        // you can costumize that number to get the persentages you want
        const b6t = TranscriptFactory.generateTranscript(b6, [[1,ct]])
        const b3t = TranscriptFactory.generateTranscript(b3, [[1,e]])
        const at = TranscriptFactory.generateTranscript(a, [[2,b6t],[1,b3t]]) 
    });
});
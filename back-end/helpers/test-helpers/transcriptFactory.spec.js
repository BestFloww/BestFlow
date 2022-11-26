import TranscriptFactory from "./transcriptFactory.js";
describe("formatTranscript", () => {
    it("checks", () => {
        const a = TranscriptFactory.generateSingleEntry("yWBrsfuFya", "speak", "a", "Alexa");
        const b3 = TranscriptFactory.generateSingleEntry("yWBrsfuFya", "speak", "b3", "Alexa");
        const b6 = TranscriptFactory.generateSingleEntry("yWBrsfuFya", "speak", "b6", "Alexa");
        const c = TranscriptFactory.generateSingleEntry("yWBrsfuFya", "speak", "c", "Alexa");
        const d = TranscriptFactory.generateSingleEntry("yWBrsfuFya", "speak", "d", "Alexa", true);
        const e = TranscriptFactory.generateSingleEntry("yWBrsfuFya", "speak", "e", "Alexa", true);
        const ct = TranscriptFactory.generateTranscript(c, [[1,d]])
        const b6t = TranscriptFactory.generateTranscript(b6, [[1,ct]])
        const b3t = TranscriptFactory.generateTranscript(b3, [[1,e]])
        const at = TranscriptFactory.generateTranscript(a, [[2,b6t],[1,b3t]]) 
    });
});
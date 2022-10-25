import {InputBoundaryInterface} from "../interfaces/input-boundary-interface.js";

export default class TranscriptIntentFormatter extends InputBoundaryInterface{
    async formatTranscript(rawTranscript){
        await rawTranscript.findAndModify(".","-DOT-");
        let formattedTranscript = JSON.parse(rawTranscript);
        formattedTranscript = JSON.parse(formattedTranscript.transcript);
        return formattedTranscript;
    }
}
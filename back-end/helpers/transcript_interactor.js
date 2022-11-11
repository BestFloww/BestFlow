import {InputBoundaryInterface} from "../interfaces/input-boundary-interface.js";
import IntentAnalyzer from "./intent_analyzer.js";
import TranscriptFormatter from "./transcript_data_formatter.js";
import OutputDataBoundary from "./output_data_boundary.js";
import { IntentInterface } from "../interfaces/intent-interface.js";

let analyzer = new IntentAnalyzer();

export default class TranscriptInteractor extends InputBoundaryInterface{
    static #IntentDao;

    static setIntentDao(dao){
        if(dao instanceof IntentInterface){
            this.#IntentDao = dao;
            this.#IntentDao.addListener('postIntent', (response) => {
                OutputDataBoundary.setOutput(response);
            });
            this.#IntentDao.addListener('getIntent', (response) => {
                const analyzed_response = analyzer.analyzeIntents(response);
                OutputDataBoundary.setOutput(analyzed_response);
            });
        } else {
            throw new Error("not an IntentInterface");
        }
    }

    static async getTranscript(query){
        const res = await this.#IntentDao.getIntent(query);
    }

    static async formatTranscript(rawTranscript, override = false){
        try{
            rawTranscript = rawTranscript.replaceAll(".", "-DOT-");
            let formattedTranscript = JSON.parse(rawTranscript);
            formattedTranscript = JSON.parse(formattedTranscript.transcript);
            const finalTranscript = await TranscriptFormatter.formatTranscript(formattedTranscript);
            const res = await this.#IntentDao.postIntents(finalTranscript, override);
        } catch (e) {
            return {error: e};
        }
    }
}
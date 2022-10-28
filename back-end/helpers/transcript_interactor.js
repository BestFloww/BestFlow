import {InputBoundaryInterface} from "../interfaces/input-boundary-interface.js";
import TranscriptFormatter from "./transcript_data_formatter.js";
import OutputDataBoundary from "./output_data_boundary.js";

export default class TranscriptInteractor extends InputBoundaryInterface{
    static #intentDao;

    static setIntentDao(dao){
        if(dao.isIntentInterface){
            this.#intentDao = dao;
            this.#intentDao.addListener('postIntent', (response) => {
                OutputDataBoundary.setOutput(response);
            });
            this.#intentDao.addListener('getIntent', (response) => {
                OutputDataBoundary.setOutput(response);
            });
        } else {
            throw new Error("not an IntentInterface");
        }
    }

    static async getTranscript(query){
        const res = await this.#intentDao.getIntent(query);
    }

    static async formatTranscript(rawTranscript){
        try{
            rawTranscript = rawTranscript.replaceAll(".", "-DOT-");
            let formattedTranscript = JSON.parse(rawTranscript);
            formattedTranscript = JSON.parse(formattedTranscript.transcript);
            const finalTranscript = await TranscriptFormatter.formatTranscript(formattedTranscript);
            const res = await this.#intentDao.postIntents(finalTranscript);
        } catch (e) {
            return {error: e};
        }
    }
}
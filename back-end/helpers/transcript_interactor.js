import {InputBoundaryInterface} from "../interfaces/input-boundary-interface.js";
import TranscriptFormatter from "./transcript_data_formatter.js";

export default class TranscriptInteractor extends InputBoundaryInterface{
    static #intentDao;

    static setIntentDao(dao) {
        if(dao.isIntentInterface){
            this.#intentDao = dao;
        } else {
            throw new Error("not an IntentInterface");
        }
    }

    static async getTranscript(query){
        return await this.#intentDao.getIntent(query);
    }

    static async formatTranscript(rawTranscript){
        try{
            rawTranscript = rawTranscript.replaceAll(".", "-DOT-");
            let formattedTranscript = JSON.parse(rawTranscript);
            formattedTranscript = JSON.parse(formattedTranscript.transcript);
            const finalTranscript = await TranscriptFormatter.formatTranscript(formattedTranscript)
            await this.#intentDao.postIntents(finalTranscript);
        } catch (e) {
            return {error: e};
        }
    }


}
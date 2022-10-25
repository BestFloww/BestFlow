import {InputBoundaryInterface} from "../interfaces/input-boundary-interface.js";
import TranscriptFormatter from "./transcript_data_formatter.js";

export default class TranscriptIntentFormatter extends InputBoundaryInterface{
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

    async formatTranscript(rawTranscript){
        await rawTranscript.findAndModify(".","-DOT-");
        let formattedTranscript = JSON.parse(rawTranscript);
        formattedTranscript = JSON.parse(formattedTranscript.transcript);
        const finalTranscript = TranscriptFormatter.formatTranscript(formattedTranscript)
        await this.#intentDao.postIntents(finalTranscript);
    }


}
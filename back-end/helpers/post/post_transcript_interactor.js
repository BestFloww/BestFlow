import { FormatTranscriptInterface } from "../../interfaces/format-transcript-interface.js";
import TranscriptFormatter from "./transcript_data_formatter.js";
import OutputDataBoundary from "../general/output_data_boundary.js";
import { IntentInterface } from "../../interfaces/intent-interface.js";

export default class PostTranscriptInteractor extends FormatTranscriptInterface{
    static #IntentDao;

    static setIntentDao(dao){
        if(dao instanceof IntentInterface){
            this.#IntentDao = dao;
            this.#IntentDao.addListener('postIntent', (response) => {
                OutputDataBoundary.setOutput(response);
            });
        } else {
            throw new Error("not an IntentInterface");
        }
    }

    static async formatTranscript(rawTranscript){
        try{
            rawTranscript = rawTranscript.replaceAll(".", "-DOT-");
            let formattedTranscript = JSON.parse(rawTranscript);
            const override = formattedTranscript.override;
            formattedTranscript = JSON.parse(formattedTranscript.transcript);
            const finalTranscript = await TranscriptFormatter.formatTranscript(formattedTranscript);
            const res = await this.#IntentDao.postIntents(finalTranscript, override);
        } catch (e) {
            return {error: e};
        }
    }
}
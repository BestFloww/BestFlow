import { TranscriptFormatter } from "../../helpers/transcript_data_formatter.js";
import {IntentInterface} from "../../interfaces/intent-interface.js";

export default class TranscriptController {
    static #intentDao;

    static setIntentDao(dao) {
        if(dao.isIntentInterface){
            this.#intentDao = dao;
        } else {
            throw new Error("not an IntentInterface");
        }
    }

    static async getTranscript(req, res, next) {

        const query = req.body;
        const {intentList} = await this.#intentDao.getIntent(query);

        res.json(intentList);
    }

    static async postTranscript(req, res, next) {
        try {
            const content = await TranscriptFormatter.formatTranscript(req.body);

            const transcriptResponse = await this.#intentDao.postIntents(content);
            res.status(200).json({ message: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}
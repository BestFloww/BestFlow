import {IntentInterface} from "../../interfaces/intent-interface.js";
import {TranscriptDataInterface} from "../../interfaces/transcript-data-interface.js";

export default class TranscriptController {
    static #intentDao;
    static #transcriptFormatter;

    static setIntentDao(dao) {
        if(dao.isIntentInterface){
            this.#intentDao = dao;
        } else {
            throw new Error("not an IntentInterface");
        }
    }

    static setTranscriptFormatter(formatter) {
        if(formatter.isTranscriptDataInterface){
            this.#transcriptFormatter = formatter;
        } else {
            throw new Error("not a TranscriptDataInterface");
        }
    }

    static async getTranscript(req, res, next) {

        const query = req.body;
        const {intentList} = await this.#intentDao.getIntent(query);

        res.json(intentList);
    }

    static async postTranscript(req, res, next) {
        try {
            const body = JSON.stringify(req.body.payload);
            const transcript = JSON.parse(body);
            const content = await this.#transcriptFormatter.formatTranscript(transcript);
            await this.#intentDao.postIntents(content);
            res.status(200).json({ message: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}
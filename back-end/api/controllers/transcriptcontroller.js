import intentDao from "../../dao/intentdao.js";
import transcriptDataFormatter from "../../formatter/transcript_data_formatter.js";

export default class TranscriptController {
    static async getTranscript(req, res, next) {

        const {intentList} = await intentDao.getIntent({});

        res.json(intentList);
    }

    static async postTranscript(req, res, next) {
        try {
            const content = await transcriptDataFormatter.formatTranscript(req.body);

            const transcriptResponse = await intentDao.postIntents(content);
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}
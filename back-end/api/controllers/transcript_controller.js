import {InputBoundaryInterface} from "../../interfaces/input-boundary-interface.js";

export default class TranscriptController {
    static #transcriptInteractor;

    static setTranscriptInteractor(interactor) {
        if(interactor.isInputBoundaryInterface){
            this.#transcriptInteractor = interactor;
        } else {
            throw new Error("not a InputBoundaryInterface");
        }
    }

    static async getTranscript(req, res, next) {

        const query = req.body;
        const {intentList} = await this.#transcriptInteractor.getTranscript(query);

        res.json(intentList);
    }

    static async postTranscript(req, res, next) {
        try {
            const body = JSON.stringify(req.body.payload);
            const transcript = JSON.parse(body);
            await this.#transcriptInteractor.formatTranscript(transcript);
            res.status(200).json({ message: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}
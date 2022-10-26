import {InputBoundaryInterface} from "../../interfaces/input-boundary-interface.js";

export default class TranscriptController {
    static #inputBoundary;

    static setTranscriptInteractor(interactor) {
        if(interactor.isInputBoundaryInterface){
            this.#inputBoundary = interactor;
        } else {
            throw new Error("not a InputBoundaryInterface");
        }
    }

    static async getTranscript(req, res, next) {

        const query = req.body;
        const {intentList} = await this.#inputBoundary.getTranscript(query);

        res.json(intentList);
    }

    static async postTranscript(req, res, next) {
        try {
            const body = JSON.stringify(req.body.payload);
            const transcript = JSON.parse(body);
            await this.#inputBoundary.formatTranscript(transcript);
            res.status(200).json({ message: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}
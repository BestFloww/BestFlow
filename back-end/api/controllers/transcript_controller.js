export default class TranscriptController {
    static #inputBoundary;
    static #outputBoundary;

    static setTranscriptInteractor(interactor) {
        if(interactor.isInputBoundaryInterface){
            this.#inputBoundary = interactor;
        } else {
            throw new Error("not an InputBoundaryInterface");
        }
    }

    static setOutputBoundary(outputBoundary) {
        if(outputBoundary.isOutputBoundaryInterface){
            this.#outputBoundary = outputBoundary;
        } else {
            throw new Error("not an OutputBoundaryInterface");
        }
    }

    static async getTranscript(req, res, next) {
        const query = req.body;
        await this.#inputBoundary.getTranscript(query);
        const {intentList} = this.#outputBoundary.getOutput();
        res.json(intentList);
    }

    static async postTranscript(req, res, next) {
        try {
            const body = JSON.stringify(req.body.payload);
            const transcript = JSON.parse(body);
            await this.#inputBoundary.formatTranscript(transcript);
            const output = this.#outputBoundary.getOutput();
            const status = Object.keys(output)[0];
            res.status(status).json(output);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
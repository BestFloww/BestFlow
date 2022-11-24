export default class StarController {
    static #inputBoundary;
    static #outputBoundary;

    static setTranscriptInteractor(interactor) {
        if(interactor.isInputBoundaryInterface){
            this.#inputBoundary = interactor;
        } else {
            throw new Error("not an InputBoundary");
        }
    }

    static setOutputBoundary(outputBoundary) {
        if(outputBoundary.isOutputBoundaryInterface){
            this.#outputBoundary = outputBoundary;
        } else {
            throw new Error("not an OutputBoundary");
        }
    }

    static async putStar(req, res, next) {
        try {
            const body = req.body;
            const question = body.question;
            const projectId = body.projectId;
            const starStatus = body.starStatus;
            await this.#inputBoundary.setStarStatus({question: question, project_id: projectId},{star: starStatus})
            const output = this.#outputBoundary.getOutput();
            const status = output.status;
            res.status(status).json(output);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

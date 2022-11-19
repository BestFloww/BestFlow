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
            const question = req.body.question;
            const projectId = req.body.projectId;
            const starStatus = req.body.status;
            await this.#inputBoundary.setStarStatus({question: question, project_id: projectId},{star: starStatus})
            const output = this.#outputBoundary.getOutput();
            const status = output.status;
            res.status(status).json(output);
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: e.message });
        }
    }
}

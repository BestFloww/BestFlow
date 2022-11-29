export default class FlagController {
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

    static async putFlag(req, res, next) {
        try {
            const body = req.body;
            const question = body.question.replaceAll(".", "-DOT-");
            const projectId = body.projectId;
            const flagStatus = body.flagStatus;
            await this.#inputBoundary.setFlagStatus({question: question, project_id: projectId},{flag: flagStatus})
            const output = this.#outputBoundary.getOutput();
            const status = output.status;
            res.status(status).json(output);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

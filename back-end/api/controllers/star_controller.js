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

    static async getSth(req, res, next) {
        pass
    }

    static async postSth(req, res, next) {
        try {
            pass
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}

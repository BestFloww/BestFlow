import {InputBoundaryInterface} from "../../interfaces/input-boundary-interface.js";
import IntentAnalyzer from "./intent_analyzer.js";
import OutputDataBoundary from "../general/output_data_boundary.js";
import { IntentInterface } from "../../interfaces/intent-interface.js";

let analyzer = new IntentAnalyzer();

export default class GetTranscriptInteractor extends InputBoundaryInterface{
    static #IntentDao;

    static setIntentDao(dao){
        if(dao instanceof IntentInterface){
            this.#IntentDao = dao;
            this.#IntentDao.addListener('getIntent', (response) => {
                const analyzed_response = analyzer.analyzeIntents(response);
                OutputDataBoundary.setOutput(analyzed_response);
            });
        } else {
            throw new Error("not an IntentInterface");
        }
    }

    static async getTranscript(query){
        console.log(query.projectId)
        analyzer.group = query.useMerger == "true";
        const res = await this.#IntentDao.getIntent({project_id : query.projectId});
    }
}
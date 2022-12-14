import { SetFlagInterface } from "../../interfaces/set-flag-interface.js";
import OutputDataBoundary from "../general/output_data_boundary.js";
import { IntentInterface } from "../../interfaces/intent-interface.js";

export default class PutFlagInteractor extends SetFlagInterface{
    static #IntentDao;

    static setIntentDao(dao){
        if(dao instanceof IntentInterface){
            this.#IntentDao = dao;
            this.#IntentDao.addListener('putIntent', (response) => {
                OutputDataBoundary.setOutput(response);
            });
        } else {
            throw new Error("not an IntentInterface");
        }
    }

    static async setFlagStatus(filter, status){
        try{
            const res = await this.#IntentDao.putIntent(filter, status);
        } catch (e) {
            return {error: e};
        }
    }
}
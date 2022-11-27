import TranscriptDataGrouper from "./transcript_data_grouper.js";
import IntentDao from "../../dao/intentdao.js";

export default class IntentAnalyzer{

    group = false;

    async analyzeIntents(models) {
        const newIntents = [];
        if (this.group) {
            this.grouper = new TranscriptDataGrouper(newIntents, models[0].project_id);
            TranscriptDataGrouper.setIntentDao(new IntentDao());
        }

        for (const model of models) {
            const result = await this.#formatModel(model);
            if (result) {
                newIntents.push(result);
            }
        }
        return newIntents;
    }

    async #formatModel(model) {//Formats the mongoose model into desired array for IntentLister to use
        let percentageMap;
        if (model.total_children == 0) {
            percentageMap = {"No intents found.": 0};
        } else {
            percentageMap = this.#replacePeriods(model.getPercentages());
        }

        const intents = {
            question: model.question.replaceAll("-DOT-", "."),
            children: percentageMap
        }
        let result = false
        if (this.group) {
            result = await this.grouper.group(intents);
        }
        return result ? null : intents;
    }

    #replacePeriods(map) {
        const newMap = {};
        Object.entries(map).forEach(([intent, percentage]) => {
            const replacedIntent = intent.replaceAll("-DOT-", ".")
            newMap[replacedIntent] = +(percentage * 100); //casting .toFixed() string into a float
        });
        return newMap;
    }
}
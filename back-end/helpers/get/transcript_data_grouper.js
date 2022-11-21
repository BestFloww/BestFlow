import { IntentInterface } from "../../interfaces/intent-interface.js";

const titles = ["MR", "MS", "MX", "MRS", "DR"]

export default class TranscriptDataGrouper {

    static #IntentDao;

    constructor(transcript, project_id) {
        this.transcript = transcript;
        this.project_id = project_id;
    }

    static setIntentDao(dao){
        if(dao instanceof IntentInterface){
            this.#IntentDao = dao;
        } else {
            throw new Error("not an IntentInterface");
        }
    }


    async group(intent) {
        this.intent = intent;
        for (const comparedIntent of this.transcript) {
            if (this.#generateSimilarityScore(comparedIntent) >= 0.9) {
                try {
                    await this.#mergeIntent(comparedIntent);
                    return true;
                } catch (e) {
                    console.log(e.message)
                    return false;
                }
            }
        }
        return false;
    }

    /**
     * @param Object Formatted intent to compare to
     * @return number in [0, 1]
     */
    #generateSimilarityScore(comparedIntent) {
        const splitIntent1 = this.intent.question.split(" ");
        const splitIntent2 = comparedIntent.question.split(" ");
        this.differentWordsIndices = [];

        // If the length is significantly different we do not want to merge
        if (Math.abs(splitIntent1.length - splitIntent2.length) > 3) {
            return 0;
        }

        // Set a current score and let it decrement by 1 * weight each time a word is different
        const DECREMENTOR = 1;
        let score = splitIntent1.length;

        // Set the weight of how much each difference matters
        let weight = 1;
        if (splitIntent1.length < 10) {
            weight = 0.5;
        }

        // We use index to give us a greater control of manipulation over both arrays
        let index1 = 0;
        let index2 = 0;

        while (index1 < splitIntent1.length && index2 < splitIntent2.length) {
            if (splitIntent1[index1] !== splitIntent2[index2] && splitIntent2 !== "[merged]") {
                score -= weight * DECREMENTOR;
                this.differentWordsIndices.push(index1);

                // Attempt to not be off-by-1 index for names by identifying titles
                if (titles.includes(splitIntent1[index1].toUpperCase())) {
                    index1 += 1;
                }
                if (titles.includes(splitIntent2[index2].toUpperCase())) {
                    index2 += 1;
                }
            }
            index1 += 1;
            index2 += 1;
        }
        return score / splitIntent1.length;
    }

    /**
     * @param Object Formatted intent to merge to
     * Merges 2 intents
     */
    async #mergeIntent(comparedIntent) {
        if (comparedIntent.previousIntents) {
            let original = JSON.parse(JSON.stringify(comparedIntent.previousIntents[0]));
            for (let i = 1; i < comparedIntent.previousIntents.length; i++) {
                await this.#recalculatePercentages(comparedIntent.previousIntents[i], original);
            }
            original.previousIntents = comparedIntent.previousIntents;
            comparedIntent = original;
        } else {
            comparedIntent.previousIntents = [];
            const copyComparedIntent = JSON.parse(JSON.stringify(comparedIntent))
            comparedIntent.previousIntents.push(copyComparedIntent);
        }

        await this.#recalculatePercentages(this.intent, comparedIntent)

        const splitIntent = comparedIntent.question.split(" ");
        for (const index of this.differentWordsIndices) {
            splitIntent[index] = "[merged]";
        }

        if (this.differentWordsIndices.length > 0) {
            comparedIntent.question = splitIntent.join(" ");
        }

        const copyIntent = JSON.parse(JSON.stringify(this.intent))
        comparedIntent.previousIntents.push(copyIntent);

    }

    async #mergingTwoIntents(comparedIntent) {

    }


    /**
    * @param Object Formatted intent to merge percentages
     * Recalculates the percentage of the compared intent based on the original model
     */
    async #recalculatePercentages(intent, comparedIntent) {
        const originalMergingIntent = await TranscriptDataGrouper.#IntentDao.getIntent({question: intent.question, project_id: this.project_id})[0];
        const targetIntent = await TranscriptDataGrouper.#IntentDao.getIntent({question: comparedIntent.question, project_id: this.project_id})[0];

        const mergedMap = targetIntent.children;
        const newChildren = originalMergingIntent.children;

        // add all the children of mergedMap to newChildren (merge the intents)
        for (const [question, num] of newChildren) {
            if (!(mergedMap.has(question))) {
                mergedMap.set(question, 0);
            }
            const newWeight = mergedMap.get(question) + num;
            mergedMap.set(question, newWeight);
        }

        const percentageMap = {};
        const total_children = targetIntent.total_children + originalMergingIntent.total_children;

        // Calculate the new percentages for the merged intents
        for (const [question, num] of mergedMap) {
            const newPercentage = (num / total_children).toFixed(2) * 100;
            percentageMap[question] = newPercentage;
        }

        comparedIntent.children = percentageMap;
        comparedIntent.total_children = total_children;
    }
}
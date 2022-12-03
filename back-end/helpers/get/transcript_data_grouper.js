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
                (comparedIntent)
                try {
                    await this.#mergeIntent(comparedIntent);
                    (comparedIntent)
                    ("-----")
                    return true;
                } catch (e) {
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
     * @param {Object} comparedIntent Formatted intent to merge to
     * Merges 2 intents
     */
    async #mergeIntent(comparedIntent) {
        const originalIntent = comparedIntent.question;
        if (!comparedIntent.previousIntents) {
            comparedIntent.previousIntents = [];
        }
        // Create a deep copy of the previous intents
        const originalPreviousIntents = comparedIntent.previousIntents.map((intent) => {return {question: intent.question}});
        let newlyMergedIntent = {
            question: comparedIntent.question, 
            previousIntents: [],
        };
        if (comparedIntent.previousIntents.length > 0){
            newlyMergedIntent = comparedIntent.previousIntents[0];
            // initialize a new comparedIntents array with just the base intent
        } else {
            newlyMergedIntent.previousIntents.push({question: comparedIntent.question});
        }
        // Calculate percentages of each intent previously merged with the original
        const allMergedMaps = [];
        for (let i = 0; i + 1 < comparedIntent.previousIntents.length; i+= 2) {
            const mergedQuestions = await this.#mergeTwoQuestions(comparedIntent.previousIntents[i], comparedIntent.previousIntents[i + 1]);
            allMergedMaps.push(mergedQuestions);
        }
        if (comparedIntent.previousIntents.length % 2 === 1) {
            // push the odd map
            const question = comparedIntent.previousIntents[comparedIntent.previousIntents.length - 1];
            let children = await TranscriptDataGrouper.#IntentDao.getImmediateIntent({question: question.question.replaceAll(".", "-DOT-"), project_id: this.project_id});
            children = children[0].children; 
            allMergedMaps.push(children);
        }


        // calculate the new children maps with newlyMergedIntent
        let mergedMap;
        newlyMergedIntent.previousIntents = originalPreviousIntents; 
        if (comparedIntent.previousIntents.length === 0) {
            mergedMap = await this.#mergeTwoQuestions(this.intent, comparedIntent);
        } else {
            // merge all the previous maps
            mergedMap = allMergedMaps[0];
            for (let i = 1; i < allMergedMaps.length; i++) {
                mergedMap = this.#mergeMap(mergedMap, allMergedMaps[i]);
            }
            // merge with the new intent
            let newIntent = await TranscriptDataGrouper.#IntentDao.getImmediateIntent({question: this.intent.question.replaceAll(".", "-DOT-"), project_id: this.project_id});
            newIntent = newIntent[0];
            mergedMap = this.#mergeMap(mergedMap, newIntent.children);
        }
        
        // now calculate the percentages
        const {percentageMap, total_children} = this.#getPercentages(mergedMap)
        // set them to newlyMergedIntent so they can be transferred to comparedIntent
        comparedIntent.children = percentageMap;
        comparedIntent.total_children = total_children;

        // replace matching strings with [merged]
        const splitIntent = comparedIntent.question.split(" ");
        const mergedQuestion = this.intent.question;
        for (const index of this.differentWordsIndices) {
            splitIntent[index] = "[merged]";
        }

        if (this.differentWordsIndices.length > 0) {
            comparedIntent.question = splitIntent.join(" ");
        }

        // add to previous intents as necessary
        comparedIntent.previousIntents.push({question: mergedQuestion});
        if (comparedIntent.previousIntents.length === 1) {
            comparedIntent.previousIntents.push({question: originalIntent});
        }
    }

    async #mergeTwoQuestions(intent1, intent2) {
        // need to replace "." for mongodb
        let originalMergingIntent = await TranscriptDataGrouper.#IntentDao.getImmediateIntent({question: intent1.question.replaceAll(".", "-DOT-"), project_id: this.project_id});
        let targetIntent = await TranscriptDataGrouper.#IntentDao.getImmediateIntent({question: intent2.question.replaceAll(".", "-DOT-"), project_id: this.project_id});
        targetIntent = targetIntent[0];
        originalMergingIntent = originalMergingIntent[0];

        if (!targetIntent && !originalMergingIntent) {
            return new Map();
        } else if (!targetIntent) {
            return originalMergingIntent.children;
        } else if (!originalMergingIntent) {
            return targetIntent.childrenl
        }

        const mergedMap = targetIntent.children;
        const newChildren = originalMergingIntent.children;


        // add all the children of mergedMap to newChildren (merge the intents)
        return this.#mergeMap(newChildren, mergedMap);
    }

    /**
    * @param {Object} target map being merged into
    * @param {Object} merger map being merged out of
    * Merges 2 maps into target
    * @return the combined maps
    */
    #mergeMap(target, merger) {
        for (const [question, num] of merger) {
            if (!(target.has(question))) {
                target.set(question, 0);
            }
            const newWeight = target.get(question) + num;
            target.set(question, newWeight);
        }
        return target;
    }

    /**
    * @param {Map} map map being turned into percentageMap
    * @return {Object} percentageMap 
    */
     #getPercentages(map) {
        const percentageMap = {};
        let total_children = 0;

        for (const [_, num] of map) {
            total_children += num;
        }
        // Calculate the new percentages for the merged intents
        for (const [question, num] of map) {
            const newPercentage = Math.round((num / total_children).toFixed(2) * 100);
            percentageMap[question.replaceAll("-DOT-", ".")] = newPercentage;
        }
        
        return {percentageMap, total_children};
    }
}
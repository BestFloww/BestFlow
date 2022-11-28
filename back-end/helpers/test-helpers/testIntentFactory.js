/* istanbul ignore file */
export default class TestIntentFactory {
    generateModel(questionMsg, intents, total_intents, id) {
        const generatedModel = {
            question: questionMsg,
            children: intents,
            total_children: total_intents,
            project_id: id,
            getPercentages: jest.fn(),
            star: false,
            flag: false
        };
        return generatedModel;
    };

    generateAnalyzedIntent(questionMsg, intents) {
        const generatedIntent = {
            question: questionMsg,
            children: intents,
            star: false,
            flag: false
        };

        return generatedIntent;
    }

    generateMultipleIntents(intentInputs) {
        const intents = []

        intentInputs.forEach((input) => {intents.push(this.generateAnalyzedIntent(input[0], input[1]))})

        return intents;
    }
}
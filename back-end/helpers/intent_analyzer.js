export default class IntentAnalyzer{
  analyzeIntents(models) {
      const newIntents = [];

      for (const model of models) {
        newIntents.push(this.formatModel(model))
      }

      return newIntents;
    }

  formatModel(model) {//Formats the mongoose model into desired array for IntentLister to use
    let percentageMap;
    if (model.total_children == 0) {
      percentageMap = {"No intents found.": 0};
    } else {
      percentageMap = this.replacePeriods(model.getPercentages());
    }

    const intents = {
      question: model.question.replace("-DOT-", "."),
      children: percentageMap
    }

    return intents;
  }

  replacePeriods(map) {
    const newMap = {};
    Object.entries(map).forEach(([intent, percentage]) => {
        const replacedIntent = intent.replace("-DOT-", ".")
        newMap[replacedIntent] = +(percentage); //casting .toFixed() string into a float
    });
    return newMap;
  }
}
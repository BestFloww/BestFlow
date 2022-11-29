export default class IntentAnalyzer{
  analyzeIntents(models) {
      const newIntents = [];

      for (const model of models) {
        newIntents.push(this.formatModel(model));
      }
      return newIntents;
    }

  formatModel(model) {//Formats the mongoose model into desired array for IntentLister to use
    let percentageMap;
    if (model.total_children == 0) {
      percentageMap = {"[END OF CONVERSATION]": 0};
    } else {
      percentageMap = this.replacePeriods(model.getPercentages());
    }

    const intents = {
      question: model.question.replaceAll("-DOT-", "."),
      children: percentageMap,
      star: model.star,
      flag: model.flag
    };

    return intents;
  }

  replacePeriods(map) {
    const newMap = {};
    Object.entries(map).forEach(([intent, percentage]) => {
        const replacedIntent = intent.replaceAll("-DOT-", ".")
        newMap[replacedIntent] = parseFloat(percentage); //casting .toFixed() string into a float
    });
    return newMap;
  }
}
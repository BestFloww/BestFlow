export default class IntentAnalyzer{
    analyzeIntents(models) {
      let newIntents = [];

      for (let model in models) {
        newIntents.push(this.formatModel(model))
      }

      return newIntents;
    }

  formatModel(model) {//Formats the mongoose model into desired array for IntentLister to use
    let percentageMap;

    if (model.total_children == 0) {
      percentageMap = {"No intents found.": 0};
    }
    else {
      percentageMap = this.replacePeriods(model.getPercentages());
    }

    const intents = {
      question: model.question.replace("-DOT-", "."),
      children: percentageMap
    }

    return intents;
  }

  replacePeriods(map) {
    let newMap = {};
    map.forEach((percentage, intent) => {
        let replacedIntent = intent.replace("-DOT-", ".")
        newMap[replacedIntent] = percentage;
    });
    return newMap;
  }
}
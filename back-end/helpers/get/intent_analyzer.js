import TranscriptDataGrouper from "./transcript_data_grouper.js";

export default class IntentAnalyzer{

  groupIntents = false;

  async analyzeIntents(models) {
      this.newIntents = [];

      if (this.groupIntents) {
        this.grouper = new TranscriptDataGrouper(this.newIntents, models[0].project_id);
      }

      for (const model of models) {
        const result = await this.formatModel(model);
        this.newIntents.push(result);
      }

      // filter out nulls
      return this.newIntents.filter((intent) => intent);
    }

  async formatModel(model) {//Formats the mongoose model into desired array for IntentLister to use
    let percentageMap;
    if (model.total_children == 0) {
      percentageMap = {"No intents found.": 0};
    } else {
      percentageMap = this.#replacePeriods(model.getPercentages());
    }

    const intent = {
      question: model.question.replace("-DOT-", "."),
      children: percentageMap
    }

    if (this.grouper) {
      const intentWasMerged = await this.grouper.group(intent, model);
      return intentWasMerged ? null : intent;
    }

    return intent;
  }

  #replacePeriods(map) {
    const newMap = {};
    Object.entries(map).forEach(([intent, percentage]) => {
        const replacedIntent = intent.replace("-DOT-", ".")
        newMap[replacedIntent] = +(percentage * 100); //casting .toFixed() string into a float
    });
    return newMap;
  }
}
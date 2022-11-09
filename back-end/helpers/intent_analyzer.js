export default class IntentAnalyzer{
    /* What it should result in:
    [
        {
          question: "What is something that Waluigi and Wario often say?",
          children: {
            "The brothers Waluigi and Wario have their catchphrase 'waaa'.": 100,
          }
        },
        {
          question: "Where should I go for a good time and great learning experience?",
          children: {
            "You should go to the University of Toronto.": 10,
            "You should go to the Technology Leadership Initiative.": 90
          }
        }, 
        {
          question: "Hey BestFlow, what time is it?",
          children: {
            "It's time for you to get a watch, would you like to take a look at our product?": 10,
            "Showtime showtime what I'm John Laurens in the place to be.": 20,
            "Summertime! School's out, scream and shout.": 70
          }
        }
    ]
      */

    static async formatIntents(intents) { // Formats the mongoose Model into desired array for IntentLister to use
      if (Object.keys(intents).length == 0) {
        return {};
      }

      var percentageMap;
      if (intents.total_children == 0) {
        percentageMap = {"No intents found.": 0};
      }
      else {
        percentageMap = replacePeriods(intents.getPercentages());
      }

      var analyzedIntents = intents.map(intent => ({
          question: intent.question.replace("-DOT-", "."),
          children: percentageMap
      }));
      return analyzedIntents;
    }

    static async replacePeriods(map) {
      var newMap = {};
      map.forEach((percentage, intent) => {
          var replacedIntent = intent.replace("-DOT-", ".")
          newMap[replacedIntent] = percentage;
      });
      return newMap;
    }
}
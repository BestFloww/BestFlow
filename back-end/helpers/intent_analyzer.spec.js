import TestIntentFactory from "./test-helpers/testIntentFactory.js";
import IntentAnalyzer from "./intent_analyzer.js"

let analyzer;
let factory;

const getPercentages = ((children, total_children) => {
  const percentageMap = {}
    children.forEach((numTimesCalled, intent) => {
      percentageMap[intent] = (numTimesCalled / total_children).toFixed(2);
    })
    return percentageMap;
})

describe("intentAnalyzer", () => {
  beforeEach(() => {
    analyzer = new IntentAnalyzer();
    factory = new TestIntentFactory();
  });

  it("Should return an empty array if given no model", () => {
    expect(analyzer.analyzeIntents([])).toStrictEqual([]);
  });

  it("Should properly format one intent", () => {
    const fakeMap = new Map();
    fakeMap.set("Intent 1-DOT-", 1);
    const input = factory.generateModel("Question 1-DOT-", fakeMap, 1, 1);
    input.getPercentages.mockImplementation(() => {return getPercentages(input.children, input.total_children)});
    const output = factory.generateAnalyzedIntent("Question 1.", {"Intent 1.": 100});

    expect(analyzer.analyzeIntents([input])).toStrictEqual([output]);
  });

  it("Should properly format three intents", () => {
    const fakeMap1 = new Map();
    fakeMap1.set("Intent 1-DOT-", 7);
    const fakeMap2 = new Map();
    fakeMap2.set("Intent 2-DOT-", 2);
    const fakeMap3 = new Map();
    fakeMap3.set("Intent 3-DOT-", 1);

    const input1 = factory.generateModel("Question 1-DOT-", fakeMap1, 7, 1);
    const input2 = factory.generateModel("Question 2-DOT-", fakeMap2, 2, 1);
    const input3 = factory.generateModel("Question 3-DOT-", fakeMap3, 1, 1);
    input1.getPercentages.mockImplementation(() => {return getPercentages(input1.children, input1.total_children)});
    input2.getPercentages.mockImplementation(() => {return getPercentages(input2.children, input2.total_children)});
    input3.getPercentages.mockImplementation(() => {return getPercentages(input3.children, input3.total_children)});

    const output = factory.generateMultipleIntents([["Question 1.", {"Intent 1.": 100}], ["Question 2.", {"Intent 2.": 100}], ["Question 3.", {"Intent 3.": 100}]]);
    expect(analyzer.analyzeIntents([input1, input2, input3])).toStrictEqual(output);
  });

  it("Should properly format question with no intents", () => {
    const input = factory.generateModel("Question 1-DOT-", {}, 0, 1);
    const output = factory.generateAnalyzedIntent("Question 1.", {"No intents found.": 0});
    expect(analyzer.analyzeIntents([input])).toStrictEqual([output]);
  });

  it("Should properly format question with multiple children", () => {
    const fakeMap = new Map();
    fakeMap.set("Intent 1-DOT-", 7);
    fakeMap.set("Intent 2-DOT-", 2);
    fakeMap.set("Intent 3-DOT-", 1);

    const input = factory.generateModel("Question 1-DOT-", fakeMap, 10, 1);
    input.getPercentages.mockImplementation(() => {return getPercentages(input.children, input.total_children)});
    const output = factory.generateAnalyzedIntent("Question 1.", {"Intent 1.": 70, "Intent 2.": 20, "Intent 3.": 10});

    expect(analyzer.analyzeIntents([input])).toStrictEqual([output]);
  })
})
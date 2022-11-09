import TestIntentGenerator from "./test-helpers/testIntentGenerator.js";
import IntentAnalyzer from "./intent_analyzer.js"

let analyzer;
let generator;

describe("intentAnalyzer", () => {
  beforeEach(() => {
    analyzer = new IntentAnalyzer();
    generator = new TestIntentGenerator();
  });

  it("Should return an empty array if given no model", async() => {
    expect(analyzer.analyzeIntents([])).toStrictEqual([]);
  });

  it("Should properly format one intent", async() => {
    const fakeMap = new Map();
    fakeMap.set("Intent 1-DOT-", 1);
    const input = generator.generateModel("Question 1-DOT-", fakeMap, 1, 1);
    input.getPercentages.mockImplementation(() => {return {"Intent 1-DOT-": 1}})
    const output = generator.generateAnalyzedIntent("Question 1.", {"Intent 1.": 1});

    expect(analyzer.analyzeIntents([input])).toStrictEqual(output);
  });

  it("Should properly format three intents", async() => {
    const fakeMap1 = new Map();
    fakeMap1.set("Intent 1-DOT-", 7);
    const fakeMap2 = new Map();
    fakeMap2.set("Intent 2-DOT-", 2);
    const fakeMap3 = new Map();
    fakeMap3.set("Intent 3-DOT-", 1);

    const input = generator.generateMultipleModels([["Question 1-DOT-", fakeMap1, 10, 1], ["Question 2-DOT-", fakeMap2, 10, 1], ["Question 3-DOT-", fakeMap3, 10, 1]]);
    input.getPercentages.mockImplementation(() => {return [{"Intent 1-DOT-": 7}, {"Intent 2-DOT-": 2}, {"Intent 3-DOT-": 1}]})

    const output = generator.generateMultipleIntents([["Question 1.", {"Intent 1": 7}], ["Question 2.", {"Intent 2": 2}], ["Question 3.", {"Intent 3": 1}]]);
    expect(analyzer.analyzeIntents(input)).toStrictEqual(output);
  });

  it("Should properly format question with no intents", async() => {
    const input = generator.generateModel("Question 1-DOT-", {}, 0, 1);
    const output = generator.generateAnalyzedIntent("Question 1.", {"No intents found.": 0});
    expect(analyzer.analyzeIntents([input])).toStrictEqual(output);
  });
})
import testIntentGenerator from "./test-helpers/testIntentGenerator.js";
import intentAnalyzer from "./intent_analyzer.js"

let generator;
let analyzer;
let getPercentages;

describe("intentAnalyzer", () => {
  beforeEach(() => {
    generator = new testIntentGenerator();
    analyzer = new intentAnalyzer();
    getPercentages = (model) => {
      const percentageMap = {}
      model.children.forEach((numTimesCalled, intent) => {
        percentageMap[intent] = (numTimesCalled / model.total_children).toFixed(2);
      });
      return percentageMap;
    }
  });

  it("Should return an empty array if given no model", async() => {
    expect(analyzer.analyzeIntents([])).toBe([]);
  });

  it("Should properly format one intent", async() => {
    const input = generator.generateOneIntentModel();
    const output = generator.generateOneAnalyzedIntent();
    expect(analyzer.analyzeIntents(input)).toStrictEqual(output);
  });

  it("Should properly format three intents", async() => {
    const input = generator.generateThreeIntentsModel();
    const output = generator.generateThreeAnalyzedIntents();
    expect(analyzer.analyzeIntents(input)).toStrictEqual(output);
  });

  it("Should properly format question with no intents", async() => {
    const input = generator.generateEmptyIntentModel();
    const output = generator.generateAnalyzedEmptyIntent();
    expect(analyzer.analyzeIntents(input)).toStrictEqual(output);
  });
})
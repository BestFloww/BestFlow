import testIntentGenerator from "./test-helpers/testIntentGenerator.js";
import intentAnalyzer from "./intent_analyzer.js"

let generator;

describe("intentAnalyzer", () => {
  beforeEach(() => {
    generator = new testIntentGenerator();
  })

  it("Should return an empty object if given no model", async() => {
    expect(intentAnalyzer.formatIntents([])).toBe({});
  });

  it("Should properly format one intent", async() => {
    const input = generator.generateOneIntentModel();
    const output = generator.generateOneAnalyzedIntent();
    expect(intentAnalyzer.formatIntents(input)).toStrictEqual(output);
  });

  it("Should properly format three intents", async() => {
    const input = generator.generateThreeIntentsModel();
    const output = generator.generateThreeAnalyzedIntents();
    expect(intentAnalyzer.formatIntents(input)).toStrictEqual(output);
  });

  it("Should properly format question with no intents", async() => {
    const input = generator.generateEmptyIntentModel();
    const output = generator.generateAnalyzedEmptyIntent();
    expect(intentAnalyzer.formatIntents(input)).toStrictEqual(output);
  });
})
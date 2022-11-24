import IntentSearch from "./IntentSearch.js";
import sampleIntents from '../test-data/sampleIntents.js';

let search;
let filteredIntents;
let searchSlices;
let sampleIntent;

describe("IntentSearch", () => {
  beforeEach(() => {
    search = new IntentSearch();
    filteredIntents = [];
    searchSlices = {};
    sampleIntent = sampleIntents[0];
  });

  describe("For approximateIndexOf", () => {
    it("should return the correct index if the searchString is in the targetString and the check would still pass if it were case-sensitive", () => {
      expect(search.approximateIndexOf("abcdef", "def")).toStrictEqual(3);
    });

    it("should return the correct index if the searchString is in the targetString but the check would not pass if it were case-sensitive", () => {
      expect(search.approximateIndexOf("abcdef", "DEF")).toStrictEqual(3);
    });

    it("should return 0 if the searchString is empty", () => {
      expect(search.approximateIndexOf("abcdef", "")).toStrictEqual(0);
    });

    it("should return -1 if the searchString is not in the targetString", () => {
      expect(search.approximateIndexOf("abcdef", "ghi")).toStrictEqual(-1);
    });
  });

  describe("For addFilteredIntent", () => {
    it("should add the intent to filteredIntents and map it to the proper indices in searchSlices if the searchString is non-empty and contained in the intent starting from index 0", () => {
      search.addFilteredIntent(sampleIntent, "Sample", filteredIntents, searchSlices);
      expect(filteredIntents).toStrictEqual([sampleIntent]);
      expect(searchSlices[sampleIntent.question]).toStrictEqual({ start: 0, end: 6 });
    });

    it("should add the intent to filteredIntents and map it to the proper indices in searchSlices if the searchString is non-empty and contained in the intent starting from a non-zero index", () => {
      search.addFilteredIntent(sampleIntent, "Intent", filteredIntents, searchSlices);
      expect(filteredIntents).toStrictEqual([sampleIntent]);
      expect(searchSlices[sampleIntent.question]).toStrictEqual({ start: 7, end: 13 });
    });

    it("should add the intent to filteredIntents and map it to zero indices in searchSlices if the searchString is empty", () => {
      search.addFilteredIntent(sampleIntent, "", filteredIntents, searchSlices);
      expect(filteredIntents).toStrictEqual([sampleIntent]);
      expect(searchSlices[sampleIntent.question]).toStrictEqual({ start: 0, end: 0 });
    });

    it("should not modify filteredIntents or searchSlices if the searchString is not contained in the intent", () => {
      search.addFilteredIntent(sampleIntent, "Bad search", filteredIntents, searchSlices);
      expect(filteredIntents).toStrictEqual([]);
      expect(searchSlices).toStrictEqual({});
    });
  });

  describe("For filterIntents", () => {
    it("should add no intents to filteredIntents or mappings to searchSlices if the searchString is contained in no intents", () => {
      expect(search.filterIntents(sampleIntents, "Bad search")).toStrictEqual({
        "filteredIntents": [],
        "searchSlices": {}
      });
    });

    it("should add the correct intent to filteredIntents and the correct mapping to searchSlices if the searchString is contained in 1 intents", () => {
      expect(search.filterIntents(sampleIntents, "Sample Intent 0")).toStrictEqual({
        "filteredIntents": [sampleIntents[0]],
        "searchSlices": {
          "Sample Intent 0 (special search substring)": { start: 0, end: 15 },
        }
      });
    });

    it("should add the correct intents to filteredIntents and the correct mappings to searchSlices if the searchString is contained in 2 intents", () => {
      expect(search.filterIntents(sampleIntents, "(special search substring)")).toStrictEqual({
        "filteredIntents": [sampleIntents[0], sampleIntents[1]],
        "searchSlices": {
          "Sample Intent 0 (special search substring)": { start: 16, end: 42 },
          "Sample Intent 1 (special search substring)": { start: 16, end: 42 },
        }
      });
    });
  });
});
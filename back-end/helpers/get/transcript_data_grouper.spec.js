import TranscriptDataGrouper from "./transcript_data_grouper.js";
import testIntentFactory from "../test-helpers/testIntentFactory.js";
import IntentDao from "../../dao/intentdao.js";

// create a very fake dao
const fakeDao = new IntentDao();
TranscriptDataGrouper.setIntentDao(fakeDao);

const mapMaker = (keysAndPairs) => {
    const result = new Map();
    for (const [key, value] of Object.entries(keysAndPairs)) {
        result.set(key, value);
    }
    return result;
};

describe("TranscriptDataGrouper", () => {
    let intents;
    jest.spyOn(fakeDao, "getIntent").mockImplementation((query) => {
        return intents.filter((intent) => {
            return intent.question === query.question && intent.project_id === query.project_id;
        });
    });
    describe("when intents are not similar", () => {
        // Create a variety of non-similar intents
        const baseFakeIntents = [
            {
                question: "hi I am Sam",
                children: mapMaker({
                    "h": 1,
                    "b": 2,
                }),
                total_children:3,
                project_id: 1,
            },
            {
                question: "hi I am not Bob sorry sorry sorry",
                children: mapMaker({
                    "h": 1,
                    "c": 2,
                }),
                total_children:3,
                project_id: 1,
            },
            {
                question: "hi I am Mr Bob but",
                children: mapMaker({
                    "h": 1,
                    "b": 2,
                }),
                total_children:3,
                project_id: 1,
            },
            {
                question: "This is not similar",
                children: mapMaker({
                    "h": 1,
                    "b": 2,
                }),
                total_children:3,
                project_id: 1,
            },
        ];
        beforeEach(() => {
            // create a new deep copy of the array each test to prevent bleeding
            intents = [];
            for (const fake of baseFakeIntents) {
                intents.push({...fake});
            }
        });
        it("should not merge 2 intents which are completely different", async() => {
            const alreadyProcessedIntents = intents.slice(0, 1);
            const dissimilarIntent = intents[3];
            const grouper = new TranscriptDataGrouper(alreadyProcessedIntents, 1)
            const result = await grouper.group(dissimilarIntent);
            expect(result).toBe(false);
            expect(fakeDao.getIntent).not.toHaveBeenCalled();
        });
    });
    describe("when intents are similar", () => {
        // Create fake intents where some should be merged, and some should not be
        const baseFakeIntents = [
            {
                question: "hi how are you I am Sam",
                children: mapMaker({
                    "h": 1,
                    "b": 2,
                }),
                total_children:3,
                project_id: 1,
            },
            {
                question: "hi how are you I am Bob",
                children: mapMaker({
                    "h": 1,
                    "c": 2,
                }),
                total_children:3,
                project_id: 1,
            },
            {
                question: "hi how are you I am Mr Bob",
                children: mapMaker({
                    "h": 1,
                    "b": 2,
                }),
                total_children:3,
                project_id: 1,
            },
            {
                question: "This is not similar",
                children: mapMaker({
                    "h": 1,
                    "b": 2,
                }),
                total_children:3,
                project_id: 1,
            },
            {
                question: "This is not similar because it is far too long long long long long long",
                children: mapMaker({
                    "h": 1,
                    "b": 2,
                }),
                total_children:3,
                project_id: 1,
            },
        ]
        beforeEach(() => {
            // create a new deep copy of the array each test to prevent bleeding
            intents = [];
            for (const fake of baseFakeIntents) {
                // make a deep copy of the map
                intents.push({
                    ...fake,
                    children: new Map(fake.children),
                });
            }
        });

        it("should correctly merge 2 similar intents", async() => {
            const alreadyProcessedIntents = intents.slice(0, 1);
            const dissimilarIntent = intents[1];
            const grouper = new TranscriptDataGrouper(alreadyProcessedIntents, 1);
            
            const result = await grouper.group(dissimilarIntent);
            expect(fakeDao.getIntent).toHaveBeenCalled();
            expect(intents[0].children["h"]).toEqual(33);
            expect(intents[0].children["c"]).toEqual(33);
            expect(intents[0].children["b"]).toEqual(33);
            expect(result).toBe(true);
        });
    });
});

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
                question: "hi I Mr Bob but",
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
                // make a deep copy of the map
                intents.push({
                    ...fake,
                    children: new Map(fake.children),
                });
            }
            jest.spyOn(fakeDao, "getImmediateIntent").mockImplementation((query) => {
                return intents.filter((intent) => {
                    return intent.question === query.question && intent.project_id === query.project_id;
                });
            });
        });
        it("should not merge 2 intents which are completely different", async() => {
            const alreadyProcessedIntents = intents.slice(0, 1);
            const dissimilarIntent = intents[3];
            const grouper = new TranscriptDataGrouper(alreadyProcessedIntents, 1)
            const result = await grouper.group(dissimilarIntent);
            expect(result).toBe(false);
            expect(fakeDao.getImmediateIntent).not.toHaveBeenCalled();
        });
        it("should not merge 2 intents which are completely different in length", async() => {
            const alreadyProcessedIntents = intents.slice(0, 1);
            const dissimilarIntent = intents[1];
            const grouper = new TranscriptDataGrouper(alreadyProcessedIntents, 1)
            const result = await grouper.group(dissimilarIntent);
            expect(result).toBe(false);
            expect(fakeDao.getImmediateIntent).not.toHaveBeenCalled();
        });

        it("should not merge intents which are completely different", async() => {
            const alreadyProcessedIntents = [];
            for (const dissimilarIntent of intents) {
                const grouper = new TranscriptDataGrouper(alreadyProcessedIntents, 1)
                const result = await grouper.group(dissimilarIntent);
                expect(result).toBe(false);
                expect(fakeDao.getImmediateIntent).not.toHaveBeenCalled();
                alreadyProcessedIntents.push(dissimilarIntent);
            }
        });
    });
    describe("when intents are similar", () => {
        // Create fake intents where some should be merged, and some should not be
        // This acts as almost a fake DB for these tests which is why it is so long
        const baseFakeIntents = [
            {
                question: "hi how are you I am Sam",
                children: mapMaker({
                    "h": 1,
                    "b": 2,
                }),
                total_children: 3,
                project_id: 1,
            },
            {
                question: "hi how are you I am Bob",
                children: mapMaker({
                    "h": 1,
                    "c": 2,
                }),
                total_children: 3,
                project_id: 1,
            },
            {
                question: "hi how are you I am Tom",
                children: mapMaker({
                    "h": 1,
                    "b": 2,
                }),
                total_children: 3,
                project_id: 1,
            },
            {
                question: "hi how are you I am Mr Bob",
                children: mapMaker({
                    "h": 1,
                    "b": 2,
                }),
                total_children: 3,
                project_id: 1,
            },
            {
                question: "This is not similar",
                children: mapMaker({
                    "h": 1,
                    "b": 2,
                }),
                total_children: 3,
                project_id: 1,
            },
            {
                question: "This is not similar because it is far too long long long long long long",
                children: mapMaker({
                    "h": 1,
                    "b": 2,
                }),
                total_children: 3,
                project_id: 1,
            },
            {
                question: "hi how are you I am David",
                children: mapMaker({
                    "h": 2,
                    "a": 1,
                }),
                total_children: 3,
                project_id: 1,
            },
            {
                question: "These are some very similar sentences following this one here",
                children: mapMaker({
                    "d": 2,
                    "h": 1,
                }),
                total_children: 3,
                project_id: 1,
            },
            {
                question: "These are some not very same sentence for the next one",
                children: mapMaker({
                    "f": 1,
                    "a": 2,
                }),
                total_children: 3,
                project_id: 1,
            },
            {
                question: "These are some almost similar sentences following this one here",
                children: mapMaker({
                    "d": 1,
                    "a": 2,
                    "b": 2,
                }),
                total_children: 5,
                project_id: 1,
            },
            {
                question: "These are some very similar sentences following this one",
                children: mapMaker({
                    "h": 1,
                    "c": 1,
                }),
                total_children: 2,
                project_id: 1,
            },
        ]
        beforeEach(() => {
            jest.clearAllMocks();
            // create a new deep copy of the array each test to prevent bleeding
            intents = [];
            for (const fake of baseFakeIntents) {
                // make a deep copy of the map
                intents.push({
                    ...fake,
                    children: new Map(fake.children),
                });
            }
            jest.spyOn(fakeDao, "getImmediateIntent").mockImplementation((query) => {
                return intents.filter((intent) => {
                    return intent.question === query.question && intent.project_id === query.project_id;
                });
            });
        });

        it("should correctly merge 2 similar intents", async() => {
            const alreadyProcessedIntents = intents.slice(0, 1);
            const similarIntent = intents[1];
            const grouper = new TranscriptDataGrouper(alreadyProcessedIntents, 1);
            
            const result = await grouper.group(similarIntent);
            expect(fakeDao.getImmediateIntent).toHaveBeenCalledTimes(2);
            expect(intents[0].children["h"]).toEqual(33);
            expect(intents[0].children["c"]).toEqual(33);
            expect(intents[0].children["b"]).toEqual(33);
            expect(result).toBe(true);
        });

        it("should correctly merge 3 similar intents", async() => {

            const alreadyProcessedIntents = intents.slice(0, 1);
            const grouper = new TranscriptDataGrouper(alreadyProcessedIntents, 1);

            for (const similarIntent of intents.slice(1, 3)) {
                const result = await grouper.group(similarIntent);
                expect(result).toBe(true);
            }
            expect(fakeDao.getImmediateIntent).toHaveBeenCalledTimes(5);
            expect(intents[0].children["h"]).toEqual(33);
            expect(intents[0].children["c"]).toEqual(22);
            expect(intents[0].children["b"]).toEqual(44);
        });

        it("should correctly merge first 3 similar intents and not the rest", async() => {
            const alreadyProcessedIntents = intents.slice(0, 1);
            const grouper = new TranscriptDataGrouper(alreadyProcessedIntents, 1);

            for (const intent of intents.slice(1)) {
                await grouper.group(intent);
            }
            expect(fakeDao.getImmediateIntent).toHaveBeenCalledTimes(14);
            expect(intents[0].children["h"]).toEqual(38);
            expect(intents[0].children["c"]).toEqual(8);
            expect(intents[0].children["b"]).toEqual(50);
            expect(intents[0].children["a"]).toEqual(4);
        });
        it("should correctly merge 4 similar intents", async() => {

            const alreadyProcessedIntents = intents.slice(0, 1);
            const grouper = new TranscriptDataGrouper(alreadyProcessedIntents, 1);

            for (const similarIntent of intents.slice(1, 3)) {
                const result = await grouper.group(similarIntent);
                expect(result).toBe(true);
            }

            const lastIntent = intents[6];
            const result = await grouper.group(lastIntent)
            expect(fakeDao.getImmediateIntent).toHaveBeenCalledTimes(9);
            expect(result).toBe(true);

            expect(intents[0].children["h"]).toEqual(40);
            expect(intents[0].children["c"]).toEqual(13);
            expect(intents[0].children["b"]).toEqual(40);
            expect(intents[0].children["a"]).toEqual(7);
        });

        it("should correctly merge 3 similar intents in different places", async() => {
            const alreadyProcessedIntents = intents.slice(0, 8);
            const grouper = new TranscriptDataGrouper(alreadyProcessedIntents, 1);

            const firstIntent = intents[8];
            const result = await grouper.group(firstIntent)

            expect(result).toBe(false);

            for (const similarIntent of intents.slice(9, 11)) {
                const result = await grouper.group(similarIntent);
                expect(result).toBe(true);
            }
            expect(fakeDao.getImmediateIntent).toHaveBeenCalledTimes(5);

            expect(intents[7].children["h"]).toEqual(20);
            expect(intents[7].children["d"]).toEqual(30);
            expect(intents[7].children["b"]).toEqual(20);
            expect(intents[7].children["a"]).toEqual(20);
            expect(intents[7].children["c"]).toEqual(10);
        });
    });
});

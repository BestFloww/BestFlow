import '@testing-library/jest-dom';
import reducer, {addAnalyzedTranscript, setDisplayingQuestion, deleteAnalyzedTranscript, clearAnalyzedTranscript, setOverrideStatus, setProjectIdToBeDisplayed, goToIntentByQuestion, toggleFlag, toggleStar} from "./analyzeTranscriptSlice.js"

describe('analyzeTranscriptSlice', () => {
    const initialState = {
        analyzedTranscripts: {},
        DisplayingQuestion: {},
        override : false,
        projectIdToBeDisplayed : ""
    };

    const previousState = {
        analyzedTranscripts: {"1": [{question: "q1", children: {"a":100}, star: false, flag: false}], "2": [{question: "q2", children: {"b":90}, star: false, flag: false}]},
        DisplayingQuestion: {"1" : 0, "2": 0},
        override : false,
        projectIdToBeDisplayed : "1"
    };

    const unmergedState = {
        analyzedTranscripts: {"1": [{question: "q1", children: {"a":100}, star: false, flag: false}, {question: "q2", children: {"a":100}, star: false, flag: false}, {question: "q3", children: {"a":100}, star: false, flag: false}, {question: "q4", children: {"a":100}, star: false, flag: false}, {question: "q5", children: {"a":100}, star: false, flag: false},{question: "q6", children: {"a":100}, star: false, flag: false}]},
        DisplayingQuestion: {"1" : 0},
        override : false,
        projectIdToBeDisplayed : "1"
    };

    const mergedState = {
        analyzedTranscripts: {"1": [{question: "q1", children: {"a":100}, star: false, flag: false}, {question: "q2", children: {"a":100}, star: false, flag: false}, {question: "q3", children: {"a":100}, star: false, flag: false}, {question: "q4", children: {"a":100}, star: false, flag: false, previousIntents: [{question: "q4a"}]}, {question: "q5", children: {"a":100}, star: false, flag: false, previousIntents: [{question: "q5a"}]},{question: "q6", children: {"a":100}, star: false, flag: false, previousIntents: [{question: "q6a"}]}]},
        DisplayingQuestion: {"1" : 0},
        override : false,
        projectIdToBeDisplayed : "1"
    };

    const falseState = { // State where the star and flag properties are false
        analyzedTranscripts: {"1": [{question: "q1", children: {"a":100}, star: false, flag: false}]},
        DisplayingQuestion: {"1" : 0},
        override : false,
        projectIdToBeDisplayed : "1"
    };

    const trueState = { // State where the star and flag properties are true
        analyzedTranscripts: {"1": [{question: "q1", children: {"a":100}, star: true, flag: true}]},
        DisplayingQuestion: {"1" : 0},
        override : false,
        projectIdToBeDisplayed : "1"
    };

    it('should initialize the reducer to the right initial state', () => {
        const expected = reducer(undefined, { type: undefined });
        expect(expected.analyzedTranscripts).toEqual({});
        expect(expected.DisplayingQuestion).toEqual({});
        expect(expected.override).toBe(false);
        expect(expected.projectIdToBeDisplayed).toBe("");
    });

    it('should add an analyzed transcript with the right project id to analyzedTranscripts', () => {
        const expected = reducer(initialState, addAnalyzedTranscript({projectId: "1", transcript: [{question: "q3", children: {"c":80}, star: false, flag: false}]}));
        expect(expected.analyzedTranscripts).toEqual({"1": [{question: "q3", children: {"c":80}, star: false, flag: false}]});
        expect(expected.DisplayingQuestion).toEqual({"1": 0});
    });

    it('should replace an analyzed transcript if the project id exists in analyzedTranscripts', () => {
        const expected = reducer(previousState, addAnalyzedTranscript({projectId: "1", transcript: [{question: "q2", children: {"b":90}, star: false, flag: false}]}));
        expect(expected.analyzedTranscripts["1"]).toEqual([{question: "q2", children: {"b":90}, star: false, flag: false}]);
        expect(expected.DisplayingQuestion).toEqual({"1": 0, "2":0});
    });

    it('should delete the analyzed transcript corresponding to the given project id if it exists in analyzedTranscripts', () => {
        const expected = reducer(previousState, deleteAnalyzedTranscript("1"));
        expect(expected.analyzedTranscripts).toEqual({"2": [{question: "q2", children: {"b":90}, star: false, flag: false}]});
    });

    it('should delete all transcripts from the analyzedTranscripts', () => {
        const expected = reducer(previousState, clearAnalyzedTranscript);
        expect(expected.analyzedTranscripts).toEqual({});
    });

    it('should set override to the boolean passed by setOverrideStatus, true', () => {
        const expected = reducer(initialState, setOverrideStatus(true));
        expect(expected.override).toBe(true);
    });

    it('should set override to the boolean passed by setOverrideStatus, false', () => {
        const previousState2 = {
            analyzedTranscripts: {},
            override : true,
            projectIdToBeDisplayed : ""
        };
        const expected = reducer(previousState2, setOverrideStatus(false))
        expect(expected.override).toBe(false);
    });

    it('should set projectId to the String passed by setProjectIdToBeDisplayed', () => {
        const expected = reducer(previousState, setProjectIdToBeDisplayed("100642Amh632"));
        expect(expected.projectIdToBeDisplayed).toBe("100642Amh632");
    });

    it('should set the index of the given project Id in DisplayingQuestion', () => {
        const expected = reducer(previousState, setDisplayingQuestion(3));
        expect(expected.DisplayingQuestion["1"]).toBe(3);
    });

    it("should set the correct index if the string is an exact match and the intent is first on its page", () => {
        const expected = reducer(unmergedState, goToIntentByQuestion("q4"));
        expect(expected.DisplayingQuestion["1"]).toBe(3);
    });
    
    it("should set the correct index if the string is an exact match and the intent is first on its page", () => {
        const expected = reducer(unmergedState, goToIntentByQuestion("q5"));
        expect(expected.DisplayingQuestion["1"]).toBe(3);
    });

    it("should set the correct index if the string is an exact match and the intent is first on its page", () => {
        const expected = reducer(unmergedState, goToIntentByQuestion("q6"));
        expect(expected.DisplayingQuestion["1"]).toBe(3);
    });

    it("should set the correct index if the string is in the previousIntents of an intent and that intent is first on its page", () => {
        const expected = reducer(mergedState, goToIntentByQuestion("q4a"));
        expect(expected.DisplayingQuestion["1"]).toBe(3);
    });

    it("should set the correct index if the string is in the previousIntents of an intent and that intent is first on its page", () => {
        const expected = reducer(mergedState, goToIntentByQuestion("q5a"));
        expect(expected.DisplayingQuestion["1"]).toBe(3);
    });

    it("should set the correct index if the string is in the previousIntents of an intent and that intent is first on its page", () => {
        const expected = reducer(mergedState, goToIntentByQuestion("q6a"));
        expect(expected.DisplayingQuestion["1"]).toBe(3);
    });

    it("should switch flag of given intent to false", () => {
        const expected = reducer(trueState, toggleFlag("q1"));
        expect(expected.analyzedTranscripts).toStrictEqual({"1": [{question: "q1", children: {"a":100}, star: true, flag: false}]});
    });

    it("should switch star of given intent to false", () => {
        const expected = reducer(trueState, toggleStar("q1"));
        expect(expected.analyzedTranscripts).toStrictEqual({"1": [{question: "q1", children: {"a":100}, star: false, flag: true}]});
    });

    it("should switch flag of given intent to true", () => {
        const expected = reducer(falseState, toggleFlag("q1"));
        expect(expected.analyzedTranscripts).toStrictEqual({"1": [{question: "q1", children: {"a":100}, star: false, flag: true}]});
    });

    it("should switch star of given intent to true", () => {
        const expected = reducer(falseState, toggleStar("q1"));
        expect(expected.analyzedTranscripts).toStrictEqual({"1": [{question: "q1", children: {"a":100}, star: true, flag: false}]})
    });
});

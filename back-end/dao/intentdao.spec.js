import IntentDao from "./intentdao.js";
import { Intent } from "../schema/intent-schema.js";

jest.mock("../schema/intent-schema.js");

let dao;
let emit;

describe("IntentDao", () => {
    beforeEach(() => {
        const newDao = new IntentDao();
        const newEmit = jest.spyOn(newDao, "emit");
        dao = newDao;
        emit = newEmit;
        jest.clearAllMocks();
    });
    it("Should correctly get intents", async() => {
        await dao.getIntent();
        expect(Intent.find).toHaveBeenCalled();
    });

    it("Should correctly get intents with query", async() => {
        const query = {bark: "woof"};
        await dao.getIntent(query);
        expect(Intent.find).toHaveBeenCalledWith(query);
    });

    it("Should emit the intentList", async() => {
        const fakePayload = {grrr: "meow"};
        Intent.find.mockImplementationOnce(() => {
            return {exec: jest.fn().mockReturnValue(fakePayload)};
        });
        await dao.getIntent();
        expect(emit).toHaveBeenCalledWith("getIntent", fakePayload);
    });

    it("should correctly throw an error for get", async() => {
        Intent.find.mockImplementationOnce(() => {throw "error"});
        await dao.getIntent();
        expect(emit).toHaveBeenCalledWith("getIntent", {status: 500, error: "error"});
    });

    it("Post a single intent", async() => {
        const fakeIntents = [{goodDog: "prr", project_id: 1}];
        const fakeModel = {save: jest.fn()};
        Intent.find.mockImplementationOnce(() => []);
        Intent.mockImplementationOnce(() => fakeModel);
        await dao.postIntents(fakeIntents);
        expect(Intent).toHaveBeenCalled();
        expect(fakeModel.save).toHaveBeenCalled();
        expect(emit).toHaveBeenCalledWith("postIntent", {status: 201, message: "success"});
    });

    it("Post multiple intents", async() => {
        const fakeIntents = [{goodDog: "prr", project_id: 1}, {badDog: "barkbark", project_id: 1}];
        const fakeModel = {save: jest.fn()};
        Intent.find.mockImplementationOnce(() => []);
        Intent.mockImplementationOnce(() => fakeModel);
        await dao.postIntents(fakeIntents);
        expect(Intent).toHaveBeenCalledTimes(2);
        expect(fakeModel.save).toHaveBeenCalled();
        expect(emit).toHaveBeenCalledWith("postIntent", {status: 201, message: "success"});
    });

    it("should correctly throw an error for post", async() => {
        Intent.mockImplementationOnce(() => {save: jest.fn().mockImplementation(() => {throw {error: "error"}})});
        await dao.postIntents();
        const error = new TypeError("content is not iterable")
        expect(emit).toHaveBeenCalledWith("postIntent", {status: 500, error: error});
    });

    it("should correctly throw an error for post if an intent with the same ID is found and override is false", async() => {
        const fakeIntents = [{goodDog: "prr", project_id: 1}, {badDog: "barkbark", project_id: 1}];
        Intent.find.mockImplementationOnce(() => [1]);
        await dao.postIntents(fakeIntents, false);
        const expectedError = new Error("Project ID is already present. Do you want to override?");
        expect(emit).toHaveBeenCalledWith("postIntent", {status: 500, error: expectedError});
    });

    it("should correctly post if override is true", async() => {
        const fakeIntents = [{goodDog: "prr", project_id: 1}, {badDog: "barkbark", project_id: 1}];
        Intent.find.mockImplementationOnce(() => [1]);
        Intent.mockImplementationOnce(() => {save: jest.fn()});
        await dao.postIntents(fakeIntents, true);
        expect(Intent.find).not.toHaveBeenCalled();
        expect(emit).toHaveBeenCalledWith("postIntent", {status: 200});
    });

    it("Put an intent", async() => {
        const id = 1;
        const content = {"meow": "kitten"};

        await dao.putIntent(id, content);
        expect(Intent.findByIdAndUpdate).toHaveBeenCalledWith(
            id,
            content,
        );
    });

    it("should correctly throw an error for put", async() => {
        Intent.findByIdAndUpdate.mockImplementation(() => {throw "error"});
        await dao.putIntent();
        expect(emit).toHaveBeenCalledWith("putIntent", {status: 500, error: "error"});
    });

    it("should save an intent", async() => {
        const fakeIntent = {save: jest.fn()};
        await dao.saveIntent(fakeIntent);
        expect(emit).toHaveBeenCalledWith("saveIntent", {status: 200});
        expect(fakeIntent.save).toHaveBeenCalled();
    });

    it("should correctly throw an error for save", async() => {
        const fakeIntent = {save: jest.fn()};
        fakeIntent.save.mockImplementation(() => {throw "error"});
        await dao.saveIntent();
        const error = new TypeError("Cannot read properties of undefined (reading 'save')")
        expect(emit).toHaveBeenCalledWith("saveIntent", {status: 500, error: error});
    });
});
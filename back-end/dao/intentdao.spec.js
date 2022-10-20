import intentDao from "./intentdao.js";
import { Intent } from "../schema/intent-schema.js";

jest.mock("../schema/intent-schema.js");

describe("intentDao", () => {

    it("Should correctly get intents", () => {
        intentDao.getIntent();
        expect(Intent.find).toHaveBeenCalled();
    });

    it("Should correctly get intents with query", () => {
        const query = {bark: "woof"};
        intentDao.getIntent(query);
        expect(Intent.find).toHaveBeenCalledWith(query);
    });

    it("Should return the intentList", async() => {
        const fakePayload = {grrr: "meow"};
        Intent.find.mockImplementationOnce(() => {
            return {exec: jest.fn().mockReturnValue(fakePayload)};
        });
        expect(await intentDao.getIntent()).toBe(fakePayload);
    });

    it("should correctly throw an error for get", async() => {
        Intent.find.mockImplementation(() => {throw "error"});
        const result = await intentDao.getIntent();
        expect(result.error).toBe("error");
    });

    it("Post a single intent", async() => {
        const fakeIntents = [{goodDog: "prr"}];
        const fakeModel = {save: jest.fn()};
        Intent.mockImplementationOnce(() => fakeModel);

        const result = await intentDao.postIntents(fakeIntents);

        expect(Intent).toHaveBeenCalled();
        expect(fakeModel.save).toHaveBeenCalled();
        expect(result.status).toBe(200);
    });

    it("Post multiple intents", async() => {
        jest.clearAllMocks();
        const fakeIntents = [{goodDog: "prr"}, {badDog: "barkbark"}];
        const fakeModel = {save: jest.fn()};
        Intent.mockImplementationOnce(() => fakeModel);

        const result = await intentDao.postIntents(fakeIntents);

        expect(Intent).toHaveBeenCalledTimes(2);
        expect(fakeModel.save).toHaveBeenCalled();
        expect(result.status).toBe(200);
    });

    it("should correctly throw an error for post", async() => {
        Intent.mockImplementation(() => {throw "error"});
        const result = await intentDao.getIntent();
        expect(result.error).toBe("error");
    });

    it("Put an intent", async() => {
        const id = 1;
        const content = {"meow": "kitten"};

        await intentDao.putIntent(id, content);

        expect(Intent.findByIdAndUpdate).toHaveBeenCalledWith(
            id,
            content,
        );
    });

    it("should correctly throw an error for put", async() => {
        Intent.findByIdAndUpdate.mockImplementation(() => {throw "error"});
        const result = await intentDao.getIntent();
        expect(result.error).toBe("error");
    });

    it("should save an intent", async() => {
        const fakeIntent = {save: jest.fn()};

        const result = await intentDao.saveIntent(fakeIntent);

        expect(result.status).toBe(200);
        expect(fakeIntent.save).toHaveBeenCalled();
    });

    it("should correctly throw an error for put", async() => {
        const fakeIntent = {save: jest.fn()};
        fakeIntent.save.mockImplementation(() => {throw "error"});
        const result = await intentDao.getIntent();
        expect(result.error).toBe("error");
    });
});
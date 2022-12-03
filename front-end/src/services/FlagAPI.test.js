import axios from "axios";
import FlagAPI from "./FlagAPI.js";
jest.mock("axios");

describe("Flag API", () => {
    it("put intent question", async() => {
        const body = {
            question: "some question",
            projectId: "the id",
            flagStatus: true
            }
        await FlagAPI.put(body);
        expect(axios.put).toHaveBeenCalledWith(expect.any(String), body);
    });

    it("put intent with merge", async() => {
        const body = {
            question: "some question",
            projectId: "the id",
            flagStatus: true,
            previousIntents: [{}, {question: "caveman 🍖"}],
            }
        const expected = {...body, question: "caveman 🍖"}
        await FlagAPI.put(body);
        expect(axios.put).toHaveBeenCalledWith(expect.any(String), expected);
    });
});
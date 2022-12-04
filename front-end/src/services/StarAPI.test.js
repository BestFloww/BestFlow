import axios from "axios";
import StarAPI from "./StarAPI.js";
jest.mock("axios");

describe("Star API", () => {
    it("put intent question", async() => {
        const body = {
            question: "some question",
            projectId: "the id",
            starStatus: true
            }
        await StarAPI.put(body);
        expect(axios.put).toHaveBeenCalledWith(expect.any(String), body);
    });

    it("put intent with merge", async() => {
        const body = {
            question: "some question",
            projectId: "the id",
            starStatus: true,
            previousIntents: [{}, {question: "caveman 🍖"}],
            }
        const expected = {...body, question: "caveman 🍖"}
        await StarAPI.put(body);
        expect(axios.put).toHaveBeenCalledWith(expect.any(String), expected);
    });
});
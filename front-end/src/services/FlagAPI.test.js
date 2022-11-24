import axios from "axios";
import FlagAPI from "./FlagAPI.js";
jest.mock("axios");

describe("Flag API", () => {
    it("put intent question", async() => {
        const fakeQuestion = "so... wanna... go bowling with me later tonight... uwu?"
        await FlagAPI.put(fakeQuestion);
        const payload = JSON.stringify(fakeQuestion);
        expect(axios.put).toHaveBeenCalledWith(expect.any(String), {payload});
    });
});
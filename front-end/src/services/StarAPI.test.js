import axios from "axios";
import StarAPI from "./StarAPI.js";
jest.mock("axios");

describe("Star API", () => {
    it("put intent question", async() => {
        const fakeQuestion = "so... wanna... go bowling with me later tonight... uwu?"
        await StarAPI.put(fakeQuestion);
        const payload = JSON.stringify(fakeQuestion);
        expect(axios.put).toHaveBeenCalledWith(expect.any(String), {payload});
    });
});
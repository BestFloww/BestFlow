import axios from "axios";
import StarAPI from "./StarAPI.js";
jest.mock("axios");

describe("Star API", () => {
    it("put intent question", async() => {
        const body = "so... wanna... go bowling with me later tonight... uwu?"
        await StarAPI.put(body);
        expect(axios.put).toHaveBeenCalledWith(expect.any(String), {body});
    });
});
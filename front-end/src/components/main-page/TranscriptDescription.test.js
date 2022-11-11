import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TranscriptDescription from "./TranscriptDescription.jsx"
import {exampleTranscript} from "../helpers/ExampleTranscript.js"; 

describe("TranscriptDescription", () => {
    it("should correctly show the JSON file in the description", () => {
        render(<TranscriptDescription/>)

        const input = screen.getByTestId("sampleTranscript")
        const expected = JSON.stringify(exampleTranscript, null, 2);

        expect(input.textContent).toBe(expected);
    });
});

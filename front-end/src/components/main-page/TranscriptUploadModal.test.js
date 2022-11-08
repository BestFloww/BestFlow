import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TranscriptUploadModal from "./TranscriptUploadModal.jsx";
import TranscriptAPI from "../../services/TranscriptAPI.js";

jest.mock("../../services/TranscriptAPI.js");

// React-modal doesn't work very well with the React testing library and this is our best attempts at testing.

describe("TranscriptUploadModal tests", () => {
    let props;
    const renderComponent = (props) => {
        render(<TranscriptUploadModal {...props} />)
    };
    
    beforeEach(() => {
        props = {
            show: true,
            toggleModal: jest.fn().mockImplementation(() => {props.show=!props.show}),
        };
    });

    it("correctly closes modal on escape press", () => {
        renderComponent(props);
        userEvent.keyboard("{esc}");
        expect(props.show).toBe(false);
    });

    it("correctly inputs file into modal", () => {
        renderComponent(props);
        const fakeFile = new File(["{'key': 'value'}"], "test.json", {type: "application/json"})

        const input = screen.getByTestId("fileInput")
        expect(input.files).toHaveLength(0);
        userEvent.upload(input, fakeFile);

        expect(input.files).toHaveLength(1);
    });

    it("correctly uploads file to backend if JSON has a data attribute", async() => {
        renderComponent(props);
        const fakeData = {'data': 'value'}
        // First trick JSON
        const parse = jest.spyOn(JSON, "parse").mockImplementation(() => fakeData)
        // then we trick the FileReader
        const fakeFile = new File(["{'data': 'value'}"], "test.json", {type: "application/json"})

        // then we test
        const input = screen.getByTestId("fileInput")
        expect(input.files).toHaveLength(0);
        userEvent.upload(input, fakeFile);

        await waitFor(() => expect(parse).toHaveBeenCalled());

        // This allows our async method to run
        jest.spyOn(TranscriptAPI,"post").mockImplementation().mockReturnValue({status:200});
        userEvent.click(screen.getByText("Upload"));
        await waitFor(() => expect(TranscriptAPI.post).toHaveBeenCalled());
    });
});
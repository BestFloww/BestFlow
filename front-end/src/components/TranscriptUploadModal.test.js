import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TranscriptUploadModal from "./TranscriptUploadModal.jsx";
import TranscriptAPI from "../services/TranscriptAPI.js";
jest.mock("../services/TranscriptAPI.js");

describe("TranscriptUploadModal tests", () => {
    let props;
    const renderComponent = (props) => {
        render(<TranscriptUploadModal {...props} />)
    }
    
    beforeEach(() => {
        props = {
            show: true,
            toggleModal: jest.fn().mockImplementation(() => {props.show=!props.show}),
        };
    });

    it("correctly inputs file into modal", () => {
        renderComponent(props);
        const fakeFile = new File(["{'key': 'value'}"], "test.json", {type: "application/json"})

        const input = screen.getByTestId("fileInput")
        expect(input.files).toHaveLength(0);
        userEvent.upload(input, fakeFile)

        expect(input.files).toHaveLength(1);
    })

    it("correctly closes modal on escape press", () => {
        renderComponent(props);
        userEvent.keyboard("{esc}");
        expect(props.show).toBe(false);
    })


    it("correctly uploads file to backend", async() => {
        renderComponent(props);
        const readAsText = jest.spyOn(FileReader.prototype, "readAsText").mockImplementation((Obj) => TranscriptAPI.post(Obj))
        const fakeFile = new File(["{'key': 'value'}"], "test.json", {type: "application/json"})
        const input = screen.getByTestId("fileInput")
        expect(input.files).toHaveLength(0);
        userEvent.upload(input, fakeFile)

        userEvent.click(screen.getByText("Upload"));
        expect(TranscriptAPI.post).toHaveBeenCalledWith(fakeFile);
    })

});
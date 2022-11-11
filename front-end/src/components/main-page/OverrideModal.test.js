import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import OverrideModal from "./OverrideModal";

// React-modal doesn't work very well with the React testing library and this is our best attempts at testing.

describe("OverrideModal tests", () => {
    let props;
    const renderComponent = (props) => {
        render(<OverrideModal {...props} />)
    };

    beforeEach(() => {
        props = {
            show: true,
            toggleModal: jest.fn().mockImplementation(() => {
                props.show = !props.show
            }),
            uploadFileWithOverride: jest.fn().mockImplementation(),
        };
    });

    it("correctly closes modal on escape press", () => {
        renderComponent(props);
        userEvent.keyboard("{esc}");
        expect(props.show).toBe(false);
    });

    it("correctly closes modal and posts transcript with override", () => {
        renderComponent(props);
        userEvent.click(screen.getByText("Confirm"));
        expect(props.uploadFileWithOverride).toHaveBeenCalled();
        expect(props.toggleModal).toHaveBeenCalled();
        expect(props.show).toBe(false);
    });
});
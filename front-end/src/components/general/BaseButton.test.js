import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BaseButton from './BaseButton.jsx';
import Icon from './Icon.jsx';

/** 
 * Think of this file as an example testing file. Please do not hesitate to ask me questions about why I do things.
 * The tests in this file are a little more complicated than necessary, but show good design patterns.
 */

jest.mock("./Icon.jsx", () => jest.fn(() => null));

describe("BaseButton", () => {
    const basicProps = {
        click: jest.fn(),
        text: "sampleText",
        label: "sampleLabel",
    };
    let props = {};

    const sampleIconProps = {
        name: "magnifying-glass",
        color: "red",
        size: "40",
    };

    const renderComponent = (props) => {
        return render(<BaseButton {...props} />);
    }

    beforeEach(() => {
        props = {...basicProps};
        jest.spyOn(console, 'error').mockImplementation(() => null);
    });

    afterEach(() => {
        console.error.mockClear();
    });

    it("should call the click function on click", () => {
        renderComponent(props);
        userEvent.click(screen.getByTestId("custom-button"));
        expect(props.click).toHaveBeenCalled();
    });

    it("should display the given text", async() => {
        renderComponent(props);
        expect(await screen.findByTestId("custom-button")).toHaveTextContent(props.text);
    });

    it("should have an aria label matching the given text if there is any", async() => {
        renderComponent(props);
        expect(await screen.findByTestId("custom-button")).toHaveAttribute("aria-label", props.text);
    });

    it("should have the given aria label if there is no given text", async() => {
        props.text = null;
        renderComponent(props);
        expect(await screen.findByTestId("custom-button")).toHaveAttribute("aria-label", props.label);
    });

    it("should have a tooltip if tooltip prop is not null", () => {
        props.tooltip = "have fun kids";
        renderComponent(props);
        expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    });

    it("should not have a tooltip if tooltip prop is null", () => {
        renderComponent(props);
        expect(screen.queryByTestId("tooltip")).not.toBeInTheDocument();
    });

    describe("For rendering an embedded icon", () => {
        it("should not render an embedded icon if icon is null", () => {
            renderComponent(props);
            expect(Icon).not.toHaveBeenCalled();
        });
    
        it("should correctly render and pass icon props to an embedded icon if icon is not null", () => {
            props.icon = sampleIconProps;
            renderComponent(props);
            expect(Icon).toHaveBeenCalledWith({ icon: sampleIconProps }, {});
        });
    });

    describe("For enabling and disabling the button", () => {
        it("should not be disabled if isDisabled is false", () => {
            renderComponent(props);
            expect(screen.getByTestId("custom-button")).not.toBeDisabled();
        });

        it("should be disabled if isDisabled is true", () => {
            props.isDisabled = true;
            renderComponent(props);
            expect(screen.getByTestId("custom-button")).toBeDisabled();
        });
    });

    describe("For correct style", () => {
        it("should have correct style if isDisabled is false", () => {
            renderComponent(props);
            expect(screen.getByTestId("custom-button")).toHaveClass("hover:bg-purple-200");
        });

        it("should have correct style if isDisabled is true", () => {
            props.isDisabled = true;
            renderComponent(props);
            expect(screen.getByTestId("custom-button")).toHaveClass("opacity-50");
        });

        it("should be medium if size is null", () => {
            renderComponent(props);
            expect(screen.getByTestId("custom-button")).toHaveClass("py-3 px-6");
        });

        it("should be small if size is small", () => {
            props.size = "sm";
            renderComponent(props);
            expect(screen.getByTestId("custom-button")).toHaveClass("py-1 px-4");
        });

        it("should be large if size is large", () => {
            props.size = "lg";
            renderComponent(props);
            expect(screen.getByTestId("custom-button")).toHaveClass("md:py-5 md:px-6");
        });
    });
    
    describe("For custom props validation", () => {
        it("should return a validation error if both text and label are null", () => {
            props.text = null;
            props.label = null;
            renderComponent(props);
            // Expect the console to return an error
            expect(console.error).toHaveBeenCalled();
            // Expect the error message to correspond to the error described by the custom props validator in BaseButton.jsx
            expect(console.error.mock.calls[0][2]).toBe("Must provide a label string if the button has no text.");
        });
    
        it("should return a validation error if label is not a string", () => {
            props.label = 0;
            renderComponent(props);
            // Expect the console to return an error
            expect(console.error).toHaveBeenCalled();
            // Expect the error message to correspond to the error described by the custom props validator in BaseButton.jsx
            expect(console.error.mock.calls[0][2]).toBe("Label must be a string.");
        });
    });
});

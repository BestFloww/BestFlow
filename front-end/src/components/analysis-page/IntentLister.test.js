import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {IntentLister} from './IntentLister.jsx';
import sampleIntents from '../test-data/sampleIntents.js';
import store from "../../store.js"
import setDisplayingQuestion from "../../store/analyzeTranscriptSlice.js"
import setProjectIdToBeDisplayed from "../../store/analyzeTranscriptSlice.js"

describe("IntentLister", () => {
    const basicProps = {
        intents: sampleIntents,
        initialIndex: 0,
    };
    let props = {};

    const renderComponent = (props) => {
        return render(<IntentLister {...props} />);
    }

    beforeEach(() => {
        props = {...basicProps};
    });

    describe("For displaying the proper intents based on the index", () => {
        it ("should display 3 intents if there are at least 3 remaining intents starting from the current index", () => {
            renderComponent(props);
            // Intents 0-2 should display, Intents 3-8 should not display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 3 ? 1 : 0);
            });
        });

        it ("should display 2 intents if there are 2 remaining intents starting from the current index", () => {
            props.initialIndex = 7;
            renderComponent(props);
            // Intents 0-6 should not display, Intents 7-8 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 7 ? 0 : 1);
            });
        });

        it ("should display 1 intent if there is 1 remaining intent starting from the current index", () => {
            props.initialIndex = 8;
            renderComponent(props);
            // Intents 0-7 should not display, Intent 8 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 8 ? 0 : 1);
            });
        });
    });

    describe("For disabling and enabling the intent navigation buttons", () => {
        it ("should enable the Next Results button if there are more than 3 remaining intents starting from the current index", () => {
            renderComponent(props);
            expect(screen.getByLabelText("Next Results")).not.toBeDisabled();
        });

        it ("should disable the Next Results button if there are 3 remaining intents starting from the current index", () => {
            props.initialIndex = 6;
            renderComponent(props);
            expect(screen.getByLabelText("Next Results")).toBeDisabled();
        });

        it ("should disable the Next Results button if there are 2 remaining intents starting from the current index", () => {
            props.initialIndex = 7;
            renderComponent(props);
            expect(screen.getByLabelText("Next Results")).toBeDisabled();
        });

        it ("should disable the Next Results button if there is 1 remaining intent starting from the current index", () => {
            props.initialIndex = 8;
            renderComponent(props);
            expect(screen.getByLabelText("Next Results")).toBeDisabled();
        });

        it ("should enable the Previous Results button if there are intents before the current index", () => {
            props.initialIndex = 3;
            renderComponent(props);
            expect(screen.getByLabelText("Previous Results")).not.toBeDisabled();
        });

        it ("should disable the Previous Results button if there are no intents before the current index", () => {
            renderComponent(props);
            expect(screen.getByLabelText("Previous Results")).toBeDisabled();
        });
    });

    describe("For incrementing and decrementing the index using the intent navigation buttons", () => {
        it ("should increment index by 3 if the Next Results button is pressed and there are more than 3 remaining intents starting from the current index", () => {
            renderComponent(props);
            userEvent.click(screen.getByLabelText("Next Results"));
            // Intents 0-2 and 6-8 should not display, Intents 3-5 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe((key < 3 || key >= 6) ? 0 : 1);
            });
        });

        it ("should decrement index by 3 if the Previous Results button is pressed and there are intents before the current index", () => {
            props.initialIndex = 3;
            renderComponent(props);
            userEvent.click(screen.getByLabelText("Previous Results"));
            // Intents 0-2 should display, Intents 3-8 should not display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 3 ? 1 : 0);
            });
        });
    });

    describe("For incrementing and decrementing the index using the Right and Left Arrow keys", () => {
        it ("should increment index by 3 if the Right Arrow key is pressed and there are more than 3 remaining intents starting from the current index", () => {
            renderComponent(props);
            userEvent.keyboard("{ArrowRight}");
            // Intents 0-2 and 6-8 should not display, Intents 3-5 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe((key < 3 || key >= 6) ? 0 : 1);
            });
        });

        it ("should stay on the current index if the Right Arrow key is pressed and there are 3 remaining intents starting from the current index", () => {
            props.initialIndex = 6;
            renderComponent(props);
            userEvent.keyboard("{ArrowRight}");
            // Intents 0-5 should still not display, Intents 6-8 should still display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 6 ? 0 : 1);
            });
        });

        it ("should stay on the current index if the Right Arrow key is pressed and there are 2 remaining intents starting from the current index", () => {
            props.initialIndex = 6;
            props.intents = sampleIntents.slice(0, 8);  // Include only Intents 0-7
            renderComponent(props);
            userEvent.keyboard("{ArrowRight}");
            // Intents 0-5 should still not display, Intents 6-7 should still display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 6 ? 0 : 1);
            });
        });

        it ("should stay on the current index if the Right Arrow key is pressed and there is 1 remaining intent starting from the current index", () => {
            props.initialIndex = 6;
            props.intents = sampleIntents.slice(0, 7);  // Include only Intents 0-6
            renderComponent(props);
            userEvent.keyboard("{ArrowRight}");
            // Intents 0-5 should still not display, Intent 6 should still display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 6 ? 0 : 1);
            });
        });

        it ("should decrement index by 3 if the Left Arrow key is pressed and there are intents before the current index", () => {
            props.initialIndex = 3;
            renderComponent(props);
            userEvent.keyboard("{ArrowLeft}");
            // Intents 0-2 should display, Intents 3-8 should not display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 3 ? 1 : 0);
            });
        });

        it ("should stay on the current index if the Left Arrow key is pressed and there are no intents before the current index", () => {
            renderComponent(props);
            userEvent.keyboard("{ArrowLeft}");
            // Intents 0-2 should still display, Intents 3-8 should still not display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 3 ? 1 : 0);
            });
        });
    });

    describe("For skipping to the first and last indices using CTRL + intent navigation buttons", () => {
        it ("should correctly skip to the last set of intents if CTRL + Next Results button is pressed and the set has 3 intents", () => {
            renderComponent(props);
            userEvent.keyboard("{Control>}");
            userEvent.click(screen.getByLabelText("Next Results"));
            userEvent.keyboard("{/Control}");
            // Intents 0-5 should not display, Intents 6-8 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 6 ? 0 : 1);
            });
        });

        it ("should correctly skip to the last set of intents if CTRL + Next Results button is pressed and the set has 2 intents", () => {
            props.intents = sampleIntents.slice(0, 8);  // Include only Intents 0-7
            renderComponent(props);
            userEvent.keyboard("{Control>}");
            userEvent.click(screen.getByLabelText("Next Results"));
            userEvent.keyboard("{/Control}");
            // Intents 0-5 should not display, Intents 6-7 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 6 ? 0 : 1);
            });
        });

        it ("should correctly skip to the last set of intents if CTRL + Next Results button is pressed and the set has 1 intent", () => {
            props.intents = sampleIntents.slice(0, 7);  // Include only Intents 0-6
            renderComponent(props);
            userEvent.keyboard("{Control>}");
            userEvent.click(screen.getByLabelText("Next Results"));
            userEvent.keyboard("{/Control}");
            // Intents 0-5 should not display, Intent 6 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 6 ? 0 : 1);
            });
        });

        it ("should correctly skip to the first set of intents if CTRL + Previous Results button is pressed and there are intents before the current index", () => {
            props.initialIndex = 6;
            renderComponent(props);
            userEvent.keyboard("{Control>}");
            userEvent.click(screen.getByLabelText("Previous Results"));
            userEvent.keyboard("{/Control}");
            // Intents 0-2 should display, Intents 3-8 should not display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 3 ? 1 : 0);
            });
        });
    });

    describe("For skipping to the first and last indices using CTRL + Right and Left Arrow keys", () => {
        it ("should correctly skip to the last set of intents if CTRL + Right Arrow key is pressed and the set has 3 intents", () => {
            renderComponent(props);
            userEvent.keyboard("{Control>}{ArrowRight}{/Control}");
            // Intents 0-5 should not display, Intents 6-8 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 6 ? 0 : 1);
            });
        });

        it ("should correctly skip to the last set of intents if CTRL + Right Arrow key is pressed and the set has 2 intents", () => {
            props.intents = sampleIntents.slice(0, 8);  // Include only Intents 0-7
            renderComponent(props);
            userEvent.keyboard("{Control>}{ArrowRight}{/Control}");
            // Intents 0-5 should not display, Intents 6-7 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 6 ? 0 : 1);
            });
        });

        it ("should correctly skip to the last set of intents if CTRL + Right Arrow key is pressed and the set has 1 intent", () => {
            props.intents = sampleIntents.slice(0, 7);  // Include only Intents 0-6
            renderComponent(props);
            userEvent.keyboard("{Control>}{ArrowRight}{/Control}");
            // Intents 0-5 should not display, Intent 6 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 6 ? 0 : 1);
            });
        });
        
        it ("should stay on the current index if CTRL + Right Arrow key is pressed and there are 3 remaining intents starting from the current index", () => {
            props.initialIndex = 6;
            renderComponent(props);
            userEvent.keyboard("{Control>}{ArrowRight}{/Control}");
            // Intents 0-5 should still not display, Intents 6-8 should still display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 6 ? 0 : 1);
            });
        });

        it ("should stay on the current index if CTRL + Right Arrow key is pressed and there are 2 remaining intents starting from the current index", () => {
            props.initialIndex = 6;
            props.intents = sampleIntents.slice(0, 8);  // Include only Intents 0-7
            renderComponent(props);
            userEvent.keyboard("{Control>}{ArrowRight}{/Control}");
            // Intents 0-5 should still not display, Intents 6-7 should still display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 6 ? 0 : 1);
            });
        });

        it ("should stay on the current index if CTRL + Right Arrow key is pressed and there is 1 remaining intent starting from the current index", () => {
            props.initialIndex = 6;
            props.intents = sampleIntents.slice(0, 7);  // Include only Intents 0-6
            renderComponent(props);
            userEvent.keyboard("{Control>}{ArrowRight}{/Control}");
            // Intents 0-5 should still not display, Intent 6 should still display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 6 ? 0 : 1);
            });
        });

        it ("should correctly skip to the first set of intents if CTRL + Left Arrow key is pressed and there are intents before the current index", () => {
            props.initialIndex = 6;
            renderComponent(props);
            userEvent.keyboard("{Control>}{ArrowLeft}{/Control}");
            // Intents 0-2 should display, Intents 3-8 should not display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 3 ? 1 : 0);
            });
        });

        it ("should stay on the current index if CTRL + Left Arrow key is pressed and there are no intents before the current index", () => {
            renderComponent(props);
            userEvent.keyboard("{Control>}{ArrowLeft}{/Control}");
            // Intents 0-2 should still display, Intents 3-8 should still not display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 3 ? 1 : 0);
            });
        });
    });

    describe("For rendering the correct icons in the intent navigation buttons", () => {
        it ("should render the standard arrow icons when CTRL is not held", () => {
            renderComponent(props);
            expect(screen.getByTestId("custom-icon-arrow-right")).toBeInTheDocument();
            expect(screen.getByTestId("custom-icon-arrow-left")).toBeInTheDocument();
            expect(screen.queryByTestId("custom-icon-skip-right")).not.toBeInTheDocument();
            expect(screen.queryByTestId("custom-icon-skip-left")).not.toBeInTheDocument();
        });

        it ("should render the skip arrow icons when CTRL is held", () => {
            renderComponent(props);
            userEvent.keyboard("{Control>}");
            expect(screen.queryByTestId("custom-icon-arrow-right")).not.toBeInTheDocument();
            expect(screen.queryByTestId("custom-icon-arrow-left")).not.toBeInTheDocument();
            expect(screen.getByTestId("custom-icon-skip-right")).toBeInTheDocument();
            expect(screen.getByTestId("custom-icon-skip-left")).toBeInTheDocument();
            userEvent.keyboard("{/Control}");
        });
    });

    describe("For properly responding to key events", () => {
        it ("should add correct event listeners when the component mounts", () => {
            document.addEventListener = jest.fn();
            renderComponent(props);
            // Expect addEventListener to be called with proper event types and some functions
            expect(document.addEventListener).toHaveBeenCalledWith("keydown", expect.any(Function), false);
            expect(document.addEventListener).toHaveBeenCalledWith("keyup", expect.any(Function), false);
            // Expect the function arguments to correspond to the correct event handler functions in IntentLister.jsx
            expect(document.addEventListener.mock.calls[0][1].name).toBe("bound handleKeyDown");
            expect(document.addEventListener.mock.calls[1][1].name).toBe("bound handleKeyUp");
        });

        it ("should remove correct event listeners when the component unmounts", () => {
            document.removeEventListener = jest.fn();
            const {unmount} = renderComponent(props);
            unmount();
            // Expect removeEventListener to be called with proper event types and some functions
            expect(document.removeEventListener).toBeCalledWith("keydown", expect.any(Function), false);
            expect(document.removeEventListener).toBeCalledWith("keyup", expect.any(Function), false);
            // Expect the function arguments to correspond to the correct event handler functions in IntentLister.jsx
            expect(document.removeEventListener.mock.calls[0][1].name).toBe("bound handleKeyDown");
            expect(document.removeEventListener.mock.calls[1][1].name).toBe("bound handleKeyUp");
        });
    });
});
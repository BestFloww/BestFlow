import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import IntentMenu from './IntentMenu.jsx';
import sampleIntents from '../test-data/sampleIntents.js';
import store from "../../store.js";

describe("IntentMenu", () => {
    const basicProps = {
        intents: sampleIntents,
        isOpen: true,
        onClickOutside: jest.fn(),
    };
    let props = {};

    const renderComponent = (props) => {
        return render(
            <Provider store={store} >
                <IntentMenu {...props} />
            </Provider>
            );
    };

    beforeEach(() => {
        props = {...basicProps};
        jest.clearAllMocks();
    });

    describe("For generating and listing intent buttons", () => {
        it ("should generate and display a button corresponding to each intent if there are no intents", () => {
            props.intents = [];
            renderComponent(props);
            expect(screen.queryByTestId("intent-menu-list-item")).not.toBeInTheDocument();
        });
        
        it ("should generate and display a button corresponding to each intent if there is 1 intent", () => {
            props.intents = sampleIntents.slice(0, 1);  // Include only Intent 0
            renderComponent(props);
            // A button for Intents 0 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.getByLabelText(`${props.intents[key].question}`)).toBeInTheDocument();
            });
        });

        it ("should generate and display a button corresponding to each intent if there are 2 intents", () => {
            props.intents = sampleIntents.slice(0, 2);  // Include only Intents 0-1
            renderComponent(props);
            // A button for each of Intents 0-1 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.getByLabelText(`${props.intents[key].question}`)).toBeInTheDocument();
            });
        });
    });

    describe("For clicking on intent navigation buttons", () => {
        it ("should correctly dispatch the selected intent index if that intent is the 1st of the 3 intents on its page", () => {
            renderComponent(props);
            const dispatch = jest.spyOn(store, 'dispatch');
            userEvent.click(screen.getByLabelText("Sample Intent 3"));
            expect(dispatch).toHaveBeenCalledWith({ type: 'analyzeTranscript/setDisplayingQuestion', payload: 3});
        });

        it ("should correctly dispatch the selected intent index if that intent is the 2nd of the 3 intents on its page", () => {
            renderComponent(props);
            const dispatch = jest.spyOn(store, 'dispatch');
            userEvent.click(screen.getByLabelText("Sample Intent 4"));
            expect(dispatch).toHaveBeenCalledWith({ type: 'analyzeTranscript/setDisplayingQuestion', payload: 3});
        });

        it ("should correctly dispatch the selected intent index if that intent is the 3rd of the 3 intents on its page", () => {
            renderComponent(props);
            const dispatch = jest.spyOn(store, 'dispatch');
            userEvent.click(screen.getByLabelText("Sample Intent 5"));
            expect(dispatch).toHaveBeenCalledWith({ type: 'analyzeTranscript/setDisplayingQuestion', payload: 3});
        });
    });

    describe("For the search feature", () => {
        it ("should display an empty list of intents if there are none matching the search input value", () => {
            renderComponent(props);
            userEvent.type(screen.getByLabelText("Search by intent contents"), "A bad search string");
            expect(screen.queryByTestId("intent-menu-list-item")).not.toBeInTheDocument();
        });

        it ("should correctly display 1 intent with the proper highlight styling if there is 1 matching the search input value", () => {
            renderComponent(props);
            userEvent.type(screen.getByLabelText("Search by intent contents"), "Intent 0");
            // A button for Intent 0 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByLabelText(`${props.intents[key].question}`).length).toBe(key < 1 ? 1 : 0);
            });
            // Check for styling of each slice of text in the intent button
            expect(screen.getByText(/...mple /)).not.toHaveClass("bg-gray-100");  // The first slice "...mple "
            expect(screen.getByText("Intent 0")).toHaveClass("bg-gray-100");  // Highlighted fragment
            expect(screen.getByText(/special/)).not.toHaveClass("bg-gray-100");  // Fragment of the last slice " (special search substring)"
        });

        it ("should correctly display 2 intents with the proper highlight styling if there are 2 matching the search input value", () => {
            renderComponent(props);
            userEvent.type(screen.getByLabelText("Search by intent contents"), "(special search substring)");
            // A button for each of Intents 0-1 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByLabelText(`${props.intents[key].question}`).length).toBe(key < 2 ? 1 : 0);
            });
            // Check for styling of each slice of text in each of the intent buttons
            expect(screen.getByText(/...nt 0/)).not.toHaveClass("bg-gray-100");  // First slice of the first intent "[Sample Inte]nt 0  "
            expect(screen.getByText(/...nt 1/)).not.toHaveClass("bg-gray-100");  // First slice of the second intent "[Sample Inte]nt 1 "
            screen.getAllByText("(special search substring)").forEach((element) => expect(element).toHaveClass("bg-gray-100"));  // Fragment of the second slice of both intents "(special search substring)"
            // For both intents, there is no third slice to check as the search string includes the tail of both intents' contents
        });

        it ("should display the full list of intents with the proper non-highlight styling if there is no search input value", () => {
            renderComponent(props);
            userEvent.clear(screen.getByLabelText("Search by intent contents"));
            // A button for each of Intents 0-8 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.getByLabelText(`${props.intents[key].question}`)).toBeInTheDocument();
            });
        });
    });

    describe("For opening and closing", () => {
        it ("should call its onClickOutside prop function if clicking the X button", () => {
            renderComponent(props);
            userEvent.click(screen.getByLabelText("Close intent menu"));
            expect(props.onClickOutside).toHaveBeenCalled();
        });

        it ("should have the proper styling when closed", () => {
            props.isOpen = false;
            renderComponent(props);
            expect(screen.getByTestId("intent-menu")).toHaveClass("-translate-x-full");
        });

        it ("should have the proper styling when open", () => {
            renderComponent(props);
            expect(screen.getByTestId("intent-menu")).toHaveClass("translate-x-0");
        });
    });

    describe("For properly responding to outside click events", () => {
        it ("should call its onClickOutside prop function if clicking outside the component", () => {
            renderComponent(props);
            userEvent.click(document.body);
            expect(props.onClickOutside).toHaveBeenCalled();
        });

        it ("should not call its onClickOutside prop function if clicking inside the component", async() => {
            renderComponent(props);
            userEvent.click(screen.getByLabelText("Search by intent contents"));
            expect(props.onClickOutside).not.toHaveBeenCalled();
        });

        it ("should add correct event listeners when the component mounts", () => {
            document.addEventListener = jest.fn();
            renderComponent(props);
            // Expect addEventListener to be called with proper event types and some functions
            expect(document.addEventListener).toHaveBeenCalledWith("mousedown", expect.any(Function), false);
            // Expect the function argument to correspond to the correct event handler function in IntentMenu.jsx
            expect(document.addEventListener.mock.calls[0][1].name).toBe("bound handleClickOutside");
        });

        it ("should remove correct event listeners when the component unmounts", () => {
            document.removeEventListener = jest.fn();
            const {unmount} = renderComponent(props);
            unmount();
            // Expect removeEventListener to be called with proper event type and some function
            expect(document.removeEventListener).toBeCalledWith("mousedown", expect.any(Function), false);
            // Expect the function argument to correspond to the correct event handler function in IntentMenu.jsx
            expect(document.removeEventListener.mock.calls[0][1].name).toBe("bound handleClickOutside");
        });
    });
});
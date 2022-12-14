import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import IntentMenu from './IntentMenu.jsx';
import sampleIntents from '../test-data/sampleIntents.js';
import store from "../../store.js";

const dispatch = jest.spyOn(store, 'dispatch');

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
        for (let intent of props.intents) {
            intent.star = false;
            intent.flag = false;
        }
    });

    describe("For generating and listing intent buttons", () => {
        it ("should generate and display a button corresponding to each intent if there are no intents", () => {
            props.intents = [];
            renderComponent(props);
            expect(screen.queryByTestId("intent-menu-list-item")).not.toBeInTheDocument();
        });
        
        it ("should generate and display a button corresponding to each intent if there is 1 intent", () => {
            props.intents = sampleIntents.slice(0, 1);
            renderComponent(props);
            // A button for Intents 0 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.getByLabelText(`${props.intents[key].question}`)).toBeInTheDocument();
            });
        });

        it ("should generate and display a button corresponding to each intent if there are 2 intents", () => {
            props.intents = sampleIntents.slice(0, 2);
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
            userEvent.click(screen.getByLabelText("Sample Intent 3"));
            expect(dispatch).toHaveBeenCalledWith({ type: 'analyzeTranscript/setDisplayingQuestion', payload: 3});
        });

        it ("should correctly dispatch the selected intent index if that intent is the 2nd of the 3 intents on its page", () => {
            renderComponent(props);
            userEvent.click(screen.getByLabelText("Sample Intent 4"));
            expect(dispatch).toHaveBeenCalledWith({ type: 'analyzeTranscript/setDisplayingQuestion', payload: 3});
        });

        it ("should correctly dispatch the selected intent index if that intent is the 3rd of the 3 intents on its page", () => {
            renderComponent(props);
            userEvent.click(screen.getByLabelText("Sample Intent 5"));
            expect(dispatch).toHaveBeenCalledWith({ type: 'analyzeTranscript/setDisplayingQuestion', payload: 3});
        });
    });

    describe("For the search feature", () => {

        it ("should correctly display 1 intent with the proper highlight styling if there is 1 matching the search input value", () => {
            renderComponent(props);
            userEvent.type(screen.getByLabelText("Search by keyword"), "Intent 0");
            // A button for Intent 0 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByLabelText(`${props.intents[key].question}`).length).toBe(key < 1 ? 1 : 0);
            });
            // Check for styling of each slice of text in the intent button
            expect(screen.getByText(/...mple /)).not.toHaveClass("bg-gray-100");  // The first slice "...mple "
            expect(screen.getByText("Intent 0")).toHaveClass("bg-gray-100");  // Highlighted fragment
            expect(screen.getByText(/special/)).not.toHaveClass("bg-gray-100");  // Fragment of the last slice " (special search substring)"
        });

        it ("should display the full list of intents with the proper non-highlight styling if there is no search input value", () => {
            renderComponent(props);
            userEvent.clear(screen.getByLabelText("Search by keyword"));
            // A button for each of Intents 0-8 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.getByLabelText(`${props.intents[key].question}`)).toBeInTheDocument();
            });
        });
    });

    describe("For the star and flag circle", () => {
        it ("should display a yellow circle if starred", () => {
            props.intents[0].star = true;
            renderComponent(props);
            expect(screen.getByTestId("star-circle")).toBeInTheDocument();
        });

        it ("should display a red circle if flagged", () => {
            props.intents[0].flag = true;
            renderComponent(props);
            expect(screen.getByTestId("flag-circle")).toBeInTheDocument();
        });

        it ("should display both circles if both flagged and starred", () => {
            props.intents[0].star = true;
            props.intents[1].flag = true;
            renderComponent(props);
            expect(screen.getByTestId("star-circle")).toBeInTheDocument();
            expect(screen.getByTestId("flag-circle")).toBeInTheDocument();
        });
    });

    describe("For the star and flag filter feature", () => {
        it ("should display an empty list of intents if there are no stars", () => {
            renderComponent(props);
            userEvent.click(screen.getByTestId("star-filter"));
            expect(screen.queryByTestId("intent-menu-list-item")).not.toBeInTheDocument();
            // To get make the starFilter false for future testing
            userEvent.click(screen.getByTestId("star-filter"));
        });

        it ("should display an empty list of intents if there are no flags", () => {
            renderComponent(props);
            userEvent.click(screen.getByTestId("flag-filter"));
            expect(screen.queryByTestId("intent-menu-list-item")).not.toBeInTheDocument();
            // To get make the flagFilter false for future testing
            userEvent.click(screen.getByTestId("flag-filter"));
        });

        it ("should correctly display 1 intent when only one is starred", () => {
            props.intents[0].star = true;
            renderComponent(props);
            userEvent.click(screen.getByTestId("star-filter"));
            // A button for Intent 0 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByLabelText(`${props.intents[key].question}`).length).toBe(key < 1 ? 1 : 0);
            });
            // To get make the starFilter false for future testing
            userEvent.click(screen.getByTestId("star-filter"));
        });

        it ("should correctly display 1 intent when only one is flagged", () => {
            props.intents[0].flag = true;
            renderComponent(props);
            userEvent.click(screen.getByTestId("flag-filter"));
            // A button for Intent 0 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByLabelText(`${props.intents[key].question}`).length).toBe(key < 1 ? 1 : 0);
            });
            // To get make the flagFilter false for future testing
            userEvent.click(screen.getByTestId("flag-filter"));
        });

        it ("should display two intents when two intents are both starred and flagged and menu is closed", () => {
            props.intents[0].star = true;
            props.intents[0].flag = true;
            props.intents[1].star = true;
            props.intents[1].flag = true;
            renderComponent(props);
            userEvent.click(screen.getByTestId("star-filter"));
            userEvent.click(screen.getByTestId("flag-filter"));
            // A button for each of Intents 0-1 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByLabelText(`${props.intents[key].question}`).length).toBe(key < 2 ? 1 : 0);
            });
            // Close intent menu
            userEvent.click(screen.getByLabelText("Close intent menu"));
            // Button amount stays the same even when closed
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByLabelText(`${props.intents[key].question}`).length).toBe(key < 2 ? 1 : 0);
            });
            // To get make the filters false for future testing
            userEvent.click(screen.getByTestId("star-filter"));
            userEvent.click(screen.getByTestId("flag-filter"));
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
            userEvent.click(screen.getByLabelText("Search by keyword"));
            expect(props.onClickOutside).not.toHaveBeenCalled();
        });
    });

    describe("For keyboard shortcuts to close the Intent Menu", () => {
        it ("should call its onClickOutside prop function if pressing Enter key while not focused on the Intent Menu", () => {
            renderComponent(props);
            userEvent.keyboard("{Enter}");
            expect(props.onClickOutside).toHaveBeenCalled();
        });

        it ("should call its onClickOutside prop function if pressing Space key while not focused on the Intent Menu", () => {
            renderComponent(props);
            userEvent.keyboard("{Space}");
            expect(props.onClickOutside).toHaveBeenCalled();
        });

        it ("should not call its onClickOutside prop function if pressing Enter key while focused on the Intent Menu", () => {
            renderComponent(props);
            screen.getByLabelText("Search by keyword").focus();
            userEvent.keyboard("{Enter}");
            expect(props.onClickOutside).not.toHaveBeenCalled();
        });

        it ("should not call its onClickOutside prop function if pressing Space key while focused on the Intent Menu", () => {
            renderComponent(props);
            screen.getByLabelText("Search by keyword").focus();
            userEvent.keyboard("{Space}");
            expect(props.onClickOutside).not.toHaveBeenCalled();
        });

        it ("should call its onClickOutside prop function if pressing Escape key", () => {
            renderComponent(props);
            userEvent.keyboard("{Escape}");
            expect(props.onClickOutside).toHaveBeenCalled();
        });
    });

    describe("For event listeners", () => {
        it ("should add correct event listeners when the component mounts", () => {
            document.addEventListener = jest.fn();
            renderComponent(props);
            // Expect addEventListener to be called with proper event types and some functions
            expect(document.addEventListener).toHaveBeenCalledWith("mousedown", expect.any(Function), false);
            expect(document.addEventListener).toHaveBeenCalledWith("keydown", expect.any(Function), false);
            // Expect the function argument to correspond to the correct event handler function in IntentMenu.jsx
            expect(document.addEventListener.mock.calls[0][1].name).toBe("bound handleClickOutside");
            expect(document.addEventListener.mock.calls[1][1].name).toBe("bound handleKeyDown");
        });

        it ("should remove correct event listeners when the component unmounts", () => {
            document.removeEventListener = jest.fn();
            const {unmount} = renderComponent(props);
            unmount();
            // Expect removeEventListener to be called with proper event type and some function
            expect(document.removeEventListener).toBeCalledWith("mousedown", expect.any(Function), false);
            expect(document.removeEventListener).toBeCalledWith("keydown", expect.any(Function), false);
            // Expect the function argument to correspond to the correct event handler function in IntentMenu.jsx
            expect(document.removeEventListener.mock.calls[0][1].name).toBe("bound handleClickOutside");
            expect(document.removeEventListener.mock.calls[1][1].name).toBe("bound handleKeyDown");
        });
    });
});
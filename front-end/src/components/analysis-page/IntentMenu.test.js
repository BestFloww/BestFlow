import {render, screen} from '@testing-library/react';
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
    });

    afterAll(() => {
    }); 

    describe("For generating and listing intent buttons", () => {
        it ("should generate and display a button corresponding to each intent", () => {
        });
    });

    describe("For clicking on intent navigation buttons", () => {
        it ("should correctly go to the selected intent index if that intent is the 1st of the 3 intents on its page", () => {
        });

        it ("should correctly go to the selected intent index if that intent is the 2nd of the 3 intents on its page", () => {
        });

        it ("should correctly go to the selected intent index if that intent is the 3rd of the 3 intents on its page", () => {
        });
    });

    describe("For searching intents", () => {
        it ("should display a subset of intents matching the search input value if there exist any", () => {
        });

        it ("should display an empty list of intents if there are none matching the search input value", () => {
        });

        it ("should display the full list of intents if there is no search input value", () => {
        });
    });

    describe("For proper animation", () => {
        it ("should have the proper styling when closed", () => {
        });

        it ("should have the proper styling when open", () => {
        });
    });

    describe("For properly responding to clicking outside events", () => {
        it ("should call its onClickOutside props function if clicking outside the component", () => {
        });

        it ("should not call its onClickOutside props function if clicking inside the component", () => {
        });

        it ("should add correct event listeners when the component mounts", () => {
            document.addEventListener = jest.fn();
            renderComponent(props);
            // Expect addEventListener to be called with proper event types and some functions
            expect(document.addEventListener).toHaveBeenCalledWith("mousedown", expect.any(Function), false);
            // Expect the function argument to correspond to the correct event handler function in IntentMenu.jsx
            expect(document.addEventListener.mock.calls[1][1].name).toBe("bound handleClickOutside");
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
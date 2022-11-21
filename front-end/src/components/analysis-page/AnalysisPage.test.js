import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store.js';
import { AnalysisPage } from './AnalysisPage.jsx';

describe('AnalysisPage', () => {
    let props;

    beforeEach(() => {
        props = {
            projectId: "1",
            analyzedTranscripts: {"1":[{question: "a", children: {"b": 100,}}]}
            }
        });

    const renderComponent = (props) => render(
        <Provider store={store} >
            <AnalysisPage {...props} />
        </Provider>
    );

    it('should dispatch openMainPage when logo button is clicked', () => {
        renderComponent(props);
        const dispatch = jest.spyOn(store, 'dispatch');
        userEvent.click(screen.getByTestId('logo-button'));
        expect(dispatch).toHaveBeenCalledWith({ type: 'switchPage/openMainPage' });
    });

    describe("For the Intent Menu", () => {
        it('should not display Intent Menu initially', () => {
            renderComponent(props);
            // Having this class implies the intent menu is off-screen
            expect(screen.getByTestId("intent-menu")).toHaveClass("-translate-x-full");
        });
    
        it('should open the Intent Menu when the Intent Menu hamburger button is pressed', () => {
            renderComponent(props);
            userEvent.click(screen.getByLabelText("Open intent menu"));
            // Having this class implies the intent menu is on-screen
            expect(screen.getByTestId("intent-menu")).toHaveClass("translate-x-0");
        });
    
        it('should close the Intent Menu when the Intent Menu X button is pressed', () => {
            renderComponent(props);
            userEvent.click(screen.getByLabelText("Open intent menu"));
            userEvent.click(screen.getByLabelText("Close intent menu"));
            // Having this class implies the intent menu is off-screen
            expect(screen.getByTestId("intent-menu")).toHaveClass("-translate-x-full");
        });
    
        it('should close the Intent Menu when clicking elsewhere on the page while it is open', () => {
            renderComponent(props);
            userEvent.click(screen.getByLabelText("Open intent menu"));
            userEvent.click(screen.getByTestId("analysis-page-main"));
            // Having this class implies the intent menu is off-screen
            expect(screen.getByTestId("intent-menu")).toHaveClass("-translate-x-full");
        });
    
        it('should keep normal brightness for the main section of the page when the Intent Menu is closed', () => {
            renderComponent(props);
            expect(screen.getByTestId("analysis-page-main")).not.toHaveClass("brightness-75");
        });
    
        it('should reduce the brightness of the main section of the page when the Intent Menu is opened', () => {
            renderComponent(props);
            userEvent.click(screen.getByLabelText("Open intent menu"));
            expect(screen.getByTestId("analysis-page-main")).toHaveClass("brightness-75");
        });

        it('should not hide the content of the main section of the page from accessibility API when the Intent Menu is closed', () => {
            renderComponent(props);
            expect(screen.getByTestId("analysis-page-main").getAttribute("aria-hidden")).toBe("false");
        });
    
        it('should hide the content of the main section of the page from accessibility API when the Intent Menu is opened', () => {
            renderComponent(props);
            userEvent.click(screen.getByLabelText("Open intent menu"));
            expect(screen.getByTestId("analysis-page-main").getAttribute("aria-hidden")).toBe("true");
        });
    });

});
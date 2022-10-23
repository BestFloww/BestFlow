import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BaseButton from './BaseButton.jsx';

/** 
 * Think of this file as an example testing file. Please do not hesitate to ask me questions about why I do things.
 * The tests in this file are a little more complicated than necessary, but show good design patterns.
 */


describe('BaseButton tests', () => {
    const basicProps = {
        click: jest.fn(),
        text: "sampleText",
    };
    const renderComponent = (props, componentDisabled) => {
        render(<BaseButton {... props} isDisabled={componentDisabled}/>)
    }

    it('should call the click function on click', () => {
        renderComponent(basicProps, false);
        userEvent.click(screen.getByTestId('custom-button'));
        expect(basicProps.click).toHaveBeenCalled();
    });

    it('should display the given text', async() => {
        renderComponent(basicProps, false);
        expect(await screen.findByTestId("custom-button")).toHaveTextContent(basicProps.text);
    });

    it('should have correct style if isDisabled is false', async() => {
        renderComponent(basicProps, false);
        expect(screen.getByTestId('custom-button')).toHaveClass("bg-blue-300 rounded-lg shadow-lg hover:bg-blue-200 active:bg-blue-400 py-3 px-6");
    });

    it('should not be disabled if isDisabled is false', async() => {
        renderComponent(basicProps, false);
        expect(screen.getByTestId('custom-button')).not.toBeDisabled();
    });

    it('should have correct style if isDisabled is true', async() => {
        renderComponent(basicProps, true);
        expect(screen.getByTestId('custom-button')).toHaveClass("bg-blue-300 rounded-lg shadow-lg opacity-50 py-3 px-6");
    });

    it('should be disabled if isDisabled is true', async() => {
        renderComponent(basicProps, true);
        expect(screen.getByTestId('custom-button')).toBeDisabled();
    });

});

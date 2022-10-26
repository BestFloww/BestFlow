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
    const renderComponent = (props, buttonDisabled, buttonSize) => {
        render(<BaseButton {... props} isDisabled={buttonDisabled} size={buttonSize}/>)
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

    it('should have correct default style if isDisabled is false and no size is given', async() => {
        renderComponent(basicProps, false);
        expect(screen.getByTestId('custom-button')).toHaveClass("font-cabin bg-purple-300 rounded-lg shadow-lg shadow-blue/30 hover:bg-purple-200 active:bg-purple-400 py-3 px-6 md:text-lg 2xl:text-2xl");
    });

    it('should not be disabled if isDisabled is false', async() => {
        renderComponent(basicProps, false);
        expect(screen.getByTestId('custom-button')).not.toBeDisabled();
    });

    it('should have correct default style if isDisabled is true and no size is given', async() => {
        renderComponent(basicProps, true);
        expect(screen.getByTestId('custom-button')).toHaveClass("font-cabin bg-purple-300 rounded-lg shadow-lg shadow-blue/30 opacity-50");
    });

    it('should be disabled if isDisabled is true', async() => {
        renderComponent(basicProps, true);
        expect(screen.getByTestId('custom-button')).toBeDisabled();
    });

    it('should be small if size is small', async() => {
        renderComponent(basicProps, false, "sm");
        expect(screen.getByTestId('custom-button')).toHaveClass("font-cabin bg-purple-300 rounded-lg shadow-lg shadow-blue/30 hover:bg-purple-200 active:bg-purple-400 py-1 px-4 md:text-md 2xl:text-lg");
    });

    it('should be large if size is large', async() => {
        renderComponent(basicProps, false, "lg");
        expect(screen.getByTestId('custom-button')).toHaveClass("font-cabin bg-purple-300 rounded-lg shadow-lg shadow-blue/30 hover:bg-purple-200 active:bg-purple-400 md:py-5 md:px-6 md:text-2xl 2xl:py-6 2xl:px-9 2xl:text-2xl");
    });

});

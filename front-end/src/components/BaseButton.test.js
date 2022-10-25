import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BaseButton from './BaseButton.jsx';
import Icon from './Icon.jsx';

/** 
 * Think of this file as an example testing file. Please do not hesitate to ask me questions about why I do things.
 * The tests in this file are a little more complicated than necessary, but show good design patterns.
 */

jest.mock('./Icon.jsx', () => jest.fn(() => null));

describe('BaseButton tests', () => {
    const basicProps = {
        click: jest.fn(),
        text: "sampleText",
    };

    const sampleIcon = {
        name: "magnifying-glass",
        color: "red",
        size: "40"
    };

    const renderComponent = (props, buttonDisabled, iconProps = null) => {
        render(<BaseButton {... props} isDisabled={buttonDisabled} icon={iconProps}/>)
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

    it('should not render an Icon child if there are no icon props', () => {
        renderComponent(basicProps, false);
        expect(Icon).not.toHaveBeenCalled();
    });

    it('should correctly render and pass icon props to its Icon child if there are any', () => {
        renderComponent(basicProps, false, sampleIcon);
        expect(Icon).toHaveBeenCalledWith({ icon: sampleIcon }, {});
    });

    it('should have correct style if isDisabled is false', () => {
        renderComponent(basicProps, false);
        expect(screen.getByTestId('custom-button')).toHaveClass("bg-blue-300 rounded-lg shadow-lg py-3 px-6 hover:bg-blue-200 active:bg-blue-400");
    });

    it('should not be disabled if isDisabled is false', () => {
        renderComponent(basicProps, false);
        expect(screen.getByTestId('custom-button')).not.toBeDisabled();
    });

    it('should have correct style if isDisabled is true', () => {
        renderComponent(basicProps, true);
        expect(screen.getByTestId('custom-button')).toHaveClass("bg-blue-300 rounded-lg shadow-lg py-3 px-6 opacity-50");
    });

    it('should be disabled if isDisabled is true', () => {
        renderComponent(basicProps, true);
        expect(screen.getByTestId('custom-button')).toBeDisabled();
    });
});

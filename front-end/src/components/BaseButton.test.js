import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import BaseButton from './BaseButton.jsx';

/** 
 * Think of this file as an example testing file. Please do not hesitate to ask me questions about why I do things.
 * The tests in this file are a little more complicated than necessary, but show good design patterns.
 */


describe('BasButton tests', () => {
    const basicProps = {
        click: jest.fn(),
        text: "sampleText",
    };
    const renderComponent = (props) => {
        render(<BaseButton {... basicProps}/>)
    }

    it('should call the click function on click', () => {
        renderComponent(basicProps);
        userEvent.click(screen.getByTestId('custom-button'));
        expect(basicProps.click).toHaveBeenCalled();
    });

    it('should display the given text', async() => {
        renderComponent(basicProps);
        expect((await screen.findByTestId("custom-button"))).toHaveTextContent(basicProps.text);
    });

});

import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Icon from './Icon.jsx';

describe('Icon', () => {
    const basicProps = {
        name: "magnifying-glass",
        color: "red",
        size: "40"
    };

    const renderComponent = (props) => {
        return render(<Icon icon={props}/>);
    }

    it('should render the correct icon if name is given', () => {
        renderComponent(basicProps);
        expect(screen.getByTestId(`custom-icon-${basicProps.name}`)).toHaveClass(`icon-${basicProps.name}`);
    });

    it('should render the icon with the correct alt text', () => {
        renderComponent(basicProps);
        expect(screen.getByTestId(`custom-icon-${basicProps.name}`).getAttribute('alt')).toBe(basicProps.name);
    });
    
    it('should render the icon with the correct color', () => {
        renderComponent(basicProps);
        expect(screen.getByTestId(`custom-icon-${basicProps.name}`).getAttribute('fill')).toBe(basicProps.color);
    });
    
    it('should render the icon with the correct size', () => {
        renderComponent(basicProps);
        expect(screen.getByTestId(`custom-icon-${basicProps.name}`).getAttribute('width')).toBe(basicProps.size);
        expect(screen.getByTestId(`custom-icon-${basicProps.name}`).getAttribute('height')).toBe(basicProps.size);
    });
});

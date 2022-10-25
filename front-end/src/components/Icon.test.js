import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Icon from './Icon.jsx';

describe('Icon tests', () => {
    const basicProps = {
        name: "magnifying-glass",
        color: "red",
        size: "40"
    };

    const renderComponent = (props) => {
        render(<Icon icon={props}/>)
    }

    it('should render the correct svg icon', () => {
        renderComponent(basicProps);
        expect(screen.getByTestId('custom-icon')).toHaveClass(`icon-${basicProps.name}`);
    });

    it('should render the icon with the correct color', () => {
        renderComponent(basicProps);
        expect(screen.getByTestId('custom-icon').getAttribute('fill')).toBe(basicProps.color);
    });
    
    it('should render the icon with the correct size', () => {
        renderComponent(basicProps);
        expect(screen.getByTestId('custom-icon').getAttribute('width')).toBe(basicProps.size);
        expect(screen.getByTestId('custom-icon').getAttribute('height')).toBe(basicProps.size);
    });
});

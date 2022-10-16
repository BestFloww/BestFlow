import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import IntentDiagram from './IntentDiagram.jsx';




describe("IntentDiagram", () => {
    let props;
    const renderComponent = (props) => {
        render(<IntentDiagram {...props} />)
    }
    beforeEach(() => {
        props = {
            question: "question",
            children: {
                q1: 100
            },
        };
    });
    it("correctly displays 1 question", () => {
        renderComponent(props);
        const question = screen.getByTestId(props.question);
        expect(question).toBeInTheDocument();
        expect(question.textContent).toBe(props.question);
    });
});
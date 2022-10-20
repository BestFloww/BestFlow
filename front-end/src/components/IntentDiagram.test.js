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
            branches: {
                q1: 100
            },
        };
    });
    it("correctly displays the question", () => {
        renderComponent(props);
        const question = screen.getByTestId(props.question);
        expect(question).toBeInTheDocument();
        expect(question.textContent).toBe(props.question);
    });
    it("correctly displays 1 branch", () => {
        renderComponent(props);
        const q1 = screen.getByTestId("q1");
        const percentage = screen.getByTestId("q1-100");
        expect(q1).toBeInTheDocument();
        expect(q1.textContent).toBe("q1");
        expect(percentage).toBeInTheDocument();
        expect(percentage.textContent).toBe(`${props.branches.q1}%`)
    });

    it("correctly displays 2 branches", () => {
        props.branches = {
            q1: 50,
            q2: 50,
        };
        renderComponent(props);
        for (const key of Object.keys(props.branches)) {
        const value = props.branches[key];
        const q = screen.getByTestId(key);
        const percentage = screen.getByTestId(`${key}-${value}`);
        expect(q).toBeInTheDocument();
        expect(q.textContent).toBe(key);
        expect(percentage).toBeInTheDocument();
        expect(percentage.textContent).toBe(`${value}%`)
        }
    });

    it("correctly displays 3 branches", () => {
        props.branches = {
            q1: 50,
            q2: 20,
            q3: 30,
        };
        renderComponent(props);
        for (const key of Object.keys(props.branches)) {
        const value = props.branches[key];
        const q = screen.getByTestId(key);
        const percentage = screen.getByTestId(`${key}-${value}`);
        expect(q).toBeInTheDocument();
        expect(q.textContent).toBe(key);
        expect(percentage).toBeInTheDocument();
        expect(percentage.textContent).toBe(`${value}%`)
        }
    });
});
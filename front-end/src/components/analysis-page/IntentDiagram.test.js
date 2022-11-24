import {render, screen, waitFor} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import IntentDiagram from './IntentDiagram.jsx';
import StarAPI from "../../services/StarAPI.js";
import FlagAPI from "../../services/FlagAPI.js";

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

    it("correctly displays the question", () => {
        renderComponent(props);
        const question = screen.getByTestId(props.question);
        expect(question).toBeInTheDocument();
        expect(question.textContent).toBe(props.question);
    });

    it("correctly displays 1 child", () => {
        renderComponent(props);
        const q1 = screen.getByTestId("q1");
        const percentage = screen.getByTestId("q1-100");
        expect(q1).toBeInTheDocument();
        expect(q1.textContent).toBe("q1");
        expect(percentage).toBeInTheDocument();
        expect(percentage.textContent).toBe(`${props.children.q1}%`)
    });

    it("correctly displays 2 children", () => {
        props.children = {
            q1: 50,
            q2: 50,
        };
        renderComponent(props);
        for (const key of Object.keys(props.children)) {
        const value = props.children[key];
        const q = screen.getByTestId(key);
        const percentage = screen.getByTestId(`${key}-${value}`);
        expect(q).toBeInTheDocument();
        expect(q.textContent).toBe(key);
        expect(percentage).toBeInTheDocument();
        expect(percentage.textContent).toBe(`${value}%`)
        }
    });

    it("correctly displays 3 children", () => {
        props.children = {
            q1: 50,
            q2: 20,
            q3: 30,
        };
        renderComponent(props);
        for (const key of Object.keys(props.children)) {
        const value = props.children[key];
        const q = screen.getByTestId(key);
        const percentage = screen.getByTestId(`${key}-${value}`);
        expect(q).toBeInTheDocument();
        expect(q.textContent).toBe(key);
        expect(percentage).toBeInTheDocument();
        expect(percentage.textContent).toBe(`${value}%`)
        }
    });
    it.skip("correctly displays flagged icon when intent is flagged", async() => { //remove skip once BE is implemented
        renderComponent(props);
        userEvent.click(screen.getByTestId("flag-button"));
        // Waits for toggleFlagged to run
        await waitFor(() => expect(screen.getByTestId("flag svg")).toHaveClass("fill-red"));
    });
    it.skip("correctly displays starred icon when intent is starred", async() => { //remove skip once BE is implemented
        renderComponent(props);
        userEvent.click(screen.getByTestId("star-button"));
        // Waits for toggleStarred to run
        await waitFor(() => expect(screen.getByTestId("star svg")).toHaveClass("fill-yellow"));
    });
    it.skip("should dispatch intent when flag button is clicked", async() => { //remove skip once BE is implemented
        renderComponent(props);
        userEvent.click(screen.getByTestId("flag-button"));
        // Waits for toggleFlagged to run
        await waitFor(() => expect(FlagAPI.putFlag).toHaveBeenCalled());
    });
    it.skip("should dispatch intent when star button is clicked", async() => { //remove skip once BE is implemented
        renderComponent(props);
        userEvent.click(screen.getByTestId("star-button"));
        // Waits for toggleStarred to run
        await waitFor(() => expect(StarAPI.putStar).toHaveBeenCalled());
    });
});
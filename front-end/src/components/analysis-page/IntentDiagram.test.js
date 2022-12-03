import {render, screen, waitFor} from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import IntentDiagram from './IntentDiagram.jsx';
import store from '../../store.js';
import { setProjectIdToBeDisplayed } from '../../store/analyzeTranscriptSlice.js';
import StarAPI from "../../services/StarAPI.js";
import FlagAPI from "../../services/FlagAPI.js";

jest.spyOn(window, "alert").mockImplementation();
jest.mock("../../services/StarAPI.js");
jest.mock("../../services/FlagAPI.js");

describe("IntentDiagram", () => {
    let props;
    
    const renderComponent = (props) => {
        render(
        <Provider store={store}>
            <IntentDiagram {...props} />
        </Provider>
        )
    }

    beforeEach(() => {
        props = {
            question: "question",
            children: {
                q1: 100
            },
            isStarred: false,
            isFlagged: false,
        };

        store.dispatch(setProjectIdToBeDisplayed("1"));
        jest.clearAllMocks();
    });

    afterAll(() => {
        store.dispatch(setProjectIdToBeDisplayed(""));
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

    it("correctly displays flagged icon when intent is flagged", () => {
        props.isFlagged = true;
        renderComponent(props);
        expect(screen.getByTestId("flag-svg")).toHaveClass("fill-red");
    });

    it("correctly displays starred icon when intent is starred", () => {
        props.isStarred = true;
        renderComponent(props);
        expect(screen.getByTestId("star-svg")).toHaveClass("fill-yellow");
    });

    it("should dispatch intent when flag button is clicked", async() => {
        renderComponent(props);
        const dispatch = jest.spyOn(store, 'dispatch');
        userEvent.click(screen.getByTestId("flag-button"));
        // Waits for toggleFlagged to run
        await waitFor(() => expect(FlagAPI.put).toHaveBeenCalledWith({question: "question", projectId: "1", flagStatus: true}));
        expect(dispatch).toHaveBeenCalledWith({"payload": "question", "type": "analyzeTranscript/toggleFlag",});
    });

    it("should dispatch intent when star button is clicked", async() => {
        renderComponent(props);
        const dispatch = jest.spyOn(store, 'dispatch');
        userEvent.click(screen.getByTestId("star-button"));
        // Waits for toggleStarred to run
        await waitFor(() => expect(StarAPI.put).toHaveBeenCalledWith({question: "question", projectId: "1", starStatus: true}));
        expect(dispatch).toHaveBeenCalledWith({"payload": "question", "type": "analyzeTranscript/toggleStar",});
    });

    it("should dispatch goToIntentByQuestion with the leaf's question if a leaf is clicked and is not End of Conversation", () => {
        renderComponent(props);
        const dispatch = jest.spyOn(store, 'dispatch');
        userEvent.click(screen.getByTestId("leaf-q1"));
        expect(dispatch).toHaveBeenCalledWith({"payload": "q1", "type": "analyzeTranscript/goToIntentByQuestion",});
    });

    it("should dispatch goToIntentByQuestion with the leaf's question if a leaf is focused and not End of Conversation and Enter is pressed", () => {
        renderComponent(props);
        const dispatch = jest.spyOn(store, 'dispatch');
        screen.getByTestId("leaf-q1").focus();
        userEvent.keyboard("{Enter}");
        expect(dispatch).toHaveBeenCalledWith({"payload": "q1", "type": "analyzeTranscript/goToIntentByQuestion",});
    });

    it("should dispatch goToIntentByQuestion with the leaf's question if a leaf is focused and not End of Conversation and Space is pressed", () => {
        renderComponent(props);
        const dispatch = jest.spyOn(store, 'dispatch');
        screen.getByTestId("leaf-q1").focus();
        userEvent.keyboard("{Space}");
        expect(dispatch).toHaveBeenCalledWith({"payload": "q1", "type": "analyzeTranscript/goToIntentByQuestion",});
    });

    it("should not dispatch goToIntentByQuestion if a leaf is focused and End of Conversation and Enter is pressed", () => {
        props.children = {
            "END OF CONVERSATION": 100,
        };
        renderComponent(props);
        const dispatch = jest.spyOn(store, 'dispatch');
        screen.getByTestId("leaf-END OF CONVERSATION").focus();
        userEvent.keyboard("{Enter}");
        expect(dispatch).not.toHaveBeenCalled();
    });

    it("should dispatch goToIntentByQuestion if a leaf is focused and End of Conversation and Space is pressed", () => {
        props.children = {
            "END OF CONVERSATION": 100,
        };
        renderComponent(props);
        const dispatch = jest.spyOn(store, 'dispatch');
        screen.getByTestId("leaf-END OF CONVERSATION").focus();
        userEvent.keyboard("{Space}");
        expect(dispatch).not.toHaveBeenCalled();
    });

    it("should have proper hover styling on a leaf if it is not End of Conversation", () => {
        renderComponent(props);
        expect(screen.getByTestId("leaf-q1")).toHaveClass("hover:bg-green-100 focus:bg-green-100");
    });

    it("should have button role on a leaf if it is not End of Conversation", () => {
        renderComponent(props);
        // There should be 3 buttons - star, flag, and 1 leaf
        expect(screen.queryAllByRole("button").length).toBe(3);
    });

    it("should not have hover styling on a leaf if it is End of Conversation", () => {
        props.children = {
            "END OF CONVERSATION": 100,
        };
        renderComponent(props);
        expect(screen.getByTestId("leaf-END OF CONVERSATION")).not.toHaveClass("hover:bg-green-100 focus:bg-green-100");
    });

    it("should not have button role on a leaf if it is End of Conversation", () => {
        props.children = {
            "END OF CONVERSATION": 100,
        };
        renderComponent(props);
        // There should be 2 buttons - star and flag
        expect(screen.queryAllByRole("button").length).toBe(2);
    });

    it("correctly justifies when number of children are three or less", async() => {
        props.children = {
            q1: 50,
            q2: 20,
            q3: 30,
        };
        renderComponent(props);
        expect(screen.getByTestId("listLeaves-div")).toHaveClass("justify-evenly");
    });

    it("correctly justifies when number of children are more than three", async() => {
        props.children = {
            q1: 50,
            q2: 20,
            q3: 30,
            q4: 90,
        };
        renderComponent(props);
        expect(screen.getByTestId("listLeaves-div")).toHaveClass("md:overflow-auto");
    });
});
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import IntentLister from './IntentLister.jsx';

const sampleIntents = [
    {
      question: "Sample Intent 0",
      children: {
        "q1": 100,
      }
    },
    {
      question: "Sample Intent 1",
      children: {
        "q1": 10,
        "q2": 90
      }
    }, 
    {
      question: "Sample Intent 2",
      children: {
        "q1": 10,
        "q2": 20,
        "q3": 70,
      }
    },
    {
      question: "Sample Intent 3",
      children: {
        "q1": 10,
      }
    },
    {
      question: "Sample Intent 4",
      children: {
        "q1": 10,
        "q2": 90,
      }
    },
    {
      question: "Sample Intent 5",
      children: {
        "q1": 10,
        "q2": 20,
        "q3": 70,
      }
    },
    {
      question: "Sample Intent 6",
      children: {
        "q1": 100
      }
    },
    {
      question: "Sample Intent 7",
      children: {
        "q1": 10,
        "q2": 90,
      }
    },
    {
      question: "Sample Intent 8",
      children: {
        "q1": 10,
        "q2": 20,
        "q3": 70,
      }
    },
  ]

describe("IntentLister tests", () => {
    let props = {};

    const renderComponent = (props) => {
        render(<IntentLister {...props} />)
    }

    beforeEach(() => {
        props.intents = [...sampleIntents];
        props.initialIndex = 0;
    });

    describe("For displaying the proper intents based on the index", () => {
        it ("should display 3 intents if there are at least 3 remaining intents starting from the current index", () => {
            renderComponent(props);

            // Intents 0-2 should display, Intents 3-6 should not display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 3 ? 1 : 0);
            });
        });

        it ("should display 2 intents if there are 2 remaining intents starting from the current index", () => {
            props.initialIndex = 7;
            renderComponent(props);

            // Intents 0-6 should not display, Intents 7-8 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 7 ? 0 : 1);
            });
        });

        it ("should display 1 intent if there is 1 remaining intent starting from the current index", () => {
            props.initialIndex = 8;
            renderComponent(props);

            // Intents 0-7 should not display, Intent 8 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 8 ? 0 : 1);
            });
        });
    });

    describe("For incrementing and decrementing the index using the right and left arrow buttons", () => {
        it ("should increment index by 3 if the right arrow button is pressed and there are more than 3 remaining intents starting from the current index", () => {
            renderComponent(props);
            userEvent.click(screen.getByLabelText("Right Arrow"));

            // Intents 0-2 and 6-8 should not display, Intents 3-5 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe((key < 3 || key >= 6) ? 0 : 1);
            });
        });

        it ("should enable the right arrow button if there are more than 3 remaining intents starting from the current index", () => {
          renderComponent(props);
          expect(screen.getByLabelText("Right Arrow")).not.toBeDisabled();
        });

        it ("should disable the right arrow button if there are 3 remaining intents starting from the current index", () => {
            props.initialIndex = 6;
            renderComponent(props);
            expect(screen.getByLabelText("Right Arrow")).toBeDisabled();
        });

        it ("should disable the right arrow button if there are 2 remaining intents starting from the current index", () => {
            props.initialIndex = 7;
            renderComponent(props);
            expect(screen.getByLabelText("Right Arrow")).toBeDisabled();
        });

        it ("should disable the right arrow button if there is 1 remaining intent starting from the current index", () => {
            props.initialIndex = 8;
            renderComponent(props);
            expect(screen.getByLabelText("Right Arrow")).toBeDisabled();
        });

        it ("should decrement index by 3 if the left arrow button is pressed and there are intents before the current index", () => {
            props.initialIndex = 3;
            renderComponent(props);
            userEvent.click(screen.getByLabelText("Left Arrow"));

            // Intents 0-2 should display, Intents 3-8 should not display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 3 ? 1 : 0);
            });
        });

        it ("should enable the left arrow button if there are intents before the current index", () => {
            props.initialIndex = 3;
            renderComponent(props);
            expect(screen.getByLabelText("Left Arrow")).not.toBeDisabled();
        });

        it ("should disable the left arrow button if there are no intents before the current index", () => {
            renderComponent(props);
            expect(screen.getByLabelText("Left Arrow")).toBeDisabled();
        });
    });

    describe("For skipping to the first and last indices using CTRL + right and left arrow buttons", () => {
        it ("should increment index by 3 if the right arrow key is pressed and there are more than 3 remaining intents starting from the current index", () => {
            renderComponent(props);
            userEvent.keyboard("{ArrowRight}");

            // Intents 0-2 and 6-8 should not display, Intents 3-5 should display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe((key < 3 || key >= 6) ? 0 : 1);
            });
        });

        it ("should do nothing if the right arrow key is pressed and there are 3 remaining intents starting from the current index", () => {
            props.initialIndex = 6;
            renderComponent(props);
            userEvent.keyboard("{ArrowRight}");

            // Intents 0-5 should still not display, Intents 6-8 should still display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 6 ? 0 : 1);
            });
        });

        it ("should do nothing if the right arrow key is pressed and there are 2 remaining intents starting from the current index", () => {
            props.initialIndex = 6;
            props.intents = props.intents.slice(0, 8);  // Include only Intents 0-7
            renderComponent(props);
            userEvent.keyboard("{ArrowRight}");

            // Intents 0-5 should still not display, Intents 6-7 should still display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 6 ? 0 : 1);
            });
        });

        it ("should do nothing if the right arrow key is pressed and there is 1 remaining intent starting from the current index", () => {
            props.initialIndex = 6;
            props.intents = props.intents.slice(0, 7);  // Include only Intents 0-6
            renderComponent(props);
            userEvent.keyboard("{ArrowRight}");

            // Intents 0-5 should still not display, Intent 6 should still display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 6 ? 0 : 1);
            });
        });

        it ("should decrement index by 3 if the left arrow key is pressed and there are intents before the current index", () => {
            props.initialIndex = 3;
            renderComponent(props);
            userEvent.keyboard("{ArrowLeft}");

            // Intents 0-2 should display, Intents 3-8 should not display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 3 ? 1 : 0);
            });
        });

        it ("should do nothing if the left arrow key is pressed and there are no intents before the current index", () => {
            renderComponent(props);
            userEvent.keyboard("{ArrowLeft}");

            // Intents 0-2 should still display, Intents 3-8 should still not display
            Object.keys(props.intents).forEach((key) => {
                expect(screen.queryAllByTestId(`${props.intents[key].question}`).length).toBe(key < 3 ? 1 : 0);
            });
        });
    });

    describe("For skipping to the first and last indices using CTRL + right and left arrow buttons", () => {
        it ("should correctly skip to the last set of intents if CTRL + right arrow button is pressed and the set should have 3 intents", () => {
        });
    });
});
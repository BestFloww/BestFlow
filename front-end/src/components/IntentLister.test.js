import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import IntentLister from './IntentLister.jsx';

const fakeIntents = [
    {
      question: "hi",
      children: {
        "q1": 100,
      }
    },
    {
      question: "heyy",
      children: {
        "q1": 10,
        "q2": 20
      }
    }, 
    {
      question: "sup",
      children: {
        "q1": 10,
        "q2": 20,
        "q3": 70,
      }
    },
    {
      question: "hello",
      children: {
        "q1": 10,
        "q2": 20,
        "q3": 70,
      }
    },
    {
      question: "hiya",
      children: {
        "q1": 10,
        "q2": 20,
        "q3": 70,
      }
    },
    {
      question: "heya",
      children: {
        "q1": 10,
        "q2": 20,
        "q3": 70,
      }
    },
  ]

describe("IntentLister", () => {
    let props = {};

    const renderComponent = (props) => {
        render(<IntentLister {...props} />)
    }

    beforeEach(() => {
        props.intents = fakeIntents;
        props.initialIndex = 0;
    });

    it ("should display 3 intents if there are at least 3 remaining intents starting from the current index", () => {
        renderComponent(props);

        // Intents 0-2 should not display, Intents 3-5 should display
        Object.keys(fakeIntents).forEach((key) => {
          if (key < 3) {
            expect(screen.getByTestId(`${props.intents[key].question}`)).toBeInTheDocument();
          } else {
            expect(screen.queryByTestId(`${props.intents[key].question}`)).not.toBeInTheDocument();
          }
        });
    });

    it ("should display 2 intents if there are 2 remaining intents starting from the current index", () => {
        props.initialIndex = 4;
        renderComponent(props);

        // Intents 0-3 should not display, Intents 4-5 should display
        Object.keys(fakeIntents).forEach((key) => {
          if (key < 4) {
            expect(screen.queryByTestId(`${props.intents[key].question}`)).not.toBeInTheDocument();
          } else {
            expect(screen.getByTestId(`${props.intents[key].question}`)).toBeInTheDocument();
          }
        });
    });

    it ("should display 1 intent if there is 1 remaining intent starting from the current index", () => {
        props.initialIndex = 5;
        renderComponent(props);

        // Intents 0-4 should not display, Intent 5 should display
        Object.keys(fakeIntents).forEach((key) => {
          if (key < 5) {
            expect(screen.queryByTestId(`${props.intents[key].question}`)).not.toBeInTheDocument();
          } else {
            expect(screen.getByTestId(`${props.intents[key].question}`)).toBeInTheDocument();
          }
        });
    });

    it ("should increment index by 3 if the right arrow button is pressed and there are more than 3 remaining intents starting from the current index", () => {
        renderComponent(props);
        userEvent.click(screen.getByLabelText('Right Arrow'));

        // Intents 0-2 should not display, Intents 3-5 should display
        Object.keys(fakeIntents).forEach((key) => {
          if (key < 3) {
            expect(screen.queryByTestId(`${props.intents[key].question}`)).not.toBeInTheDocument();
          } else {
            expect(screen.getByTestId(`${props.intents[key].question}`)).toBeInTheDocument();
          }
        });
    });

    it ("should disable right arrow button if there are 3 remaining intents starting from the current index", () => {
        props.initialIndex = 3;
        renderComponent(props);
        expect(screen.getByLabelText('Right Arrow')).toBeDisabled();
    });

    it ("should disable right arrow button if there are 2 remaining intents starting from the current index", () => {
        props.initialIndex = 4;
        renderComponent(props);
        expect(screen.getByLabelText('Right Arrow')).toBeDisabled();
    });

    it ("should disable right arrow button if there is 1 remaining intent starting from the current index", () => {
        props.initialIndex = 5;
        renderComponent(props);
        expect(screen.getByLabelText('Right Arrow')).toBeDisabled();
    });

    it ("should decrement index by 3 if the left arrow button is pressed and there are more than 3 remaining intents before the current index", () => {
        props.initialIndex = 3;
        renderComponent(props);
        userEvent.click(screen.getByLabelText('Left Arrow'));

        // Intents 0-2 should display, Intents 3-5 should not display
        Object.keys(fakeIntents).forEach((key) => {
          if (key < 3) {
            expect(screen.getByTestId(`${props.intents[key].question}`)).toBeInTheDocument();
          } else {
            expect(screen.queryByTestId(`${props.intents[key].question}`)).not.toBeInTheDocument();
          }
        });
    });

    it ("should disable left arrow button if there are no intents before the current index", () => {
        props.initialIndex = 0;
        renderComponent(props);
        expect(screen.getByLabelText('Left Arrow')).toBeDisabled();
    });
});
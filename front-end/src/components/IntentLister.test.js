import {render, screen} from '@testing-library/react';
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
    }
  ]

describe("IntentLister", () => {
    let props = {};

    const renderComponent = (props) => {
        render(<IntentLister {...props} />)
    }

    beforeEach(() => {
        props.intents = fakeIntents;
        props.index = 0;
    });

    it ("should list 3 intents if index is 0", () => {
        renderComponent(props);
        Object.keys(fakeIntents).forEach((key) => {
            expect(screen.getByTestId(`${props.intents[key].question}`)).toBeInTheDocument();
        });
    });

    it ("should list 2 intents if index is 1", () => {
        props.index = 1;
        renderComponent(props);
        expect(screen.queryByTestId(`${props.intents[0].question}`)).not.toBeInTheDocument();
        expect(screen.getByTestId(`${props.intents[1].question}`)).toBeInTheDocument();
        expect(screen.getByTestId(`${props.intents[2].question}`)).toBeInTheDocument();
    });

    it ("should list 1 intent if index is 2", () => {
        props.index = 2;
        renderComponent(props);
        expect(screen.queryByTestId(`${props.intents[0].question}`)).not.toBeInTheDocument();
        expect(screen.queryByTestId(`${props.intents[1].question}`)).not.toBeInTheDocument();
        expect(screen.getByTestId(`${props.intents[2].question}`)).toBeInTheDocument();
    });
});
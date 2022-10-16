import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import IntentDiagram from './IntentDiagram.jsx';

const baseMap = new Map();

const baseProps = {
    question: "question",
    children: baseMap
};

describe("IntentDiagram", () => {

});
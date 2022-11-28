import '@testing-library/jest-dom';
import reducer, {toggleFlagFilter} from "./flagFilterSlice.js";

describe('flagFilterSlice', () => {
    const initialState = {
        flagFilterState: false
    };

    const trueState = {
        flagFilterState: true
    };

    it('should initialize the reducer to the right initial state', () => {
        const expected = reducer(undefined, {type: undefined});
        expect(expected.flagFilterState).toBe(false);
    });

    it('should switch flagFilterState to true', () => {
        const expected = reducer(initialState, toggleFlagFilter(false));
        expect(expected.flagFilterState).toBe(true);
    });

    it('should switch starFilterState to false', () => {
        const expected = reducer(trueState, toggleFlagFilter(true));
        expect(expected.flagFilterState).toBe(false);
    });
});
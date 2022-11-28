import '@testing-library/jest-dom';
import reducer, {toggleStarFilter} from "./starFilterSlice.js";

describe('starFilterSlice', () => {
    const initialState = {
        starFilterState: false
    };

    const trueState = {
        starFilterState: true
    };

    it('should initialize the reducer to the right initial state', () => {
        const expected = reducer(undefined, {type: undefined});
        expect(expected.starFilterState).toBe(false);
    });

    it('should switch starFilterState to true', () => {
        const expected = reducer(initialState, toggleStarFilter(false));
        expect(expected.starFilterState).toBe(true);
    });

    it('should switch starFilterState to false', () => {
        const expected = reducer(trueState, toggleStarFilter(true));
        expect(expected.starFilterState).toBe(false);
    });
});
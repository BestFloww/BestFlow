import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store.js';
import AnalysisPage from './AnalysisPage.jsx';

describe('AnalysisPage', () => {
    const renderComponent = () => render(
        <Provider store={store} >
            <AnalysisPage />
        </Provider>
    );

    it('should dispatch openMainPage when logo button is clicked', () => {
        renderComponent();
        const dispatch = jest.spyOn(store, 'dispatch');
        userEvent.click(screen.getByTestId('logo-button'));
        expect(dispatch).toHaveBeenCalledWith({ type: 'switchPage/openMainPage' });
    });

});
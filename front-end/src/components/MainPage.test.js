import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../store.js';
import MainPage from './MainPage.jsx';

describe('MainPage tests', () => {
    const renderComponent = () => render(
        <Provider store={store} >
            <MainPage/>
        </Provider>
    );

    it('should not display Upload Transcript Modal initially', () => {
        renderComponent();
        expect(screen.queryByTestId('upload-transcript-modal')).not.toBeInTheDocument();
    });
    
    it('should toggle Upload Transcript Modal when Upload Transcript button is pressed', async() => {
        renderComponent();
        userEvent.click(screen.getByText('Upload Transcript'));
        expect(screen.getByTestId('upload-transcript-modal')).toBeInTheDocument();
        userEvent.click(screen.getByText('Upload Transcript'));
        expect(screen.queryByTestId('upload-transcript-modal')).not.toBeInTheDocument();
    });

    it('should dispatch openAnalysisPage when Analyze Transcript button is clicked', () => {
        renderComponent();
        const spy = jest.spyOn(store, 'dispatch');
        userEvent.click(screen.getByText('Analyze Transcript'));
        expect(spy).toHaveBeenCalledWith({ type: 'switchPage/openAnalysisPage' });
    });

});

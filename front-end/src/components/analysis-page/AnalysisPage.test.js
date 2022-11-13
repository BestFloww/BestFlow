import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store.js';
import { AnalysisPage } from './AnalysisPage.jsx';

describe('AnalysisPage', () => {
    let props;

    beforeEach(() => {
        props = {
            projectId: "1",
            analyzedTranscripts: {"1":[{question: "a", children: {"b": 100,}}]}
            }
        });

    const renderComponent = (props) => render(
        <Provider store={store} >
            <AnalysisPage {...props} />
        </Provider>
    );

    it('should dispatch openMainPage when Return to Main Page button is clicked', () => {
        renderComponent(props);
        const dispatch = jest.spyOn(store, 'dispatch');
        userEvent.click(screen.getByText('Return to Main Page'));
        expect(dispatch).toHaveBeenCalledWith({ type: 'switchPage/openMainPage' });
    });

});
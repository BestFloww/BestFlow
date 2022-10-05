import React from 'react';
import BaseButton from './BaseButton.jsx';
import RequestBEAPI from "../services/RequestBEAPI"

const RequestButton = () => {
    return (
        <BaseButton click={async() => {
            const response = await RequestBEAPI.get();
            console.log(response.data);
            console.log(response.data.things)
        }} text='Backend Request'/>
    )
};

export default RequestButton;
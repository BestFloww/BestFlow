import React from 'react';
import BaseButton from './BaseButton.jsx';
import testAPI from "../services/testAPI"

const RequestButton = () => {
    return (
        <BaseButton click={async() => {
            const response = await testAPI.get();
            console.log(response.data);
            console.log(response.data.things)
        }} text='Backend Request'/>
    )
};

export default RequestButton;
import React, {useState} from 'react';
import BaseButton from './BaseButton.jsx';
import testAPI from "../services/testAPI"

const RequestButton = () => {
    const [name, setName] = useState("Put a string here")
    return (
        <div>
            <input onChange={(e) => setName(e.target.value)} />
        <BaseButton click={() => {
            testAPI.post({text: name});
            console.log(name);
        }}
        text='Post Backend Request'
        />
        </div>
        
    )
};

export default RequestButton;
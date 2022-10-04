import React from 'react';
import BaseButton from './BaseButton.jsx';
import VoiceFlowAPI from "../services/VoiceFlowAPI.js"

const VoiceFlowButton = () => {
  return (
    <BaseButton click={async() => {
        const response = await VoiceFlowAPI.get();
        console.log(response.data.message);
    }}text='Call the VoiceFlow API'/>
  )
};

export default VoiceFlowButton;
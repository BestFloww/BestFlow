import React from 'react';
import BaseButton from './BaseButton.jsx';
import VoiceFlowAPI from "../services/VoiceFlowAPI.js"

const VoiceFlowButton = () => {
  const callAPI = async() => {
        const response = await VoiceFlowAPI.get();
        console.log(response.data);
        console.log(response.data.variables.last_utterance);
        console.log(response.data.variables.intent_confidence);
  };
  return (
    <BaseButton 
    click={callAPI}
    text='Call the VoiceFlow API'
    />
  )
};

export default VoiceFlowButton;
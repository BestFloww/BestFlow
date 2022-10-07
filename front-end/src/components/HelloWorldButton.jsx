import React from 'react';
import BaseButton from './BaseButton.jsx';
import HelloWorldAPI from "../services/HelloWorldAPI.js"

const HelloWorldButton = () => {
  const functionName = () => {

  }
  return (
    <BaseButton 
      click={functionName}
      text='Backend Hello World'
    />
  )
};

export default HelloWorldButton;
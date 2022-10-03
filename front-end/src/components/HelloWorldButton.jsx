import React from 'react';
import BaseButton from './BaseButton.jsx';
import HelloWorldAPI from "../services/HelloWorldAPI.js"

const HelloWorldButton = () => {
  return (
    <BaseButton click={async() => {
        const response = await HelloWorldAPI.get();
        console.log(response.data.message);
    }} text='Backend Hello World'/>
  )
};

export default HelloWorldButton;
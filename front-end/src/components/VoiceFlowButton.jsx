import BaseButton from './BaseButton.jsx';
import VoiceFlowAPI from "../services/VoiceFlowAPI.js"
import React, { Component } from 'react'

class VoiceFlowButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUtterance: "Call Voiceflow",
      resultObject: null,
    };
    this.callVoiceFlow = this.callVoiceFlow.bind(this);
    this.renderVariables = this.renderVariables.bind(this);
  }

  async callVoiceFlow() {
    const result = await VoiceFlowAPI.get();
    console.log(result);
    this.setState({
      lastUtterance: result.data.variables.last_utterance,
      resultObject: result.data.variables,
    })
  }

  renderVariables() {
    const resultObject = this.state.resultObject
    if (resultObject !== null){
      return Object.keys(resultObject).map((key) => 
      <h3 key={key}>
        {key}: {resultObject[key]}
      </h3>)
    }  
  }

  render() {
    return (
      <div>
        <BaseButton
          text={this.state.lastUtterance}
          click={this.callVoiceFlow}
        />
        <ul>
          {this.renderVariables()}
        </ul>
      </div>
    )
  }
}


export default VoiceFlowButton;
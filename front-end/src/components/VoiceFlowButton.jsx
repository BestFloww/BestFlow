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
  }

  async callVoiceFlow() {
    const result = await VoiceFlowAPI.get();
    console.log(result);
    this.setState({
      lastUtterance: result.data.variables.last_utterance,
      resultObject: result.data.variables,
    })
  }


  render() {
    return (
      <div>
        <BaseButton
          text={this.state.lastUtterance}
          click={this.callVoiceFlow}
        />
        {this.state.resultObject && Object.keys(this.state.resultObject).forEach((key) => {
          return (
            <h3>
              {key} {this.state.resultObject[key]}
            </h3>
          )
        }
      )}
      </div>
    )
  }
}


export default VoiceFlowButton;
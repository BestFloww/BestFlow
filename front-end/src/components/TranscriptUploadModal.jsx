import React, { Component } from 'react';

class TranscriptUploadModal extends Component {
  render() {
    if (!this.props.show) {
      return null;
    }
    return <div>Transcript Upload Modal placeholder</div>;
  }
}

export default TranscriptUploadModal;
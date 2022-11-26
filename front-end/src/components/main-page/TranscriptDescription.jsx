import React, { Component } from 'react';
import {exampleTranscript} from "../helpers/ExampleTranscript.js"; 

class TranscriptDescription extends Component {
	render() {
		return (
            <div>
                <ul className='text-center font-bold text-lg'> 
                    Required Data Format:
                </ul>
                <pre className='overflow-x-scroll scrollbar-thin leading-7 text-sm bg-off-white shadow-inner-lg rounded p-2 my-4 mx-2'
                     data-testid="sampleTranscript"
                >
                    {JSON.stringify(exampleTranscript, null, 2)}
                </pre>
                <ul className='text-center text-base leading-12 my-8'> 
                    Your file can contain up to 180 questions.
                <br/>
                <br/>
                    Questions must be chronologically ordered.
                </ul>
            </div>
            
        );
    }
} 
export default TranscriptDescription;
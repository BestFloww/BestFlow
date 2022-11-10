import React, { Component } from 'react';
import {exampleTranscript} from "../helpers/ExampleTranscript.js"; 

class TranscriptDescription extends Component {
	render() {
		return (
            <div className='leading-12'>
                <ul className='text-center font-bold text-lg'> 
                    Required Data Format:
                </ul>
                <pre className='overflow-x-scroll leading-7 text-sm bg-green-100 shadow-inner-lg rounded p-2 my-4 mx-2'
                     data-testid="sampleTranscript"
                >
                    {JSON.stringify(exampleTranscript, null, 2)}
                </pre>
                <ul className='text-center text-base leading-12 my-8'> 
                    Your file can contain up to 180 questions.
                <br/>
                <br/>
                    Questions must be chonologically ordered.
                </ul>
            </div>
            
        );
    }
} 
export default TranscriptDescription;
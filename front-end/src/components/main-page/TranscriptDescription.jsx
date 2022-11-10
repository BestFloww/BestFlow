import React, { Component } from 'react';
import {exampleTranscript} from "../helpers/ExampleTranscript.js"; 

class TranscriptDescription extends Component {
	render() {
		return (
            <div>
                <p className='text-center font-bold'> 
                    Required Data Format:
                </p>
                <pre className='overflow-x-scroll leading-8 text-sm bg-green-100 shadow-inner-lg rounded p-2 my-4 mx-2'
                     data-testid="sampleTranscript"
                >
                    {JSON.stringify(exampleTranscript, null, 2)}
                </pre>
                <p className='text-center text-base'> 
                    * Your file can contain up to 180 questions.
                </p>
                <p className='text-center text-base'> 
                    * Questions must be chonologically ordered.
                </p>
            </div>
            
        );
    }
} 
export default TranscriptDescription;
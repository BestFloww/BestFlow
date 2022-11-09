/* istanbul ignore file */
import React, { Component } from 'react';
import {exampleTranscript} from "../helpers/ExampleTranscript.js"; 

class TranscriptDescription extends Component {
	render() {
		return (
            <div className='whitespace-nowrap'>
                <p className='text-center font-bold'> 
                    Required Data Format:
                </p>
                <pre className='overflow-auto leading-8 text-sm'>
                    {JSON.stringify(exampleTranscript, null, 2)}
                </pre>
                <br/> 
                <p> 
                    * Your file can contain up to 180 questions.
                    <br/> 
                    * Questions must be chonologically ordered.
                </p>
            </div>
            
        );
    }
} 
export default TranscriptDescription;
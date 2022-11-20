# BestFlow
We are going to fix bad chatbots!

Diagnostic tool for chatbot transcripts that help retailers identify poor or strong questions and intents through an easily digestible and intuitive display.

We aim to:
- Reduce time spent on chatbot optimization
- Reduce bad chatbot intents
- Display an average of 70% of diagnostic problems in any transcripts’ flow
- Optimize the flow of at least three intents in x transcripts

Each transcript will be displayed with a question and the responses it leads to.
Each response also has a percentage displayed to show the chances of leading to a specific branch.
Our helpful star tool will also let users tag which questions they think are important to add to a chatbot.
They can also use the flag tool to tag questions that are not helpful and need to be rewritten or deleted.

Want to test out our tool but don't have any chatbot transcripts?  
We have a series of example transcripts for different types of stores that can be found in the examples folder.
You can download any of the examples and follow the installation and instructions to run.

Created by Kaylee Chan, Emily Wan, Sam Weiss, Helia Sajjadian, and William Yao,
along with the help of the University of Toronto's Technology Leadership Initiative professors and teaching assistants!

## General Information:
React, Axios, Node, Tailwind, MongoDB, Express, and more :D
Licensed under the Apache-2.0 license.

## Installation/How to Run:

You can access our frontend by going to our hosted site: https://bestflow.netlify.app/

Download and unzip our code in any folder of your choice, then open the unzipped folder in any JavaScript editor of your choice.
In the project directory, you must open two terminals.

### Backend Terminal

Add a `.env` file in the `back-end` folder, with: 

    DATABASE_URI=[Private key, please contact one of us if you want to test this on your local build, otherwise use our hosted version]
    TESTDATA_NS=Transcripts
    API_KEY=[Private key that we do not currently use. Same as DATABASE_URI, message us if you want to use one]
    PORT=5000

In this terminal, run `cd back-end` to navigate to our backend folder, `npm install` to stay up-to-date,
and then run `nodemon server` where our backend will start listening on port 5000.

### Frontend Terminal

Add a `.env` file in the `front-end` folder, with:

    REACT_APP_BASE_URL=http://localhost:5000

In this terminal, run `cd front-end` to navigate to our frontend folder, `npm install` to stay up-to-date,  
and then run `npm start` where our react app will run in http://localhost:3000/ in your browser.

### Browser

On your browser, you will be directed to the main page. Please upload a transcript which will be stored in our database.
If a project id already exists in our database, it is possible to override the existing transcript with the new one.
We also have a template transcript available to be downloaded which shows the minimum required fields for each transcript.

Once a transcript is uploaded, you can click on View Analysis which will take you to the analysis page.
This page can also be reached by inputting a valid project id already in our database.
On the page, all the intents will be displayed along with previously starred and flagged intents.

To load a new transcript, go back to the main page and upload another transcript.

## Testing/How to Check Test Coverage:

Open your command prompt and navigate to the folder you downloaded our repository in.
Navigate to our backend folder by running `cd back-end` and then run the tests using `npm run test`.
Then navigate to our frontend folder by running `cd..`, then `cd front-end`. You can run the tests using the same command `npm run test`.

## Attribution:

### Icons:
See icon_bibliography.md in front-end/src/components/icons for more details

#### "magnifying-glass"
Link: https://www.svgrepo.com/svg/127033/magnifying-glass
#### "arrow-left"
Link: https://www.iconfinder.com/icons/211646/left_chevron_icon
#### "arrow-right"
Link: https://www.iconfinder.com/icons/211647/right_chevron_icon
#### "skip-left"
Link: https://www.iconfinder.com/icons/211820/skipbackward_icon
#### "skip-right"
Link: https://www.iconfinder.com/icons/211822/skipforward_icon
#### "upload-note"
Link: https://uxwing.com/upload-note-icon/
#### "download-note"
Link: https://uxwing.com/file-download-import-icon/
#### "analyze-note"
Link: https://uxwing.com/file-search-icon/

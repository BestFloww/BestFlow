// This file defines several helper functions used to implement the intent search feature on AnalysisPage.

export default class IntentSearch{
    filterIntents = (intents, searchString) => {
        /**
         * Return (1) an array of intents filtered by the searchString, and (2) a mapping of each filtered intent to the indices describing where the searchString appears in the intent's content.
         * */
        let filteredIntents = [];
        let searchSlices = {};
        intents.forEach((intent) => this.addFilteredIntent(intent, searchString, filteredIntents, searchSlices));
        return { filteredIntents, searchSlices };
    }
    
    addFilteredIntent = (intent, searchString, filteredIntents, searchSlices) => {
        // First, find the starting index of searchString
        const indexOfSearch = this.approximateIndexOf(intent.question, searchString);

        // Then, if it is not -1, then it is a (likely) search for the intent
        if (indexOfSearch !== -1) {
            filteredIntents.push(intent);  // Add the intent to filteredIntents
            // Map the intent to the starting and ending index of where the searchString appears in the intent question for reference
            searchSlices[intent.question] = {
                start: indexOfSearch,  // indexOfSearch corresponds to the starting index
                end: indexOfSearch + searchString.length,  // Then, the ending index is searchString.length characters after
            };
        }
    }
    
    approximateIndexOf = (targetString, searchString) => {
        /**
         * Return the index of the substring searchString in targetString, ignoring case.
         * If searchString is not a substring of targetString under these conditions, returns -1.
         * */
        const approximateSearchString = searchString.toLowerCase()
        const approximateTargetString = targetString.toLowerCase()
        return approximateTargetString.indexOf(approximateSearchString);
    }
}
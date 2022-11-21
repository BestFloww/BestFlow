// This file defines several helper functions used to implement the intent search feature on AnalysisPage.

export default class IntentSearch{
    filterIntents = (intents, searchString) => {
        /**
         * @param {Array} intents array of intents to search through
         * @param {String} searchString string to search by
         * @return {Object} an array of intents filtered by searchString and a mapping of each intent to indices describing where the searchString appears in its question
         * */
        let filteredIntents = [];
        let searchSlices = {};
        intents.forEach((intent) => this.addFilteredIntent(intent, searchString, filteredIntents, searchSlices));
        return { filteredIntents, searchSlices };
    }
    
    addFilteredIntent = (intent, searchString, filteredIntents, searchSlices) => {
        const indexOfSearch = this.approximateIndexOf(intent.question, searchString);

        // If index of searchString is not -1, then it is a (likely) search for the intent
        if (indexOfSearch !== -1) {
            filteredIntents.push(intent);
            // Map the intent to the starting and ending index of where the searchString appears in the intent question
            searchSlices[intent.question] = {
                start: indexOfSearch,
                end: indexOfSearch + searchString.length,
            };
        }
    }
    
    approximateIndexOf = (targetString, searchString) => {
        const approximateSearchString = searchString.toLowerCase()  // Ignore case
        const approximateTargetString = targetString.toLowerCase()
        return approximateTargetString.indexOf(approximateSearchString);
    }
}
// This file defines several helper functions used to implement the intent search feature on AnalysisPage.

export default class IntentSearch{
    /**
     * @param {Array} intents array of intents to search through
     * @param {String} searchString string to search by
     * @param {Boolean} [starFilter=false] if needed to filter by star
     * @param {Boolean} [flagFilter=false] if needed to filter by flag
     * @return {Object} an array of intents filtered by searchString, starFilter, and flagFilter and a mapping of each intent to indices describing where the searchString appears in its question
     * */
    filterIntents = (intents, searchString,starFilter=false, flagFilter=false) => {
        let filteredIntents = [];
        let searchSlices = {};
        intents.forEach((intent) => this.addFilteredIntent(intent, searchString, filteredIntents, searchSlices));
        if (starFilter || flagFilter) {
            this.starAndFlagFilter(filteredIntents, starFilter, flagFilter);
        }
        return { filteredIntents, searchSlices };
    }

    starAndFlagFilter = (intents, star, flag) => {
        const filteredIntents = [];

        for (let intent of intents) {
            if (star) {
                if (intent.star) {
                    filteredIntents.push(intent);
                    continue;
                }
            }
            if (flag) {
                if (intent.flag) {
                    filteredIntents.push(intent);
                }
            }
        }
        return filteredIntents;
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
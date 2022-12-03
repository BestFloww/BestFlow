import axios from "axios";

const baseURL = `${process.env.REACT_APP_BASE_URL}/api/star`;

const API = {
    /**
     * @param {Object} intent changed intent's question being put
     * @returns {Object} http resolution
     */
    put: async(intent) => {
        let payload = {...intent}
        if (intent.previousIntents && intent.previousIntents.length > 0) {
            payload.question = intent.previousIntents[1].question;
        }
        return await axios.put(baseURL, payload);
    },
};

export default API;
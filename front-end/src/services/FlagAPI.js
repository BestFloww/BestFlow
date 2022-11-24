import axios from "axios";

const baseURL = `${process.env.REACT_APP_BASE_URL}/api/flag`;

const API = {
    /**
     * @param {Object} intent changed intent's question being put
     * @returns {Object} http resolution
     */
    put: async(question) => {
        return await axios.put(baseURL, {body: question});
    },
};

export default API;
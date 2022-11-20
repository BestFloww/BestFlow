import axios from "axios";

const baseURL = `${process.env.REACT_APP_BASE_URL}/api/flag`;

const API = {
    /**
     * @param {Object} intent changed intent object being put
     * @returns {Object} http resolution
     */
    put: async(intent) => {
        return await axios.put(baseURL, {body: intent});
    },
};

export default API;
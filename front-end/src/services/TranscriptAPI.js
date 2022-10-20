import axios from "axios";

const baseURL = "http://localhost:5000/api/Transcript";

const API = {
    /**
     * @param {Object} params filter for the get 
     * @returns {Object} analyszed transcript
     */
    getAnalysis: async(params = {}) => {
        return await axios.get(baseURL, params);
    },

    /**
     * @param {Object} Transcript 
     * @returns {Object} Resolution
     */
    post: async(Transcript) => {
        return await axios.post(baseURL, Transcript);
    },
};

export default API;
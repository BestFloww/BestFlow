import axios from "axios";

const baseURL = `${process.env.REACT_APP_BASE_URL}/api/transcript`;

const API = {
    /**
     * @param {Object} params filter for the get 
     * @returns {Array} analyzed transcript
     */
    getAnalysis: async(params = {}) => {
        const result = await axios.get(baseURL, {params: params});
        return result;
    },

    /**
     * @param {String} Transcript 
     * @returns {Object} Resolution
     */
    post: async(transcript) => {
        const payload = JSON.stringify(transcript);
        return await axios.post(baseURL, {payload});
    },
};

export default API;
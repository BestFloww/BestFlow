import axios from "axios";

const baseURL = `${process.env.REACT_APP_BASE_URL}/transcript`;

const API = {
    /**
     * @param {Object} params filter for the get 
     * @returns {Object} analyszed transcript
     */
    getAnalysis: async(params = {}) => {
        return await axios.get(baseURL, params);
    },

    /**
     * @param {String} Transcript 
     * @returns {Object} Resolution
     */
    post: async(transcript) => {
        console.log(process.env.REACT_APP_BASE_URL)
        console.log(baseURL)
        const payload = JSON.stringify(transcript);
        return await axios.post(baseURL, {payload});
    },
};

export default API;
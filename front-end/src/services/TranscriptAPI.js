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
     * @param {String} Transcript 
     * @returns {Object} Resolution
     */
    post: async(transcript) => {
        console.log(transcript.result)
        return await axios.post(baseURL, {transcript: transcript});
    },
};

export default API;
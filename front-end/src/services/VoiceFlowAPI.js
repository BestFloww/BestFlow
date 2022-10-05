import axios from "axios";

const baseURL = "http://localhost:5000/api/VoiceFlow";

const API = {
    get: async() => {
        return await axios.get(baseURL);
    },
};

export default API;
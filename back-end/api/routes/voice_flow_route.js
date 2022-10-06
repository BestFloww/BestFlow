import express from "express";
import axios from "axios"; 
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const apiKey = process.env.API_KEY;
const userID = 'user_123';

async function getTranscript(req, res) {
  const response = await axios({
    method: 'get',
    baseURL: 'https://general-runtime.voiceflow.com',
    url: `/state/user/${userID}`,
    headers: {
      Authorization: apiKey,
    },
    data: {},
  });
  res.json(response.data);
}

router.route("/").get(getTranscript);

export default router;
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

//const api_key = "VF.DM.6331204c9575ca00085c3fee.3xaArTcugE4obpnp"
//const version = "632b79c564484143a984b02e"
//async function getTranscript(req, res) {
//  const response = await axios({
//    method: 'get',
//    baseURL: 'https://api-dm-test.voiceflow.fr',
//    url: `/exportraw/${api_key}?versionID=${version}`,
//    headers: {
//      Authorization: api_key,
//    },
//    data: {},
//  });
//  res.json(response.data);
//}

router.route("/").get(getTranscript);

export default router;
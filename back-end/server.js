import express from "express";
import cors from "cors";
import testAPI from "./api/routes/test_route.js"
import voice_flowAPI from "./api/routes/voice_flow_route.js"
import transcriptAPI from "./api/routes/transcript_route.js"


const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/test", testAPI);
app.use("/api/VoiceFlow", voice_flowAPI);
app.use("/api/getTranscript", transcriptAPI);
app.use("/api/HelloWorld", (req, res) => res.status(200).json({message: "Hello World!"}));
app.use("*", (req, res) => res.status(404).json({error: "Page not found"}));

export default app;

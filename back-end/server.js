import express from "express";
import cors from "cors";
import transcriptAPI from "./api/routes/transcript_route.js"


const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/transcript", transcriptAPI);
app.use("*", (req, res) => res.status(404).json({error: "Page not found"}));

export default app;

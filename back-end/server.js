import express from "express";
import cors from "cors";
import starAPI from "./api/routes/star_route.js"


const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/transcript", transcriptAPI);

app.use("/api/star", starAPI);

app.use("*", (req, res) => res.status(404).json({error: "Page not found"}));

export default app;

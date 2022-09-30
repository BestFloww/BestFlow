import express from "express";
import cors from "cors";
import testAPI from "./api/routes/test_route.js"


const app = express();

app.use(cors);

app.use(express.json());

app.use("/api/test", testAPI);
app.use("*", (req, res) => res.status(404).json({error: "Page not found"}));

export default app;

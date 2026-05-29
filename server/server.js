import express from "express";
import cors from "cors";
import documentRoutes from "./routes/documentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/documents", documentRoutes);

app.get("/", (req, res) => {
    res.send("API running...");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
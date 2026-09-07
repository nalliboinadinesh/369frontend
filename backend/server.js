import express from "express";
import cors from "cors";
import "dotenv/config";
import connectionDB from "./config/mongodb.js";
import userRoute from "./routes/userRoutes.js";
import noteRoute from "./routes/noteRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectionDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoute);
app.use("/api/notes", noteRoute);

app.get("/", (_req, res) => {
  res.json({ success: true, message: "API is running" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

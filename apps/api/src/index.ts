import express from "express";
import dotenv from "dotenv";
import { bookmarkRoutes } from "./routes/bookmarks";
import { categoryRoutes } from "./routes/categories";
import { auth } from "./middleware/auth";
import { errorHandler } from "./middleware/error";

dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

// Middleware
app.use(express.json());

// Health check endpoint
app.get("/api/health", (_req, res) => {
	res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api/bookmarks", auth, bookmarkRoutes);
app.use("/api/categories", auth, categoryRoutes);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

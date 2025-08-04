import express from "express"
import cors from "cors"
import authRoutes from "../routes/auth.js"
import postsRoutes from "../routes/posts.js"
import usersRoutes from "../routes/users.js"

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    method: ["GET", "POST", "DELETE", "PATCH", "PUT"]
}));

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

// // Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

export { app }
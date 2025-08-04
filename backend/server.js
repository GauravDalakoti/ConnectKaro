import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./src/routes/auth.js"
import postsRoutes from "./src/routes/posts.js"
import usersRoutes from "./src/routes/users.js"

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
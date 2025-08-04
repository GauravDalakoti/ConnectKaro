connectkaro Community Platform
A full-stack social media platform built with React, Node.js, Express.js, and MongoDB.

🚀 Live Demo
[https://connectkaro.vercel.app]

📋 Features
Core Features

✅ User Authentication (Register/Login)
✅ User Profiles with bio, name, email
✅ Create and view text posts
✅ Public post feed with timestamps
✅ Individual profile pages
✅ Responsive design

Bonus Features

🎨 Modern UI with Tailwind CSS
📱 Mobile-responsive design
🔐 JWT-based authentication
💬 Post engagement (likes)

🛠️ Tech Stack
Frontend:

React 18
JavaScript (ES6+)
Tailwind CSS
Axios for API calls
React Router for navigation

Backend:

Node.js
Express.js
MongoDB with Mongoose
JWT for authentication
bcrypt for password hashing
CORS for cross-origin requests

📁 Project Structure

connectkaro/
├── frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── backend/                 # Express backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
    ├── db/
│   └── index.js
└── README.md

🚀 Quick Start

Prerequisites

Node.js (v14+)
MongoDB (local or MongoDB Atlas)
Git

Installation

Clone the repository

git clone https://github.com/GauravDalakoti/ConnectKaro.git
cd ConnectKaro

Backend Setup

bash cd backend
npm install

Create Environment Variables
Create .env file in backend directory:

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mini-linkedin
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development

Frontend Setup

cd ../frontend
npm install

Start Development Servers

Backend (Terminal 1):
cd backend
npm run dev
Frontend (Terminal 2):
cd frontend
npm run dev

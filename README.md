# ReWear-Community-Clothing-Exchange

## Overview
ReWear is a web-based platform that enables users to exchange unused clothing through direct swaps or a point-based redemption system. The goal is to promote sustainable fashion and reduce textile waste by encouraging users to reuse wearable garments instead of discarding them.

## Features
- User authentication (signup/login)
- Landing page with Indian clothing categories
- User dashboard
- List and browse clothing items
- Admin panel for moderation
- Fully responsive, Indian-market-friendly UI

## Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)
- MongoDB (local or MongoDB Atlas)

## Getting Started

### 1. Clone the repository
```bash
# Using HTTPS
git clone https://github.com/yourusername/ReWear-Community-Clothing-Exchange.git
cd ReWear-Community-Clothing-Exchange
```

### 2. Install dependencies
#### Backend (server)
```bash
cd server
npm install
```
#### Frontend (client)
```bash
cd ../client
npm install
```

### 3. Set up environment variables
Create a `.env` file in the `server` directory:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/rewear
DB_PASSWORD=your_password_here
```
If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

### 4. Start the servers
#### Backend
```bash
cd server
npm run dev
```
#### Frontend
```bash
cd client
npm run dev
```

### 5. Open the app
Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure
```
ReWear-Community-Clothing-Exchange/
├── client/   # React frontend (Vite)
├── server/   # Node.js/Express backend
└── README.md
```

## Team
Team Name: Florist  
Team Email: samarmittal59@gmail.com

---
**Enjoy swapping and saving the planet with ReWear!**

# Quick Setup Guide

## Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Git

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Configure Backend Environment
Create `server/.env` file:
```env
MONGO_URI=mongodb://localhost:27017/mern-blog
PORT=5000
JWT_SECRET=your-secret-key-here
```

### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```

### 4. Configure Frontend Environment
Create `client/.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Start MongoDB
Make sure MongoDB is running on your system.

### 6. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 7. Open Browser
Navigate to: `http://localhost:3000`

## GitHub Submission

1. Initialize git repository:
```bash
git init
```

2. Add all files:
```bash
git add .
```

3. Commit:
```bash
git commit -m "Week 4 Assignment: MERN Stack Blog Application"
```

4. Add remote and push:
```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```


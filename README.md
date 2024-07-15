# Full Stack Make My Trip Clone

Live: https://make-my-trip-client.vercel.app

## Overview

This project is a full-stack clone of the Make My Trip website. It is built using React for the frontend and Express.js for the backend. MongoDB is used as the database to store user and travel-related data. The application features functionalities such as searching for hotels, flights, and displaying detailed information about Indian airports.

Deployed on Vercel.

Backend: https://github.com/AbhishekCdr/make_my_trip_api
Frontend: https://github.com/AbhishekCdr/make_my_trip_client

## Project Structure

```
make_my_trip_clone/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── ...
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── ...
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   ├── package.json
│   └── ...
├── .gitignore
├── README.md
└── ...
```

## Setup Instructions

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB (locally or a cloud instance)

### Frontend (Client)

1. **Navigate to the client directory**:

   ```sh
   cd client
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Run the development server**:

   ```sh
   npm run dev
   ```

4. **Build the project for production**:

   ```sh
   npm run build
   ```

5. **Preview the production build**:
   ```sh
   npm run preview
   ```

### Backend (Server)

1. **Navigate to the server directory**:

   ```sh
   cd server
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the server directory with the following contents:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   ```

4. **Run the development server**:
   ```sh
   npm run dev
   ```

### Running the Full Stack Application

To run both the client and server concurrently, you can use tools like `concurrently` or set up separate terminals for each.

1. **Run both client and server**:
   ```sh
   concurrently "npm run dev --prefix client" "npm run dev --prefix server"
   ```

## Usage Guidelines

1. **Navigating the application**: Use the navbar to explore different sections such as hotels, flights, and user account.
2. **Searching for hotels and flights**: Use the search bar on the homepage to look for available options.
3. **Viewing detailed information**: Click on any listed item to view detailed information about it.

## Dependencies

### Frontend

```json
{
  "name": "make_my_trip_client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.11.4",
    "@emotion/styled": "^11.11.5",
    "@mui/material": "^5.16.0",
    "@reduxjs/toolkit": "^2.2.6",
    "firebase": "^10.12.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.2.1",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.24.1",
    "react-slick": "^0.30.2",
    "redux-persist": "^6.0.0",
    "slick-carousel": "^1.8.1",
    "swiper": "^11.1.4"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.2",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "postcss": "^8.4.38",
    "prettier": "^3.3.2",
    "prettier-plugin-tailwindcss": "^0.6.5",
    "tailwindcss": "^3.4.4",
    "vite": "^5.3.1"
  }
}
```

### Backend

```json
{
  "name": "make_my_trip_api",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.4.4",
    "nodemon": "^3.1.4"
  }
}
```

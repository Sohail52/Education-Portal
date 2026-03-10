# Education Portal / EduHub LMS

A full-stack Learning Management System (LMS) designed for tracking educational performance, course management, and enrollment requests.

## Tech Stack

### Frontend (User Interface)
- **Framework**: React 18, Vite
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Routing**: React Router DOM
- **HTTP Client**: Axios

### Backend (API Server)
- **Environment**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT), bcryptjs
- **Middleware**: CORS, dotenv

## Project Structure

The repository is organized into two main directories:

- `/frontend` - The React application, managed by Vite.
- `/backend` - The Node.js API server.

## Features

- **Authentication**: JWT-based secure login and registration.
- **Premium UI**: Uses Tailwind CSS with custom styling and a visually engaging aesthetic.
- **Role-based Access**: Separates functionalities for different types of users (e.g., Students, Educators).
- **Course & Material Management**: APIs and interfaces for managing educational content.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)

### Setup the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on your environment (e.g., adding `MONGO_URI` and `JWT_SECRET`).
4. Start the server:
   ```bash
   npm run dev
   ```

### Setup the Frontend

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Scripts

### Frontend (`/frontend`)
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Locally preview the production build.

### Backend (`/backend`)
- `npm run dev`: Starts the server with Nodemon for hot-reloading.
- `npm start`: Starts the standard Node server.

## License

ISC License

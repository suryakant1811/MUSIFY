# MUSIFY

MUSIFY is a full-stack music platform built with a React frontend, an Express backend, MongoDB, and cloud-based media services. It supports music discovery, album and song browsing, authentication, admin management, chat, and a modern audio experience.

Live demo: https://musify-eight-black.vercel.app/

## Features

- Modern music experience with album and song browsing
- User authentication and protected routes
- Admin dashboard for managing content
- Real-time chat and social interactions
- Cloud storage for audio and cover images
- Responsive UI for desktop and mobile
- Dockerized deployment with Kubernetes and Jenkins automation

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS / DaisyUI
- Zustand for state management
- Clerk authentication
- Socket.IO client

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO
- Cloudinary for media uploads
- Clerk for authentication middleware
- dotenv and CORS support

### DevOps & Cloud
- Docker
- Docker Compose
- Jenkins CI/CD pipeline
- Kubernetes manifests
- Terraform infrastructure as code
- Vercel deployment for the frontend
- AWS/EKS-oriented deployment setup in the repository

## Project Structure

- app/frontend - React + Vite frontend
- app/backend - Express + MongoDB backend
- docker - Docker and Docker Compose files
- kubernetes - Kubernetes deployment manifests
- pipeline - Jenkins pipeline configuration
- Terraform - Infrastructure as code for cloud deployment

## Prerequisites

Make sure you have the following installed:

- Node.js 18 or above
- npm or yarn
- Docker and Docker Compose
- kubectl (for Kubernetes deployment)
- MongoDB instance or MongoDB Atlas connection string

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/suryakant1811/MUSIFY.git
cd MUSIFY
```

### 2. Backend setup

```bash
cd app/backend
npm install
```

Create a `.env` file in the backend folder with variables such as:

```env
PORT=7000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
FRONTEND_URL=http://localhost:3000
```

Run the backend:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

Run the frontend:

```bash
npm run dev
```

The frontend will typically run on `http://localhost:5173` and the backend on `http://localhost:7000`.

## Running with Docker

From the repository root, you can use the Docker Compose setup under the docker folder:

```bash
docker compose -f docker/docker-compose.yml up --build
```

This will start the backend and frontend containers for local testing.

## CI/CD and Deployment

This repository includes:

- Jenkins pipeline configuration in [pipeline/Jenkinsfile](pipeline/Jenkinsfile)
- Kubernetes manifests in [kubernetes](kubernetes)
- Terraform configuration in [Terraform](Terraform)

The application is currently deployed at:

- Frontend: https://musify-eight-black.vercel.app/

## Environment Notes

The project uses external services for:

- Authentication: Clerk
- Media storage: Cloudinary
- Database: MongoDB
- Deployment: Vercel + Kubernetes-compatible infrastructure

## License

This project is currently licensed under the ISC license for the backend package and is intended for educational and development use.

## Contact

For questions or collaboration, contact the repository owner or maintainers.

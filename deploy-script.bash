#!/bin/bash

# Install http-server globally
npm install -g http-server

# Navigate to the frontend directory
cd frontend

# Install frontend dependencies
npm install

# Start http-server for the frontend
echo "Starting http-server for frontend..."
http-server &

# Save the PID of http-server for later termination
FRONTEND_SERVER_PID=$!

# Navigate back to the root directory
cd ..

# Navigate to the backend directory
cd backend

# Install backend dependencies
npm install

# Start the backend server
echo "Starting backend server..."
npm start &

# Save the PID of the backend server for later termination
BACKEND_SERVER_PID=$!

# Trap termination signals to stop the servers
trap "kill $FRONTEND_SERVER_PID; kill $BACKEND_SERVER_PID; exit 1" INT TERM EXIT

# Wait for script termination
wait

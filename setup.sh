#!/bin/bash

echo "Setting up Flavar Golden Theme..."
echo "--------------------------------"

# Check for Node.js installation
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js and try again."
    exit 1
fi

# Clean and install dependencies for frontend
echo "Installing frontend dependencies..."
cd frontend
echo "Cleaning cache..."
rm -rf .next node_modules
npm install

# Clean and install dependencies for backend
echo "Installing backend dependencies..."
cd ../backend
rm -rf node_modules
npm install

echo "--------------------------------"
echo "Setup complete! 🎉"
echo ""
echo "To start the backend server:"
echo "cd backend && node simple-api.js"
echo ""
echo "To start the frontend server (in a new terminal):"
echo "cd frontend && npm run dev"
echo ""
echo "Then visit: http://localhost:3007/menu/3"
echo "--------------------------------" 
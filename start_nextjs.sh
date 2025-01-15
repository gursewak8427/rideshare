#!/bin/bash

# Pull the latest code
echo "Pulling the latest code from Git repository..."
git pull

# Install dependencies
echo "Installing dependencies..."
yarn 

# Build the project
echo "Building the project..."
yarn build

# Start the project using PM2
echo "Starting the project with PM2..."
pm2 start "yarn start" --name nextjs-app

# Save PM2 process list
echo "Saving PM2 process list..."
pm2 save

# Display running PM2 processes
echo "Next.js app is now running with PM2!"
pm2 list

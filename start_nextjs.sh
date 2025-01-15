#!/bin/bash

# Update system packages
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# # Navigate to the project directory
# echo "Navigating to project directory..."
# cd /path/to/your/project

# Install dependencies
echo "Installing dependencies..."
yarn

# Build the project
echo "Building the project..."
yarn build

# Start the project using PM2
echo "Starting the project with PM2..."
pm2 start "yarn dev" --name nextjs-app

# Save PM2 process list
echo "Saving PM2 process list..."
pm2 save

# Display running PM2 processes
echo "Listing PM2 processes..."
pm2 list

echo "Next.js app is now running with PM2!"

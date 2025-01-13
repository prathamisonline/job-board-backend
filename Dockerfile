# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Expose the application port (adjust according to your project)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]

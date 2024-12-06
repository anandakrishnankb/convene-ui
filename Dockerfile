# Stage 1: Build the React app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Run the React app using a Node.js server
FROM node:18

# Set the working directory for the server
WORKDIR /app

# Copy only the build folder from the previous stage
COPY --from=build /app/build ./build

# Install a lightweight HTTP server (e.g., serve)
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Serve the React app
CMD ["serve", "-s", "build", "-l", "3000"]

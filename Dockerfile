# Use the official Node.js LTS image as the base image
FROM node:20 as build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application source code
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight server image for the final stage
FROM nginx:alpine as production-stage

# Set the working directory for the container
WORKDIR /usr/share/nginx/html

# Remove the default nginx static files
RUN rm -rf ./*

# Copy the build output from the previous stage
COPY --from=build-stage /app/build .

# Copy the custom NGINX configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]

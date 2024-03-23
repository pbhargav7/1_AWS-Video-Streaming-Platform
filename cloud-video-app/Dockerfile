# Choose the Node.js LTS (Long Term Support) base image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy package.json, package-lock.json, and .npmrc to the working directory
COPY package*.json .npmrc ./

# Install the npm packages
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the React app will run on
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]

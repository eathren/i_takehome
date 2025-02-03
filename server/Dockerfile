# Base layer
FROM node:20-alpine

# Set the working directory 
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy over dependency files 
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --ignore-scripts

# Copy all files 
COPY . .

# Install nodemon globally
RUN pnpm install -g nodemon

# Start the application
CMD ["pnpm", "run", "dev"]
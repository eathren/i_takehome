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

# Expose the port Vite uses
EXPOSE 3000

# Start the application
CMD ["pnpm", "run", "dev"]
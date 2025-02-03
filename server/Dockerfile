# Base layer
FROM node:22-alpine

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

# Run migrations and start the server
CMD ["pnpm", "dev"]
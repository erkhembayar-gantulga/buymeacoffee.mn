# Use Node.js v20 as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN yarn prisma generate

# Run migrations and seed data
RUN yarn prisma migrate deploy
RUN yarn prisma db seed

# Build the Next.js app
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]

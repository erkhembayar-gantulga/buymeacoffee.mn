# Use Node.js v20 as the base image
FROM node:20-alpine

# Install bash
RUN apk add --no-cache bash openssl openssl-dev

# Set the working directory
WORKDIR /app

# Set the database URL differently because DATABASE_URL isn't available in the build stage
ARG DB_URL
ARG DATABASE_HOSTNAME
ARG DATABASE_PORT
ENV DATABASE_URL=${DB_URL}
ENV DATABASE_HOSTNAME=${DATABASE_HOSTNAME}
ENV DATABASE_PORT=${DATABASE_PORT}

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# 🔥 Generate Prisma Client inside the container
RUN yarn prisma generate

# Build the Next.js app
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Copy entrypoint script and make it executable
COPY scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

# Start the application (always start prod server in container)
CMD ["yarn", "start"]
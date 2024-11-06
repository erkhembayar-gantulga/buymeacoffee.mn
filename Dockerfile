# Use Node.js v20 as the base image
FROM node:20-alpine

# Install bash
RUN apk add --no-cache bash

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

# Generate Prisma Client without database validation
ENV PRISMA_GENERATE_SKIP_VALIDATE=true
RUN yarn prisma generate

# Build the Next.js app
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Copy entrypoint script and make it executable
COPY scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy wait-for-it script and make it executable
COPY scripts/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

ENTRYPOINT ["/entrypoint.sh"]

# Start the application
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then yarn start; else yarn dev; fi"]

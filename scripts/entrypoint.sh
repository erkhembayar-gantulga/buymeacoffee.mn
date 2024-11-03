#!/bin/sh

# Wait for the database to be ready
echo "Waiting for database to be ready..."
bash /wait-for-it.sh ${DATABASE_HOSTNAME}:${DATABASE_PORT} -t 60

# Run migrations
echo "Running database migrations..."
yarn prisma migrate deploy

# Run seeds if needed
echo "Running database seeds..."
yarn prisma db seed

# Start the application
echo "Starting the application..."
exec "$@"


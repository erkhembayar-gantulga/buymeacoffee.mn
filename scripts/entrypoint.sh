#!/bin/sh

# Wait for the database to be ready
echo "Waiting for database to be ready..."
sh /wait-for-it.sh db:5432 -t 60

# Run migrations
echo "Running database migrations..."
yarn prisma migrate deploy

# Run seeds if needed
echo "Running database seeds..."
yarn prisma db seed

# Start the application
echo "Starting the application..."
exec "$@"


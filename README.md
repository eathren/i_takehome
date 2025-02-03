# Infisical Project

## Prerequisites

- Docker
- Docker Compose

## Running the Project

### server

1. Navigate to the `server` directory:
   cd server

2. Create a `.env` file with the following content:
   DATABASE_URL=postgres://user:password@db:5432/mydb

3. Build and run the server service using Docker Compose:
   docker-compose up -d

### client

1. Navigate to the `client` directory:
   cd client

2. Create a `.env` file with the necessary environment variables.

3. Build and run the client service using Docker Compose:
   docker-compose up -d

## Drizzle Kit Migrations

### Generating Migrations

1. Navigate to the `server` directory:
   cd server

2. Create a migration script using Drizzle Kit:
   npx drizzle-kit generate

### Applying Migrations

1. Ensure that the `DATABASE_URL` environment variable is set in your `.env` file.

2. Run the migration script:
   pnpm run migrate

## Accessing the Application

- server: http://localhost:3000
- client: http://localhost:5173

## Troubleshooting

### Common Issues

#### Database Connection Refused

If you encounter a `connect ECONNREFUSED 127.0.0.1:5432` error, ensure that the PostgreSQL service is running and accessible. You can check the status of the PostgreSQL container using the following command:
docker-compose ps

Ensure that the `postgres_database` container is up and running.

#### Table Already Exists

If you encounter an error indicating that a table already exists, you can drop the existing tables or reset the database to a clean state before running the migrations.

To drop existing tables:
DROP TABLE IF EXISTS fragments;
DROP TABLE IF EXISTS secrets;

To reset the database:
Drop the database
psql -U user -h localhost -c "DROP DATABASE mydb;"

Recreate the database
psql -U user -h localhost -c "CREATE DATABASE mydb;"

## License

This project is licensed under the MIT License.

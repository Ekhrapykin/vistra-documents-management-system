# Vistra Documents Management System - Backend

## Summary

This service provides a simple REST API to manage Folders and Files/Documents, backed by containerised MySQL database.

## Features
 
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL 8.0
- **Query Builder**: Knex.js
- **Containerization**: Docker & Docker Compose
- **API Documentation**: Swagger/OpenAPI

## Project Structure

```
backend/
├── src/
│   ├── index.ts                    # Express app entry point with Swagger setup
│   ├── router.ts                   # API routes for folders & documents
│   ├── types.ts                    # TypeScript type definitions
│   ├── controller/
│   │   ├── index.ts                # Controller exports
│   │   ├── folder.controller.ts    # Folder CRUD operations
│   │   ├── document.controller.ts  # Document CRUD operations
│   │   └── main.controller.ts      # Combined queries
│   └── db/
│       ├── knex.ts                 # Knex database connection
│       └── knexfile.ts             # Knex configuration
├── knex_migrations/
│   ├── 20251205081302_folders.ts   # Folders table migration
│   └── 20251205081326_documents.ts # Documents table migration
├── swagger.yaml                    # OpenAPI 3.0 specification
├── docker-compose.yml              # MySQL container configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Prerequisites

- Node.js (>=20)
- Docker (for running PostgreSQL)

## Environment

Create a `.env` file in this package (or set environment variables in your environment) with the values below:

```
NODE_ENV=dev
PORT=3001
DATABASE_URL=mysql://root:mysql@localhost:3306/vistra_dms
```

## Available Scripts

- `npm run dev` - start the dev server with hot reloading (nodemon + tsx)
- `npm run build` - compile TypeScript to `dist/`
- `npm run start` - run the compiled `dist/index.js` (production)
- `npm run migrate:latest` - run Knex migrations (migrate to latest)
- `npm run migrate:up` - run a single up migration step
- `npm run migrate:down` - rollback last migration
- `npm run db:up` - start database using docker-compose
- `npm run db:down` - stop database using docker-compose **drop volume with DB data**
- `npm run db:logs` - view database logs
- `npm run db:restart` - restart database using docker-compose  **drop volume with DB data**

## How to start server:

1. Install dependencies

```bash
npm install
```

2. Start database (using docker-compose)

```bash
npm run db:up
```

3. Run migrations to set up database schema

```bash
npm run migrate:latest
```

4. Start the development server

```bash
npm run dev
```

5. Test connection to the API:

```bash
curl "http://localhost:3001/"
```

expected output:

```json
{
  "message": "Vistra DMS API"
}
```

## API Endpoints

The API provides endpoints for managing documents and folders. All endpoints are prefixed with `/api/dms`.

### Combined Items

| Method | Endpoint    | Description                                   |
|--------|-------------|-----------------------------------------------|
| GET    | `/api/dms/` | Get all folders and documents (combined list) |

Query parameters for GET `/api/dms/`:

- `search` (string): Search query
- `page` (integer): Page number (default: 1)
- `pageSize` (integer): Items per page (default: 25)
- `sortField` (string): Field to sort by (default: name)
- `sortOrder` (string): Sort order - 'asc' or 'desc' (default: asc)

### API Documentation

You can test the API using cURL, Postman, or any HTTP client.
Interactive API documentation is available at http://localhost:3001/api-docs.

## Database Schema

### Folders Table

```sql
CREATE TABLE folders
(
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    parent_id  BIGINT NULL,
    name       VARCHAR(255) NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN  DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES folders (id) ON DELETE CASCADE
);
```

### Documents Table

```sql
CREATE TABLE documents
(
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    folder_id       BIGINT NULL,
    name            VARCHAR(255) NOT NULL,
    created_by      VARCHAR(255) NOT NULL,
    file_size_bytes BIGINT   DEFAULT 0,
    is_deleted      BOOLEAN  DEFAULT FALSE,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (folder_id) REFERENCES folders (id) ON DELETE CASCADE
);
```

# Vistra Documents Management System — Monorepo

A modern full-stack document management system built with Next.js + React + TypeScript frontend and Node.js + Express backend using MySQL.

## Assumptions
1. User authentication - is not required - “CreatedBy” field is hardcoded value
2. There is no actions on check-boxes - no group actions
3. Nesting is not required
4. Sorting works regardless item type (folder/document)
5. File upload is simulated - no real file storage, only file size is calculated and stored
6. Document preview is basic popup - no real file preview functionality
7. Move action is under construction - only notice popup is shown
8. Folder navigation is not implemented - clicking folder shows notice popup
9. Search is on current level only - no recursive search in subfolders
10. Input validation is basic: english letters, numbers, dot and underscore

_For more details refer to the future enhancements section below._

## Quick Links

- **Frontend [README](packages/frontend/README.md)**
- **Backend [README](packages/backend/README.md)**
- **API Documentation**: http://localhost:3001/api-docs (when backend is running)

## Tech Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI Library**: Material UI (MUI)
- **Styling**: TailwindCSS v4
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL 8.0
- **Query Builder**: Knex.js
- **Containerization**: Docker & Docker Compose
- **API Documentation**: Swagger/OpenAPI 3.0

## Features

### Implemented ✅

#### Document & Folder Management
- View all folders and documents in a unified table
- Create new folders with hierarchical structure
- Upload documents (simulated with file size calculation)
- Rename folder/document
- Delete folders and documents with confirmation

#### UI/UX Features
- **Table**: Sortable columns (name, created by, date, file size)
- **Search**: Real-time search with debouncing (300ms)
- **Pagination**: Configurable page sizes (10, 25, 50, 100)
- **Selection**: Bulk selection with checkboxes
- **Actions**: Row-level context menus (Rename, Move, Delete)
- **Interactions**:
  - Click document: Basic file preview popup
  - Click folder: Navigation notice (future enhancement)
  - Move action: Notice popup (under construction)
- **Material UI Theming**: Consistent design system

#### Performance & Developer Experience
- **Caching**: React Query for efficient data management
- **TypeScript**: Full type safety across frontend and backend
- **Hot Reloading**: Fast development with turbopack and nodemon
- **ESLint**: Code quality enforcement

#### API Features
- **RESTful Endpoints**: CRUD operations for folders and documents
- **Search & Filtering**: Query parameters for flexible data retrieval
- **Pagination**: Server-side pagination support
- **Swagger Documentation**: Interactive API docs
- **Error Handling**: Comprehensive error responses

## Prerequisites

- **Node.js** (>=20)
- **Docker & Docker Compose** (for MySQL database)

## Environment Variables

1. Create `.env.local` in the `packages/frontend/` directory. _[instructions](packages/frontend/README.md#environment-variables)_
2. Create `.env` in the `packages/backend/` directory. _[instructions](packages/backend/README.md#environment)_

## Installation

```bash
npm install
```

Scripts
----------------------
These scripts call into package workspaces for convenience (see `package.json` at repo root):

- `npm run frontend:dev` — Start the frontend dev server
- `npm run frontend:build` — Build the frontend for production
- `npm run frontend:start` — Start production frontend server
- `npm run backend:dev` — Start the backend dev server (nodemon/tsx)
- `npm run backend:build` — Build the backend
- `npm run backend:migrate:latest` — Run backend migrations
- `npm run backend:db:up` — Start MySQL (docker-compose)
- `npm run backend:db:down` — Stop MySQL and remove volumes
- `npm run backend:db:restart` — Restart MySQL

## Quickstart (Development)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the database**:
   ```bash
   npm run backend:db:up
   ```
   _Wait for the MySQL container to be ready._

3. **Run database migrations**:
   ```bash
   npm run backend:migrate:latest
   ```

4. **Start the backend** (new terminal):
   ```bash
   npm run backend:dev
   ```
   - **URL**: http://localhost:3001
   - **API Docs**: http://localhost:3001/api-docs

5. **Start the frontend** (another terminal):
   ```bash
   npm run frontend:dev
   ```
   - **URL**: http://localhost:3000

6. **Open your browser** at http://localhost:3000

## API Endpoints

The REST API provides endpoints for managing documents and folders. All endpoints are prefixed with `/api/dms`.
Open the [API Documentation](http://localhost:3001/api-docs) for detailed specs. _(start the backend to access)_

## Architecture Overview

```
Browser (http://localhost:3000)
    ↓ HTTP Requests
Next.js Frontend (React + TypeScript)
    ↓ Axios HTTP Client
React Query (Caching & State Management)
    ↓ REST API Calls
Express Backend (http://localhost:3001)
    ↓ Knex Query Builder
MySQL Database (Docker, port 3306)
```
## Future Enhancements

- **Authentication**: User login and role-based permissions
- **File Upload**: Real multipart/form-data file handling
- **Folder Navigation**: Drill-down into nested folders
- **Drag & Drop**: File upload with @dnd-kit
- **Advanced Search**: Filters by type, date range, size
- **Document Preview**: Full file preview capabilities
- **Breadcrumb Navigation**: Folder hierarchy display
- **Unit/Integration Tests**: Comprehensive test coverage
- **OpenAPI Generation**: Automated API spec with tsoa
- **Optimistic updates** - Enhanced React Query patterns
- **Error handling** - Improved notifications and error boundaries

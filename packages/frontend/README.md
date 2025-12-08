# Vistra Documents Management System - Frontend

A modern document management system built with Next.js 16 + TypeScript + Material UI + TailwindCSS.

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **UI Library**: Material UI (MUI)
- **Styling**: TailwindCSS v4
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Date Formatting**: date-fns
- **Build Tool**: Next.js (with SWC)

## Project Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers and header
│   ├── page.tsx                 # Homepage (redirects to /documents)
│   ├── globals.css              # Global styles
│   └── documents/               # Documents management
│       └── page.tsx             # Main documents page
├── components/                  # React components
│   ├── Providers.tsx            # React Query + MUI Theme providers
│   ├── features/                # Feature-specific components
│   │   └── documents/
│   │       ├── controller.ts    # State management and handlers
│   │       ├── dialog/          # Dialog components
│   │       │   ├── DeleteConfirmDialog.tsx
│   │       │   ├── Dialog.props.ts
│   │       │   ├── FileDialog.tsx
│   │       │   ├── FolderDialog.tsx
│   │       │   ├── UploadDialog.tsx
│   │       ├── pagination/      # Pagination components
│   │       │   ├── Pagination.props.ts
│   │       │   ├── Pagination.tsx
│   │       ├── search/          # Search components
│   │       │   ├── Search.props.ts
│   │       │   ├── Search.tsx
│   │       ├── table/           # Table components
│   │       │   ├── dialog/      # Table-specific dialogs
│   │       │   │   ├── NoticeDialog.tsx
│   │       │   │   ├── PreviewDialog.tsx
│   │       │   ├── Table.props.ts
│   │       │   ├── Table.tsx
│   │       ├── toolbar/         # Toolbar components
│   │       │   ├── Toolbar.props.ts
│   │       │   ├── Toolbar.tsx
│   ├── layout/                  # Layout components
│   │   └── Header.tsx           # App header with title
│   └── ui/                      # Reusable UI components (future)
├── hooks/                       # Custom React hooks
│   ├── index.ts                 # Hook exports
│   ├── useDMS.hook.ts           # Combined DMS data hook
│   ├── useDocuments.hook.ts     # Document-specific hooks
│   └── useFolders.hook.ts       # Folder-specific hooks
├── lib/                         # Utility functions
│   ├── api.ts                   # Axios instance configuration
│   ├── index.ts                 # Utility exports
│   └── utils.ts                 # Helper functions (formatFileSize, debounce, etc.)
├── services/                    # API service layer
│   ├── index.ts                 # Service exports
│   ├── dms.service.ts           # Combined DMS API calls
│   ├── documents.service.ts     # Document API endpoints
│   └── folders.service.ts       # Folder API endpoints
├── types/                       # TypeScript type definitions
│   ├── index.ts                 # Main type exports
│   ├── CreateDocumentDto.type.ts
│   ├── CreateFolderDto.type.ts
│   ├── Dialog.type.ts
│   ├── Document.type.ts
│   ├── DocumentListItem.enum.ts
│   ├── DocumentListItem.type.ts
│   ├── Folder.type.ts
│   ├── SortField.enum.ts
│   ├── SortOrder.enum.ts
│   ├── UpdateDocumentDto.type.ts
│   └── UpdateFolderDto.type.ts
├── public/                      # Static assets
│   ├── favicon.ico
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts               # Next.js configuration
├── package.json
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.ts           # TailwindCSS configuration
├── tsconfig.json                # TypeScript configuration
└── tsconfig.tsbuildinfo         # TypeScript build info
```

## Features

### Implemented

- **Document & Folder Management**
    - View all folders and documents in a unified table
    - Create new folders
    - Upload documents (simulated with file size calculation)
    - Update folder/document

- **UI Features**
    - Sortable table columns (name, created by, date, file size)
    - Search/filter functionality with debouncing
    - Pagination (10, 25, 50, 100 rows per page)
    - Bulk selection with checkboxes
    - Row-level actions menu (Rename, Move, Delete)
    - Item click interactions:
        - Click document: Show basic file preview popup
        - Click folder: Show notice popup for nested folder navigation
        - Move action: Show notice popup (functionality under construction)
    - Responsive design
    - Material UI theming
    - App header with system title

- **Performance**
    - React Query for data caching and automatic refetching
    - Optimistic updates
    - Debounced search (300ms)

### Future Enhancements

- Folder navigation (drill-down into folders)
- Real file upload with multipart/form-data
- Move dialogs
- Folder tree view in sidebar
- Advanced search and filters
- Drag & drop file upload
- Document preview
- User authentication
- Role-based permissions
- Breadcrumb navigation

## Environment Variables

Create a `.env.local` file in the frontend directory:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## How to start server:

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build

1. Build for production:

```bash
npm run build
```

2. Start production server:

```bash
npm start
```

## Component Architecture

### Page Components

- **app/page.tsx**: Main documents page with state management and data fetching

### Feature Components

- **Toolbar**: Actions bar with "Upload files" and "Add new folder" buttons
- **Search**: Search input with icon and debouncing
- **Table**: Data table with sorting, selection, and actions
- **Pagination**: Pagination with rows-per-page selector
- **FolderDialog**: Modal for creating/editing folders
- **UploadDialog**: Modal for uploading documents
- **DeleteConfirmDialog**: Modal for confirming deletions
- **PreviewDialog**: Modal for basic file preview
- **NoticeDialog**: Modal for informational notices

### Custom Hooks

- **useDMS.hook.ts**: React Query hook for combined DMS data
- **useDocuments.hook.ts**: React Query hooks for document operations
- **useFolders.hook.ts**: React Query hooks for folder operations

### Services

- **dms.service.ts**: API calls for combined DMS endpoints
- **documents.service.ts**: API calls for document endpoints
- **folders.service.ts**: API calls for folder endpoints

## Code Quality

- ESLint configured with Next.js recommended rules
- TypeScript strict mode enabled
- Component-based architecture
- Separation of concerns (UI, Logic, API)
- Custom hooks for reusability

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

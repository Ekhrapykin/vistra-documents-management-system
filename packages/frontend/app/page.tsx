'use client';

import {CircularProgress} from '@mui/material';
import Table from "@/components/features/documents/table/Table";
import Toolbar from "@/components/features/documents/toolbar/Toolbar";
import {useDocumentController} from "@/components/features/documents/controller";
import CreateFolder from "@/components/features/documents/dialog/CreateFolder";
import UploadFiles from "@/components/features/documents/dialog/UploadFiles";
import Search from "@/components/features/documents/search/Search";
import Pagination from "@/components/features/documents/pagination/Pagination";

export default function DocumentsPage() {

  const {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    sortedItems,
    paginatedItems,
    selected,
    searchQuery,
    debouncedSearch,
    handleSelectAll,
    handleSelectOne,
    sortField,
    sortOrder,
    handleSort,
    createFolderOpen,
    setCreateFolderOpen,
    uploadFilesOpen,
    setUploadFilesOpen,
    handleItemClick,
    handleRename,
    handleMove,
    handleDelete,
    foldersLoading,
    documentsLoading
  } = useDocumentController()

  return foldersLoading || documentsLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <CircularProgress/>
    </div>
  ) : (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Toolbar
          onUploadFiles={() => setUploadFilesOpen(true)}
          onAddFolder={() => setCreateFolderOpen(true)}
        />

        <div className="mb-4">
          <Search value={searchQuery} onChange={debouncedSearch}/>
        </div>

        <Table
          items={paginatedItems}
          selected={selected}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
          onItemClick={handleItemClick}
          onRename={handleRename}
          onMove={handleMove}
          onDelete={handleDelete}
        />

        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalItems={sortedItems.length}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />

        <CreateFolder
          open={createFolderOpen}
          onClose={() => setCreateFolderOpen(false)}
        />

        <UploadFiles
          open={uploadFilesOpen}
          onClose={() => setUploadFilesOpen(false)}
        />
      </div>
    </div>);
}


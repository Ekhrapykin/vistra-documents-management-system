'use client';

import {CircularProgress} from '@mui/material';
import Table from "@/components/features/documents/table/Table";
import Toolbar from "@/components/features/documents/toolbar/Toolbar";
import {useDocumentController} from "@/components/features/documents/controller";
import FolderDialog from "@/components/features/documents/dialog/FolderDialog";
import FileDialog from "@/components/features/documents/dialog/FileDialog";
import Search from "@/components/features/documents/search/Search";
import Pagination from "@/components/features/documents/pagination/Pagination";
import UploadDialog from "@/components/features/documents/dialog/UploadDialog";

export default function DocumentsPage() {

  const {
    items,
    itemsLoading,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
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
    fileDialogOpen,
    setFileDialogOpen,
    uploadDialogOpen,
    setUploadDialogOpen,
    handleItemClick,
    handleRename,
    handleMove,
    handleDelete,
  } = useDocumentController()

  return itemsLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <CircularProgress/>
    </div>
  ) : (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Toolbar
          onUploadFiles={() => setUploadDialogOpen(true)}
          onAddFolder={() => setCreateFolderOpen(true)}
        />

        <div className="mb-4">
          <Search value={searchQuery} onChange={debouncedSearch}/>
        </div>

        <Table
          items={items.items}
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
          totalItems={items.length}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
        />

        <FolderDialog
          open={createFolderOpen}
          onClose={() => setCreateFolderOpen(false)}
        />

        <FileDialog
          open={fileDialogOpen}
          onClose={() => setFileDialogOpen(false)}
        />

        <UploadDialog
          open={uploadDialogOpen}
          onClose={() => setUploadDialogOpen(false)}
        />
      </div>
    </div>);
}


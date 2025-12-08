'use client';

import Table from "@/components/features/documents/table/Table";
import Toolbar from "@/components/features/documents/toolbar/Toolbar";
import {useDocumentController} from "@/components/features/documents/controller";
import FolderDialog from "@/components/features/documents/dialog/FolderDialog";
import FileDialog from "@/components/features/documents/dialog/FileDialog";
import Search from "@/components/features/documents/search/Search";
import Pagination from "@/components/features/documents/pagination/Pagination";
import UploadDialog from "@/components/features/documents/dialog/UploadDialog";
import DeleteConfirmDialog from "@/components/features/documents/dialog/DeleteConfirmDialog";
import PreviewDialog from "@/components/features/documents/table/dialog/PreviewDialog";
import NoticeDialog from "@/components/features/documents/table/dialog/NoticeDialog";

export default function DocumentsPage() {
  const {
    items,
    total,
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
    folderDialogOpen,
    setFolderDialogOpen,
    initialFolderData,
    fileDialogOpen,
    setFileDialogOpen,
    initialFileData,
    uploadDialogOpen,
    setUploadDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    itemToDelete,
    handleItemClick,
    handleRename,
    handleMove,
    handleDelete,
    confirmDelete,
    previewDialogOpen,
    setPreviewDialogOpen,
    previewItem,
    noticeDialogOpen,
    setNoticeDialogOpen,
    noticeTitle,
    noticeMessage,
  } = useDocumentController();

  return (
    <div className="min-h-screen bg-zinc-50 p-8 max-w-7xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <Search value={searchQuery} onChange={debouncedSearch}/>
        <Toolbar
          onUploadFiles={() => setUploadDialogOpen(true)}
          onAddFolder={() => setFolderDialogOpen(true)}
        />
      </div>

      <Table
        items={items}
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
        loading={itemsLoading}
      />

      <Pagination
        page={page}
        rowsPerPage={rowsPerPage}
        totalItems={total}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
      />

      <FolderDialog
        open={folderDialogOpen}
        onClose={() => setFolderDialogOpen(false)}
        initialData={initialFolderData}
      />

      <FileDialog
        open={fileDialogOpen}
        onClose={() => setFileDialogOpen(false)}
        initialData={initialFileData}
      />

      <UploadDialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        item={itemToDelete}
      />

      <PreviewDialog
        open={previewDialogOpen}
        item={previewItem}
        onCloseAction={() => setPreviewDialogOpen(false)}
      />

      <NoticeDialog
        open={noticeDialogOpen}
        title={noticeTitle}
        message={noticeMessage}
        onCloseAction={() => setNoticeDialogOpen(false)}
      />
    </div>
  );
}

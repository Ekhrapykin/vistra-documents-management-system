import {useCallback, useState} from "react";
import {DocumentListItem, SortField, SortOrder} from "@/types";
import {useDeleteDocument, useDeleteFolder, useDMS} from "@/hooks";
import {debounce} from "@/lib";

export type InitialFileData = {
  id?: number;
  fileName: string;
  fileSize: string;
};

export function useDocumentController() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<number[]>([]);
  const [sortField, setSortField] = useState<SortField>(SortField.Name);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [initialFileData, setInitialFileData] = useState<InitialFileData | null>(null);

  const {data: items =[], isLoading: itemsLoading} = useDMS();
  const deleteFolder = useDeleteFolder();
  const deleteDocument = useDeleteDocument();

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
      setPage(1); // Reset to first page on search
    }, 300),
    []
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc);
    } else {
      setSortField(field);
      setSortOrder(SortOrder.Asc);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? items.map((item: { id: any; }) => item.id) : []);
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((itemId) => itemId !== id));
    }
  };

  const handleItemClick = (item: DocumentListItem) => {
    console.log('Item clicked:', item);
    // TODO: Navigate to folder or open document details
  };

  const handleRename = (item: DocumentListItem) => {
    setInitialFileData({
      id: item.id,
      fileName: item.name,
      fileSize: String(item.file_size_bytes / 1024),
    });
    setFileDialogOpen(true);
  };

  const handleMove = (item: DocumentListItem) => {
    console.log('Move:', item);
    // TODO: Implement move dialog
  };

  const handleDelete = async (item: DocumentListItem) => {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) return;

    try {
      if (item.type === 'folder') {
        await deleteFolder.mutateAsync(item.id);
      } else {
        await deleteDocument.mutateAsync(item.id);
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };
  return {
    items,
    itemsLoading,
    searchQuery,
    debouncedSearch,
    handleSort,
    handleSelectAll,
    handleSelectOne,
    handleItemClick,
    handleRename,
    handleMove,
    handleDelete,
    selected,
    sortField,
    sortOrder,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    createFolderOpen,
    setCreateFolderOpen,
    fileDialogOpen,
    setFileDialogOpen,
    initialFileData,
    uploadDialogOpen,
    setUploadDialogOpen,
  };
}

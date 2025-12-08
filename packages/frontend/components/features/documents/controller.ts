import {useMemo, useState} from "react";
import {DocumentListItem, SortField, SortOrder, InitialFileData, InitialFolderData} from "@/types";
import {useDeleteDocument, useDeleteFolder, useDMS} from "@/hooks";
import {debounce} from "@/lib";

export function useDocumentController() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<number[]>([]);
  const [sortField, setSortField] = useState<SortField>(SortField.Name);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<DocumentListItem | undefined>(undefined);
  const [initialFileData, setInitialFileData] = useState<InitialFileData | undefined>(undefined);
  const [initialFolderData, setInitialFolderData] = useState<InitialFolderData | undefined>(undefined);

  const {data, isLoading: itemsLoading} = useDMS({
    search: searchQuery,
    page: page,
    pageSize: rowsPerPage,
    sortField: sortField,
    sortOrder: sortOrder,
  });

  const items = data?.items || [];
  const total = data?.total || 0;

  const deleteFolder = useDeleteFolder();
  const deleteDocument = useDeleteDocument();

  // Debounced search handler
  const debouncedSearch = useMemo(
    () =>
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
    setSelected(checked ? items.map((item: { id: number; }) => item.id) : []);
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
    if (item.type === 'folder') {
      setInitialFolderData({
        id: item.id,
        folderName: item.name,
      });
      setFolderDialogOpen(true);
    } else {
      setInitialFileData({
        id: item.id,
        fileName: item.name,
        fileSize: item.file_size_bytes ? String(item.file_size_bytes / 1024) : '0',
      });
      setFileDialogOpen(true);
    }
  };

  const handleMove = (item: DocumentListItem) => {
    console.log('Move:', item);
    // TODO: Implement move dialog
  };

  const handleDelete = (item: DocumentListItem) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      if (itemToDelete.type === 'folder') {
        await deleteFolder.mutateAsync(itemToDelete.id);
      } else {
        await deleteDocument.mutateAsync(itemToDelete.id);
      }
      setDeleteDialogOpen(false);
      setItemToDelete(undefined);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };
  return {
    items,
    total,
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
    confirmDelete,
    selected,
    sortField,
    sortOrder,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
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
  };
}

'use client'

import DocumentsTable from "@/components/features/documents-table/DocumentsTable";
import {DocumentListItem, SortField, SortOrder} from "@/types";
import {useMemo, useState} from "react";
import {useDocuments, useFolders} from "@/hooks";
import DocumentsToolbar from "@/components/features/documents-toolbar/DocumentsToolbar";

export default function DocumentsPage() {

  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<number[]>([]);
  const [sortField, setSortField] = useState<SortField>(SortField.Name);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [uploadFilesOpen, setUploadFilesOpen] = useState(false);

  const { data: folders, isLoading: foldersLoading } = useFolders();
  const { data: documents, isLoading: documentsLoading } = useDocuments();
  // const deleteFolder = useDeleteFolder();
  // const deleteDocument = useDeleteDocument();

  // Combine folders and documents into a single list
  const allItems: DocumentListItem[] = useMemo(() => {
    const items: DocumentListItem[] = [];

    // if (folders) {
    //   items.push(
    //     ...folders
    //       .filter((f) => !f.is_deleted)
    //       .map((folder) => ({
    //         id: folder.id,
    //         name: folder.name,
    //         type: 'folder' as const,
    //         created_by: folder.created_by,
    //         created_at: folder.created_at,
    //         parent_id: folder.parent_id,
    //       }))
    //   );
    // }
    //
    // if (documents) {
    //   items.push(
    //     ...documents
    //       .filter((d) => !d.is_deleted)
    //       .map((doc) => ({
    //         id: doc.id,
    //         name: doc.name,
    //         type: 'document' as const,
    //         created_by: doc.created_by,
    //         created_at: doc.created_at,
    //         file_size_bytes: doc.file_size_bytes,
    //         folder_id: doc.folder_id,
    //       }))
    //   );
    // }

    return items;
  }, [folders, documents]);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return allItems;

    const query = searchQuery.toLowerCase();
    return allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.created_by.toLowerCase().includes(query)
    );
  }, [allItems, searchQuery]);

  // Sort items
  const sortedItems = useMemo(() => {
    const items = [...filteredItems];

    items.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Handle undefined values for file_size_bytes in folders
      if (sortField === 'file_size_bytes') {
        aValue = aValue ?? 0;
        bValue = bValue ?? 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return items;
  }, [filteredItems, sortField, sortOrder]);

  // Paginate items
  const paginatedItems = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return sortedItems.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedItems, page, rowsPerPage]);

  // // Debounced search handler
  // const debouncedSearch = useCallback(
  //   debounce((value: string) => {
  //     setSearchQuery(value);
  //     setPage(1); // Reset to first page on search
  //   }, 300),
  //   []
  // );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc);
    } else {
      setSortField(field);
      setSortOrder(SortOrder.Asc);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelected(paginatedItems.map((item) => item.id));
    } else {
      setSelected([]);
    }
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
    console.log('Rename:', item);
    // TODO: Implement rename dialog
  };

  const handleMove = (item: DocumentListItem) => {
    console.log('Move:', item);
    // TODO: Implement move dialog
  };

  const handleDelete = async (item: DocumentListItem) => {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) return;

    try {
      // if (item.type === 'folder') {
      //   await deleteFolder.mutateAsync(item.id);
      // } else {
      //   await deleteDocument.mutateAsync(item.id);
      // }
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-7xl mx-auto">
        <DocumentsToolbar
          onUploadFiles={() => setUploadFilesOpen(true)}
          onAddFolder={() => setCreateFolderOpen(true)}
        />

        - DocumentsSearch
        <DocumentsTable
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
        - PaginationControls
        - CreateFolderDialog
        - UploadFilesDialog
      </div>
    </div>
  );
}


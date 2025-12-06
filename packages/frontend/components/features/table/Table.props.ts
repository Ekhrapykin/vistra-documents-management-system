import {DocumentListItem, SortField, SortOrder} from "@/types";

export interface TableProps {
  items: DocumentListItem[];
  selected: number[];
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: number, checked: boolean) => void;
  onSort: (field: SortField) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onItemClick: (item: DocumentListItem) => void;
  onRename: (item: DocumentListItem) => void;
  onMove: (item: DocumentListItem) => void;
  onDelete: (item: DocumentListItem) => void;
}

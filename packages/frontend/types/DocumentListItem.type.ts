import {DocumentListItemEnum} from "./DocumentListItem.enum";

export type DocumentListItem = {
  id: number;
  name: string;
  type: DocumentListItemEnum;
  created_by: string;
  created_at: string;
  file_size_bytes?: number;
  folder_id?: number | null;
  parent_id?: number | null;
};

export type Document = {
  id: number;
  folder_id: number | null;
  name: string;
  created_by: string;
  file_size_bytes: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
};

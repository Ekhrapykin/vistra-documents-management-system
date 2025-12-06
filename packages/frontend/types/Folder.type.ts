export type Folder = {
  id: number;
  parent_id: number | null;
  name: string;
  created_by: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateFolderDto = {
  name: string;
  parent_id?: number | null;
  created_by: string;
};

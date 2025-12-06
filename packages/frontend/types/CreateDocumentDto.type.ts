export type CreateDocumentDto = {
  name: string;
  folder_id?: number | null;
  created_by: string;
  file_size_bytes: number;
};

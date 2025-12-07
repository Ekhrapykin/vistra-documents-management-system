// Folder Types
export interface Folder {
  id: number;
  parent_id: number | null;
  name: string;
  created_by: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateFolderDto {
  name: string;
  parent_id?: number | null;
  created_by: string;
}

export interface UpdateFolderDto {
  name?: string;
  parent_id?: number | null;
}

// Document Types
export interface Document {
  id: number;
  folder_id: number | null;
  name: string;
  created_by: string;
  file_size_bytes: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateDocumentDto {
  name: string;
  folder_id?: number | null;
  created_by: string;
  file_size_bytes: number;
}

export interface UpdateDocumentDto {
  name?: string;
  folder_id?: number | null;
}

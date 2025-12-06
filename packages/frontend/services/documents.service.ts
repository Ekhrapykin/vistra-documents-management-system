import {api} from '@/lib/api';
import {CreateDocumentDto, Document, UpdateDocumentDto} from '@/types';

// Documents API
export const documentsService = {
  getAll: async (): Promise<Document[]> => {
    const {data} = await api.get<Document[]>('/documents');
    return data;
  },

  getById: async (id: number): Promise<Document> => {
    const {data} = await api.get<Document>(`/documents/${id}`);
    return data;
  },

  getByFolderId: async (folderId: number): Promise<Document[]> => {
    const {data} = await api.get<Document[]>(`/documents/folder/${folderId}`);
    return data;
  },

  create: async (document: CreateDocumentDto): Promise<Document> => {
    const {data} = await api.post<Document>('/documents', document);
    return data;
  },

  update: async (id: number, document: UpdateDocumentDto): Promise<Document> => {
    const {data} = await api.put<Document>(`/documents/${id}`, document);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/documents/${id}`);
  },
};


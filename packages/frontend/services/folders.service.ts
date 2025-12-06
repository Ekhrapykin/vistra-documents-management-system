import {api} from '@/lib/api';
import {CreateFolderDto, Folder, UpdateFolderDto} from '@/types';

// Folder API
export const foldersService = {
  getAll: async (): Promise<Folder[]> => {
    const {data} = await api.get<Folder[]>('/folders');
    return data;
  },

  getById: async (id: number): Promise<Folder> => {
    const {data} = await api.get<Folder>(`/folders/${id}`);
    return data;
  },

  create: async (folder: CreateFolderDto): Promise<Folder> => {
    const {data} = await api.post<Folder>('/folders', folder);
    return data;
  },

  update: async (id: number, folder: UpdateFolderDto): Promise<Folder> => {
    const {data} = await api.put<Folder>(`/folders/${id}`, folder);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/folders/${id}`);
  },
};

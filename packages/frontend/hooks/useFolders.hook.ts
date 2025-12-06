import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { foldersService } from '@/services';
import { CreateFolderDto, UpdateFolderDto } from '@/types';

// Folders Hooks
export function useFolders() {
  return useQuery({
    queryKey: ['folders'],
    queryFn: foldersService.getAll,
  });
}

export function useFolder(id: number) {
  return useQuery({
    queryKey: ['folders', id],
    queryFn: () => foldersService.getById(id),
    enabled: !!id,
  });
}

export function useCreateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folder: CreateFolderDto) => foldersService.create(folder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
}

export function useUpdateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateFolderDto }) =>
      foldersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
  });
}

export function useDeleteFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => foldersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
}

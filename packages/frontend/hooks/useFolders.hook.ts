import {useMutation, useQueryClient} from '@tanstack/react-query';
import {foldersService} from '@/services';
import {CreateFolderDto, UpdateFolderDto} from '@/types';
import {invalidate} from "./useDMS.hook";

// Folders Hooks
export function useCreateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folder: CreateFolderDto) => foldersService.create(folder),
    onSuccess: invalidate(queryClient)
  });
}

export function useUpdateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, data}: { id: number; data: UpdateFolderDto }) =>
      foldersService.update(id, data),
    onSuccess: invalidate(queryClient)
  });
}

export function useDeleteFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => foldersService.delete(id),
    onSuccess: invalidate(queryClient)
  });
}

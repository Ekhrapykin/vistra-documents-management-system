import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentsService } from '@/services';
import { CreateDocumentDto, UpdateDocumentDto } from '@/types';

// Documents Hooks

export function useCreateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (document: CreateDocumentDto) => documentsService.create(document),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
}

export function useUpdateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateDocumentDto }) =>
      documentsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => documentsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
}

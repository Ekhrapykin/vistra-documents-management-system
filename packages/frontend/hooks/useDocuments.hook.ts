import {useMutation, useQueryClient} from '@tanstack/react-query';
import {documentsService} from '@/services';
import {CreateDocumentDto, UpdateDocumentDto} from '@/types';
import {invalidate} from "@/hooks/useDMS.hook";

// Documents Hooks
export function useCreateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (document: CreateDocumentDto) => documentsService.create(document),
    onSuccess: invalidate(queryClient)
  });
}

export function useUpdateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id, data}: { id: number; data: UpdateDocumentDto }) =>
      documentsService.update(id, data),
    onSuccess: invalidate(queryClient)
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => documentsService.delete(id),
    onSuccess: invalidate(queryClient)
  });
}

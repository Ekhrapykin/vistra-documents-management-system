import {QueryClient, useQuery} from '@tanstack/react-query';
import {dmsService} from '@/services';

export const invalidate = (queryClient: QueryClient) => () => {
  queryClient.invalidateQueries({queryKey: ['items']});
}

export function useDMS() {
  return useQuery({
    queryKey: ['items', 'searchQuery', 'sortField', 'sortOrder', 'page', 'rowsPerPage'],
    queryFn: dmsService.getAll,
  });
}

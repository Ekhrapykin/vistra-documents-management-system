import {useQuery} from '@tanstack/react-query';
import {dmsService} from '@/services';

export function useDMS() {
  return useQuery({
    queryKey: ['items', 'searchQuery', 'sortField', 'sortOrder', 'page', 'rowsPerPage'],
    queryFn: dmsService.getAll,
  });
}

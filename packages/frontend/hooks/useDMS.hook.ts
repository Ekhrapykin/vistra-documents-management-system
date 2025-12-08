import {QueryClient, useQuery} from '@tanstack/react-query';
import {dmsService, DMSQueryParams} from '@/services';

export const invalidate = (queryClient: QueryClient) => () => {
  queryClient.invalidateQueries({queryKey: ['items']});
}

export function useDMS(params: DMSQueryParams = {}) {
  return useQuery({
    queryKey: ['items', params.search, params.sortField, params.sortOrder, params.page, params.pageSize],
    queryFn: () => dmsService.getAll(params),
  });
}

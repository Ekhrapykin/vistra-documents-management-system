import {api} from "@/lib/api";

export type DMSQueryParams = {
  search?: string;
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: string;
};

export const dmsService = {
  getAll: async (params: DMSQueryParams = {}) => {
    const {data} = await api.get('/', { params });
    return data;
  }
}

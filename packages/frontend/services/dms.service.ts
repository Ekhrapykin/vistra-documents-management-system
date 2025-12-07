import {api} from "@/lib/api";

export const dmsService = {
  getAll: async () => {
    const {data} = await api.get('/');
    return data;
  }
}

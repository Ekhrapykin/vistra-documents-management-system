import knex from "../db/knex";
import {Document, Folder} from "../types";

export const mainController = {
  queryAll: async (options?: { search?: string; page?: number; pageSize?: number }) => {
    const search = options?.search?.trim() || '';
    const page = options?.page && options?.page > 0 ? options.page : 1;
    const pageSize = options?.pageSize && options.pageSize > 0 ? options.pageSize : 25;
    const offset = (page - 1) * pageSize;

    // Build base queries
    let foldersQuery = knex<Folder>('folders')
      .whereNull('parent_id')
      .select({
        id: 'id',
        name: 'name',
        created_by: 'created_by',
        created_at: 'created_at',
        size: knex.raw('0'),
        type: knex.raw('\'folder\'')
      });
    let documentsQuery = knex<Document>('documents')
      .whereNull("folder_id")
      .select({
        id: 'id',
        name: 'name',
        created_by: 'created_by',
        created_at: 'created_at',
        size: 'file_size_bytes',
        type: knex.raw('\'document\'')
      });

    // Get total count for pagination
    const foldersCountQuery = knex<Folder>('folders').whereNull('parent_id');
    const documentsCountQuery = knex<Document>('documents').whereNull('folder_id');

    if (search) {
      foldersQuery.whereILike('name', `%${search}%`);
      foldersCountQuery.whereILike('name', `%${search}%`);
      documentsQuery.whereILike('name', `%${search}%`);
      documentsCountQuery.whereILike('name', `%${search}%`);
    }
    const [foldersCountResult, documentsCountResult] = await Promise.all([
      foldersCountQuery.count({ count: '1' }),
      documentsCountQuery.count({ count: '1' })
    ]);
    const total = Number(foldersCountResult[0].count) + Number(documentsCountResult[0].count);

    // Union, order, and paginate
    const items = await knex
      .unionAll([foldersQuery, documentsQuery])
      .orderBy('name', 'asc')
      .limit(pageSize)
      .offset(offset);

    return {
      items,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      search,
    };
  }
}

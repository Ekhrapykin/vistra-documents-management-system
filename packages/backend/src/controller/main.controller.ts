import knex from "../db/knex";
import {Document, Folder} from "../types";

export const mainController = {
  queryAll: async () => {
    const folders = knex<Folder>('folders')
      .whereNull('parent_id')
      .select({
        id: 'id',
        name: 'name',
        created_by: 'created_by',
        created_at: 'created_at',
        size: 0
      })
    const documents = knex<Document>('documents')
      .whereNull("folder_id")
      .select({
        id: 'id',
        name: 'name',
        created_by: 'created_by',
        created_at: 'created_at',
        size: 'file_size_bytes'
      })


    return knex.unionAll([folders, documents])
      .orderBy('name', 'asc');

  }
  // todo add pagination, add search
}

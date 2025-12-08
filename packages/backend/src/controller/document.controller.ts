import knex from "../db/knex";
import {CreateDocumentDto, Document, Folder, UpdateDocumentDto} from "../types";

export const documentController = {
  insert: async ({name, folder_id, created_by, file_size_bytes}: CreateDocumentDto): Promise<Folder | {
    error: string
  }> => {
    // Validate folder_id exists if provided
    if (folder_id) {
      const [folder] = await knex<Folder>('folders')
        .where({id: folder_id});

      if (!folder) {
        return {
          error: 'Folder not found'
        };
      }
    }

    const [id] = await knex<Document>('documents')
      .insert({
        name,
        folder_id: folder_id || null,
        created_by,
        file_size_bytes: file_size_bytes || 0,
      })
    return knex('documents').where({id}).first();

  },
  update: async (id: number, {name, folder_id}: UpdateDocumentDto): Promise<Document | {
    error: string
  }> => {
    // Check if document exists
    const [document] = await knex<Document>('documents')
      .where({id});

    if (!document) {
      return {
        error: 'Document not found'
      };
    }

    // Validate folder_id if provided
    if (folder_id) {
      const [folder] = await knex<Folder>('folders')
        .where({id: folder_id});

      if (!folder) {
        return {
          error: 'Folder not found'
        };
      }
    }

    const updateData: any = {
      updated_at: knex.fn.now(),
    };

    if (name) updateData.name = name;
    if (folder_id !== undefined) updateData.folder_id = folder_id;

    await knex<Document>('documents')
      .where('id', id)
      .update(updateData);
    return knex('folders').where({id}).first();
  },
  delete: async (id: number): Promise<void| {error: string}> => {
    // Check if document exists
    const [document] = await knex<Document>('documents')
      .where({ id });

    if (!document) {
      return {
        error: 'Document not found'
      };
    }
    await knex<Document>('documents').delete().where({id})
  }
}

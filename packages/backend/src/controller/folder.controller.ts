import knex from "../db/knex";
import {CreateFolderDto, Folder, UpdateFolderDto, Document} from "../types";

export const folderController = {
  insert: async ({name, parent_id, created_by}: CreateFolderDto): Promise<Folder | { error: string }> => {
    // Validate parent_id exists if provided
    if (parent_id) {
      const [parent] = await knex<Folder>('folders')
        .where({id: parent_id});

      if (!parent) {
        return {
          error: 'Parent folder not found'
        };
      }
    }

    const [id] = await knex<Folder>('folders')
      .insert({
        name,
        parent_id: parent_id || null,
        created_by,
      });
    return knex('folders').where({id}).first();

  },
  update: async (id: number, { name, parent_id }: UpdateFolderDto): Promise<Folder | { error: string }> => {
    // Check if folder exists
    const [folder] = await knex<Folder>('folders')
      .where({ id });

    if (!folder) {
      return {
        error: 'Folder not found'
      };
    }

    // Validate parent_id if provided
    if (parent_id) {
      // Can't set self as parent
      if (parent_id === id) {
        return {
          error: 'Folder cannot be its own parent'
        };
      }

      const [parent] = await knex<Folder>('folders')
        .where({ id: parent_id });

      if (!parent) {
        return {
          error: 'Parent folder not found'
        };
      }
    }

    const updateData: any = {
      updated_at: knex.fn.now(),
    };

    if (name) updateData.name = name;
    if (parent_id !== undefined) updateData.parent_id = parent_id;

    await knex<Folder>('folders')
      .where({id})
      .update(updateData);

    return knex('folders').where({id}).first();
  },
  delete: async (id: number): Promise<void| {error: string}> => {
    // Check if folder exists
    const [folder] = await knex<Folder>('folders')
      .where({ id });

    if (!folder) {
      return {
        error: 'Folder not found'
      };
    }
    await Promise.all([
      knex<Folder>('folders').delete().where({id}),
      knex<Document>('documents').delete().where({folder_id: id})
    ])
  }
}

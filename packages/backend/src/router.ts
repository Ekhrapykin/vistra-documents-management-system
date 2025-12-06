import { Router, Request, Response } from 'express';
import knex from './knex';

// Folder Types
interface Folder {
  id: number;
  parent_id: number | null;
  name: string;
  created_by: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}

interface CreateFolderDto {
  name: string;
  parent_id?: number | null;
  created_by: string;
}

interface UpdateFolderDto {
  name?: string;
  parent_id?: number | null;
}

// Document Types
interface Document {
  id: number;
  folder_id: number | null;
  name: string;
  created_by: string;
  file_size_bytes: number;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}

interface CreateDocumentDto {
  name: string;
  folder_id?: number | null;
  created_by: string;
  file_size_bytes: number;
}

interface UpdateDocumentDto {
  name?: string;
  folder_id?: number | null;
}

const router = Router();

// ========== FOLDER ROUTES ==========

// Get all folders
router.get('/folders', async (_req: Request, res: Response) => {
  try {
    const folders = await knex<Folder>('folders')
      .where('is_deleted', false)
      .orderBy('name', 'asc');

    return res.json(folders);
  } catch (error) {
    console.error('Error fetching folders:', error);
    return res.status(500).json({ error: 'Failed to fetch folders' });
  }
});

// Get folder by ID
router.get('/folders/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [folder] = await knex<Folder>('folders')
      .where({
        id: parseInt(id),
        is_deleted: false
      });

    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    return res.json(folder);
  } catch (error) {
    console.error('Error fetching folder:', error);
    return res.status(500).json({ error: 'Failed to fetch folder' });
  }
});

// Create folder
router.post('/folders', async (req: Request, res: Response) => {
  try {
    const { name, parent_id, created_by }: CreateFolderDto = req.body;

    if (!name || !created_by) {
      return res.status(400).json({ error: 'Name and created_by are required' });
    }

    // Validate parent_id exists if provided
    if (parent_id) {
      const [parent] = await knex<Folder>('folders')
        .where({ id: parent_id, is_deleted: false });

      if (!parent) {
        return res.status(400).json({ error: 'Parent folder not found' });
      }
    }

    const [created] = await knex<Folder>('folders')
      .insert({
        name,
        parent_id: parent_id || null,
        created_by,
        is_deleted: false,
      })
      .returning('*');

    return res.status(201).json(created);
  } catch (error) {
    console.error('Error creating folder:', error);
    return res.status(500).json({ error: 'Failed to create folder' });
  }
});

// Update folder
router.put('/folders/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, parent_id }: UpdateFolderDto = req.body;

    if (!name && parent_id === undefined) {
      return res.status(400).json({ error: 'At least one field is required to update' });
    }

    // Check if folder exists
    const [folder] = await knex<Folder>('folders')
      .where({ id: parseInt(id), is_deleted: false });

    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    // Validate parent_id if provided
    if (parent_id) {
      // Can't set self as parent
      if (parent_id === parseInt(id)) {
        return res.status(400).json({ error: 'Folder cannot be its own parent' });
      }

      const [parent] = await knex<Folder>('folders')
        .where({ id: parent_id, is_deleted: false });

      if (!parent) {
        return res.status(400).json({ error: 'Parent folder not found' });
      }
    }

    const updateData: any = {
      updated_at: knex.fn.now(),
    };

    if (name) updateData.name = name;
    if (parent_id !== undefined) updateData.parent_id = parent_id;

    const [updated] = await knex<Folder>('folders')
      .where('id', id)
      .update(updateData)
      .returning('*');

    return res.json(updated);
  } catch (error) {
    console.error('Error updating folder:', error);
    return res.status(500).json({ error: 'Failed to update folder' });
  }
});

// Delete folder (soft delete)
router.delete('/folders/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [folder] = await knex<Folder>('folders')
      .where({ id: parseInt(id), is_deleted: false });

    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    // Soft delete the folder
    await knex<Folder>('folders')
      .where('id', id)
      .update({
        is_deleted: true,
        updated_at: knex.fn.now(),
      });

    // Also soft delete all documents in this folder
    await knex<Document>('documents')
      .where('folder_id', id)
      .update({
        is_deleted: true,
        updated_at: knex.fn.now(),
      });

    return res.json({ message: 'Folder deleted successfully' });
  } catch (error) {
    console.error('Error deleting folder:', error);
    return res.status(500).json({ error: 'Failed to delete folder' });
  }
});

// ========== DOCUMENT ROUTES ==========

// Get all documents
router.get('/documents', async (_req: Request, res: Response) => {
  try {
    const documents = await knex<Document>('documents')
      .where('is_deleted', false)
      .orderBy('name', 'asc');

    return res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// Get documents by folder
router.get('/documents/folder/:folderId', async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;

    const documents = await knex<Document>('documents')
      .where({ folder_id: parseInt(folderId), is_deleted: false })
      .orderBy('name', 'asc');

    return res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// Get document by ID
router.get('/documents/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [document] = await knex<Document>('documents')
      .where({ id: parseInt(id), is_deleted: false });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    return res.json(document);
  } catch (error) {
    console.error('Error fetching document:', error);
    return res.status(500).json({ error: 'Failed to fetch document' });
  }
});

// Create document
router.post('/documents', async (req: Request, res: Response) => {
  try {
    const { name, folder_id, created_by, file_size_bytes }: CreateDocumentDto = req.body;

    if (!name || !created_by) {
      return res.status(400).json({ error: 'Name and created_by are required' });
    }

    // Validate folder_id exists if provided
    if (folder_id) {
      const [folder] = await knex<Folder>('folders')
        .where({ id: folder_id, is_deleted: false });

      if (!folder) {
        return res.status(400).json({ error: 'Folder not found' });
      }
    }

    const [created] = await knex<Document>('documents')
      .insert({
        name,
        folder_id: folder_id || null,
        created_by,
        file_size_bytes: file_size_bytes || 0,
        is_deleted: false,
      })
      .returning('*');

    return res.status(201).json(created);
  } catch (error) {
    console.error('Error creating document:', error);
    return res.status(500).json({ error: 'Failed to create document' });
  }
});

// Update document
router.put('/documents/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, folder_id }: UpdateDocumentDto = req.body;

    if (!name && folder_id === undefined) {
      return res.status(400).json({ error: 'At least one field is required to update' });
    }

    // Check if document exists
    const [document] = await knex<Document>('documents')
      .where({ id: parseInt(id), is_deleted: false });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Validate folder_id if provided
    if (folder_id) {
      const [folder] = await knex<Folder>('folders')
        .where({ id: folder_id, is_deleted: false });

      if (!folder) {
        return res.status(400).json({ error: 'Folder not found' });
      }
    }

    const updateData: any = {
      updated_at: knex.fn.now(),
    };

    if (name) updateData.name = name;
    if (folder_id !== undefined) updateData.folder_id = folder_id;

    const [updated] = await knex<Document>('documents')
      .where('id', id)
      .update(updateData)
      .returning('*');

    return res.json(updated);
  } catch (error) {
    console.error('Error updating document:', error);
    return res.status(500).json({ error: 'Failed to update document' });
  }
});

// Delete document (soft delete)
router.delete('/documents/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [document] = await knex<Document>('documents')
      .where({ id: parseInt(id), is_deleted: false });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Soft delete the document
    await knex<Document>('documents')
      .where('id', id)
      .update({
        is_deleted: true,
        updated_at: knex.fn.now(),
      });

    return res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    return res.status(500).json({ error: 'Failed to delete document' });
  }
});

export default router;


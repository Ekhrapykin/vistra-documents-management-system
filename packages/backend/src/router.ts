import {Request, Response, Router} from 'express';
import {documentController, folderController, mainController} from "./controller";
import {CreateDocumentDto, CreateFolderDto, UpdateDocumentDto, UpdateFolderDto} from "./types";

const router = Router();

router
  .get('/', async (req: Request, res: Response) => {
    try {
      const {
        search = '',
        page = 1,
        pageSize = 25,
        sortField = 'name',
        sortOrder = 'asc'
      } = req.query;
      const result = await mainController.queryAll({
        search: search.toString(),
        page: Number(page),
        pageSize: Number(pageSize),
        sortField: sortField.toString(),
        sortOrder: sortOrder.toString(),
      });
      return res.json(result);
    } catch (error) {
      console.error('Error fetching items:', error);
      return res.status(500).json({ error: 'Failed to fetch items' });
    }
  })

  .post('/folders', async (req: Request, res: Response) => {
    try {
      const {name, parent_id, created_by}: CreateFolderDto = req.body;

      if (!name || !created_by) {
        return res.status(400).json({error: 'Name and created_by are required'});
      }

      const created = await folderController.insert({name, parent_id, created_by})
      if (created && 'error' in created) {
        return res.status(400).json({error: created.error});
      }
      return res.status(201).json(created);
    } catch (error) {
      console.error('Error creating folder:', error);
      return res.status(500).json({error: 'Failed to create folder'});
    }
  })

  .put('/folders/:id', async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const {name, parent_id}: UpdateFolderDto = req.body;

      if (!name && parent_id === undefined) {
        return res.status(400).json({error: 'At least one field is required to update'});
      }

      const updated = await folderController.update(Number(id), {name, parent_id});
      if (updated && 'error' in updated) {
        return res.status(400).json({error: updated.error});
      }

      return res.json(updated);
    } catch (error) {
      console.error('Error updating folder:', error);
      return res.status(500).json({error: 'Failed to update folder'});
    }
  })

  .delete('/folders/:id', async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const deleted = await folderController.delete(Number(id));
      if (deleted && 'error' in deleted) {
        return res.status(400).json({error: deleted.error});
      } else {
        return res.json({message: 'Folder deleted successfully'})
      }
    } catch (error) {
      console.error('Error deleting folder:', error);
      return res.status(500).json({error: 'Failed to delete folder'});
    }
  })

  .post('/documents', async (req: Request, res: Response) => {
    try {
      const {name, folder_id, created_by, file_size_bytes}: CreateDocumentDto = req.body;

      if (!name || !created_by) {
        return res.status(400).json({error: 'Name and created_by are required'});
      }

      const created = await documentController.insert({name, folder_id, created_by, file_size_bytes})
      if (created && 'error' in created) {
        return res.status(400).json({error: created.error});
      }
      return res.status(201).json(created);
    } catch (error) {
      console.error('Error creating document:', error);
      return res.status(500).json({error: 'Failed to create document'});
    }
  })

  .put('/documents/:id', async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const {name, folder_id}: UpdateDocumentDto = req.body;

      if (!name && folder_id === undefined) {
        return res.status(400).json({error: 'At least one field is required to update'});
      }

      const updated = await documentController.update(Number(id), {name, folder_id});
      if (updated && 'error' in updated) {
        return res.status(400).json({error: updated.error});
      }

      return res.json(updated);
    } catch (error) {
      console.error('Error updating document:', error);
      return res.status(500).json({error: 'Failed to update document'});
    }
  })

  .delete('/documents/:id', async (req: Request, res: Response) => {
    try {
      const {id} = req.params;

      const deleted = await documentController.delete(Number(id));
      if (deleted && 'error' in deleted) {
        return res.status(400).json({error: deleted.error});
      } else {
        return res.json({message: 'Document deleted successfully'})
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      return res.status(500).json({error: 'Failed to delete document'});
    }
  });

export default router;

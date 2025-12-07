'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useCreateFolder } from '@/hooks';
import DialogProps from "./Dialog.props";

export default function CreateFolder({ open, onClose, parentId }: DialogProps) {
  const [folderName, setFolderName] = useState('');
  const createFolder = useCreateFolder();

  const handleSubmit = async () => {
    if (!folderName.trim()) return;

    try {
      await createFolder.mutateAsync({
        name: folderName,
        parent_id: parentId || null,
        created_by: 'Current User', // TODO: Get from auth context
      });
      setFolderName('');
      onClose();
    } catch (error) {
      console.error('Failed to create folder:', error);
    }
  };

  const handleClose = () => {
    setFolderName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Folder</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Folder Name"
          type="text"
          fullWidth
          variant="outlined"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!folderName.trim() || createFolder.isPending}
        >
          {createFolder.isPending ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}


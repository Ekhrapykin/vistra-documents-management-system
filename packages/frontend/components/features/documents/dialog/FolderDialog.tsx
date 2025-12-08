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
import { useCreateFolder, useUpdateFolder } from '@/hooks';
import DialogProps from "./Dialog.props";

// Validation: Only English letters, numbers, dots, and underscores
const validateInput = (value: string): boolean => {
  return /^[a-zA-Z0-9._]+$/.test(value);
};

function FolderDialogContent({ open, onClose, parentId, initialData }: DialogProps) {
  const [folderName, setFolderName] = useState(initialData?.folderName || '');
  const [error, setError] = useState('');
  const createFolder = useCreateFolder();
  const updateFolder = useUpdateFolder();

  const isEditMode = !!initialData?.id;

  const handleInputChange = (value: string) => {
    setFolderName(value);
    if (value && !validateInput(value)) {
      setError('Only English letters, numbers, dots, and underscores are allowed');
    } else {
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!folderName.trim() || error) return;

    try {
      if (isEditMode && initialData?.id) {
        await updateFolder.mutateAsync({
          id: initialData.id,
          data: {
            name: folderName,
          },
        });
      } else {
        await createFolder.mutateAsync({
          name: folderName,
          parent_id: parentId || null,
          created_by: 'Current User', // TODO: Get from auth context
        });
      }
      onClose();
    } catch (error) {
      console.error(`Failed to ${isEditMode ? 'update' : 'create'} folder:`, error);
    }
  };

  const isPending = createFolder.isPending || updateFolder.isPending;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Rename Folder' : 'Create New Folder'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Folder Name"
          type="text"
          fullWidth
          variant="outlined"
          value={folderName}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !error) {
              handleSubmit();
            }
          }}
          error={!!error}
          helperText={error || 'Only English letters, numbers, dots, and underscores allowed'}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!folderName.trim() || !!error || isPending}
        >
          {isPending ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update' : 'Create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function FolderDialog(props: DialogProps) {
  // Use key prop to reset component state when initialData changes
  return <FolderDialogContent {...props} key={props.initialData?.id || 'new'} />;
}


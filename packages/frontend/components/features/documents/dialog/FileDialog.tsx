'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useCreateDocument, useUpdateDocument } from '@/hooks';
import DialogProps from "./Dialog.props";

export default function FileDialog({ open, onClose, folderId, initialData }: DialogProps) {
  const [fileName, setFileName] = useState(initialData?.fileName || '');
  const [fileSize, setFileSize] = useState(initialData?.fileSize || '');
  const createDocument = useCreateDocument();
  const updateDocument = useUpdateDocument();

  // Update state when initialData changes
  useEffect(() => {
    if (open) {
      setFileName(initialData?.fileName || '');
      setFileSize(initialData?.fileSize || '');
    }
  }, [open, initialData]);

  const handleSubmit = async () => {
    if (!fileName.trim()) return;

    try {
        await updateDocument.mutateAsync({
          id: initialData?.id!,
          data: {
            name: fileName,
          },
        });
      handleClose();
    } catch (error) {
      console.error(`Failed to update document:`, error);
    }
  };

  const handleClose = () => {
    setFileName('');
    setFileSize('');
    onClose();
  };

  const isPending = createDocument.isPending || updateDocument.isPending;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Rename Document</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4 mt-2">
          <TextField
            autoFocus
            label="Document Name"
            type="text"
            fullWidth
            variant="outlined"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <TextField
            label="File Size (KB)"
            type="number"
            fullWidth
            variant="outlined"
            value={fileSize}
            disabled
            helperText="Enter file size in kilobytes"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!fileName.trim() || !fileSize.trim() || isPending}
        >
          {isPending ? 'Updating...' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}


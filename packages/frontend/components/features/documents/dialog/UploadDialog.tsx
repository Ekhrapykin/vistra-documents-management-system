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
import { useCreateDocument } from '@/hooks';
import DialogProps from "./Dialog.props";

export default function UploadDialog({ open, onClose, folderId }: DialogProps) {
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const createDocument = useCreateDocument();

  const handleSubmit = async () => {
    if (!fileName.trim() || !fileSize.trim()) return;

    try {
      await createDocument.mutateAsync({
        name: fileName,
        folder_id: folderId || null,
        created_by: 'Current User', // TODO: Get from auth context
        file_size_bytes: parseInt(fileSize) * 1024, // Convert KB to bytes
      });
      setFileName('');
      setFileSize('');
      onClose();
    } catch (error) {
      console.error('Failed to upload document:', error);
    }
  };

  const handleClose = () => {
    setFileName('');
    setFileSize('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload Document</DialogTitle>
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
            onChange={(e) => setFileSize(e.target.value)}
            helperText="Enter file size in kilobytes"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!fileName.trim() || !fileSize.trim() || createDocument.isPending}
        >
          {createDocument.isPending ? 'Uploading...' : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}


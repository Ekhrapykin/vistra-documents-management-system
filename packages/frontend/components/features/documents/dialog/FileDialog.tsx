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
import { useCreateDocument, useUpdateDocument } from '@/hooks';
import DialogProps from "./Dialog.props";

function FileDialogContent({ open, onClose, initialData }: DialogProps) {
  const [fileName, setFileName] = useState(initialData?.fileName || '');
  const [fileSize] = useState(initialData?.fileSize || '');
  const createDocument = useCreateDocument();
  const updateDocument = useUpdateDocument();

  const handleSubmit = async () => {
    if (!fileName.trim() || !initialData?.id) return;

    try {
      await updateDocument.mutateAsync({
        id: initialData.id,
        data: {
          name: fileName,
        },
      });
      onClose();
    } catch (error) {
      console.error(`Failed to update document:`, error);
    }
  };

  const isPending = createDocument.isPending || updateDocument.isPending;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
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
        <Button onClick={onClose}>Cancel</Button>
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

export default function FileDialog(props: DialogProps) {
  // Use key prop to reset component state when initialData changes
  return <FileDialogContent {...props} key={props.initialData?.id || 'new'} />;
}


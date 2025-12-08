'use client';

import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography} from '@mui/material';
import {DocumentListItem} from '@/types';

interface PreviewDialogProps  {
  open: boolean;
  item?: DocumentListItem | undefined;
  onCloseAction: () => void;
}

export default function PreviewDialog({open, item, onCloseAction}: PreviewDialogProps) {
  return (
    <Dialog open={open} onClose={onCloseAction} maxWidth="sm" fullWidth>
      <DialogTitle>{item?.name || 'Basic File Preview'}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Basic File Preview
        </Typography>
        <DialogContentText>
          {item ? (
            <>
              <div>Filename: {item.name}</div>
              <div>Created by: {item.created_by}</div>
              <div>Date: {item.created_at}</div>
              <div>Size: {item.file_size_bytes ? `${item.file_size_bytes} bytes` : 'N/A'}</div>
            </>
          ) : (
            <div>No file selected</div>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseAction} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

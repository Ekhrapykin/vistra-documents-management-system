'use client';

import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@mui/material';

interface NoticeDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  onCloseAction: () => void;
}

export default function NoticeDialog({open, title, message, onCloseAction}: NoticeDialogProps) {
  return (
    <Dialog open={open} onClose={onCloseAction}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseAction} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

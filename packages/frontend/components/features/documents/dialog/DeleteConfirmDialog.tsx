'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import { DocumentListItem } from '@/types';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: DocumentListItem | undefined;
  isDeleting?: boolean;
}

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  item,
  isDeleting = false,
}: DeleteConfirmDialogProps) {
  if (!item) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
          },
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1 }}>
        <WarningAmberIcon sx={{ color: 'error.main', fontSize: 28 }} />
        <span>Confirm Delete</span>
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Are you sure you want to delete this {item.type}?
        </DialogContentText>

        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          {item.type === 'folder' ? (
            <FolderIcon sx={{ color: '#f59e0b', fontSize: 32 }} />
          ) : (
            <DescriptionIcon sx={{ color: '#3b82f6', fontSize: 32 }} />
          )}
          <div className="flex-1">
            <p className="font-medium text-gray-900">{item.name}</p>
            <p className="text-sm text-gray-500">
              {item.type === 'folder' ? 'Folder' : 'Document'}
              {item.type === 'document' && item.file_size_bytes && (
                <> • {(item.file_size_bytes / 1024).toFixed(2)} KB</>
              )}
            </p>
          </div>
        </div>

        <DialogContentText sx={{ mt: 2, color: 'error.main', fontSize: '0.875rem' }}>
          <strong>Warning:</strong> This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={isDeleting}
          sx={{
            minWidth: 100,
          }}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}


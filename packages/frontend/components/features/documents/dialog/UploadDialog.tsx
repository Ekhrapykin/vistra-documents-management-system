'use client';

import {ChangeEvent, useRef, useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography,} from '@mui/material';
import {useCreateDocument} from '@/hooks';
import DialogProps from "./Dialog.props";
import {validateInput} from '@/lib';

export default function UploadDialog({open, onClose, folderId}: DialogProps) {
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [displayFileName, setDisplayFileName] = useState('No file selected');
  const inputRef = useRef<HTMLInputElement>(null);
  const createDocument = useCreateDocument();

  const handleInputChange = (value: string) => {
    setFileName(value);
    if (!selectedFile && value && !validateInput(value)) {
      setError('Only English letters, numbers, dots, and underscores are allowed');
    } else {
      setError('');
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      setFileName(file.name);
      setFileSize((file.size / 1024).toFixed(2));
      setDisplayFileName(file.name);
      setError('');
    } else {
      setFileName('');
      setFileSize('');
      setDisplayFileName('No file selected');
    }
  };

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!fileName.trim() || !fileSize.trim() || error) return;

    try {
      const sizeBytes = selectedFile ? selectedFile.size : parseInt(fileSize) * 1024;
      await createDocument.mutateAsync({
        name: fileName,
        folder_id: folderId || null,
        created_by: 'Current User', // TODO: Get from auth context
        file_size_bytes: sizeBytes,
      });
      setFileName('');
      setFileSize('');
      setError('');
      setSelectedFile(null);
      setDisplayFileName('No file selected');
      onClose();
    } catch (error) {
      console.error('Failed to upload document:', error);
    }
  };

  const handleClose = () => {
    setFileName('');
    setFileSize('');
    setError('');
    setSelectedFile(null);
    setDisplayFileName('No file selected');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload Document</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4 mt-2">
          <Box display="flex" alignItems="center" gap={2} sx={{ border: '1px solid #ccc', borderRadius: 1, p: 1 }}>
            <Button variant="outlined" onClick={handleChooseFile}>
              Choose File
            </Button>
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {displayFileName}
            </Typography>
          </Box>
          <input
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <TextField
            autoFocus={!selectedFile}
            label="Document Name"
            type="text"
            fullWidth
            variant="outlined"
            value={fileName}
            onChange={(e) => handleInputChange(e.target.value)}
            disabled={!!selectedFile}
            error={!!error}
            helperText={error || 'Only English letters, numbers, dots, and underscores allowed'}
          />
          <TextField
            label="File Size (KB)"
            type="number"
            fullWidth
            variant="outlined"
            value={fileSize}
            onChange={(e) => setFileSize(e.target.value)}
            disabled={!!selectedFile}
            helperText={selectedFile ? "Auto-filled from selected file" : "Enter file size in kilobytes"}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!fileName.trim() || !fileSize.trim() || !!error || createDocument.isPending}
        >
          {createDocument.isPending ? 'Uploading...' : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

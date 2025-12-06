'use client';

import { Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DocumentsToolbarProps from "@/components/features/documents-toolbar/DocumentsToolbar.props";

export default function DocumentsToolbar({ onUploadFiles, onAddFolder }: DocumentsToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">Documents</h1>

      <div className="flex gap-3">
        <Button
          variant="outlined"
          startIcon={<UploadIcon />}
          onClick={onUploadFiles}
          className="!rounded-lg !py-2 !px-4 !normal-case"
        >
          Upload files
        </Button>

        <Button
          variant="contained"
          startIcon={<CreateNewFolderIcon />}
          onClick={onAddFolder}
          className="!rounded-lg !py-2 !px-4 !normal-case"
        >
          Add new folder
        </Button>
      </div>
    </div>
  );
}


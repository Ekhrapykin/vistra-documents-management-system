'use client';

import {Button} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ToolbarProps from "./Toolbar.props";

export default function Toolbar({onUploadFiles, onAddFolder}: ToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <Button
          variant="outlined"
          startIcon={<UploadIcon/>}
          onClick={onUploadFiles}
          className="!rounded-lg !py-2 !px-4 !normal-case"
        >
          Upload files
        </Button>

        <Button
          variant="contained"
          startIcon={<CreateNewFolderIcon/>}
          onClick={onAddFolder}
          className="!rounded-lg !py-2 !px-4 !normal-case"
        >
          Add new folder
        </Button>
      </div>
    </div>
  );
}


export default interface DialogProps {
  open: boolean;
  onClose: () => void;
  parentId?: number | null;
  folderId?: number | null;
  initialData?: {
    id?: number;
    fileName?: string;
    fileSize?: string;
    folderName?: string;
  };
}

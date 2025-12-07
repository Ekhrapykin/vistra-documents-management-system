export default interface DialogProps {
  open: boolean;
  onClose: () => void;
  parentId?: number | null;
  folderId?: number | null;
  initialData?: {
    fileName?: string;
    fileSize?: string;
  };
}

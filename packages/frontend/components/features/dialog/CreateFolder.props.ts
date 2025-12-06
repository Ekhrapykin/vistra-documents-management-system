export default interface CreateFolderDialogProps {
  open: boolean;
  onClose: () => void;
  parentId?: number | null;
}

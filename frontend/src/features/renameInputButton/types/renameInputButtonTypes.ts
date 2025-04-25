export interface RenameInputButtonProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  content: string | undefined;
  setContent: (value: string) => void;
  editInputStyle: string;
  contentStyle: string;
}
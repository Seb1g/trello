interface keyHandlerProps {
  onEscape?: () => void;
  onEnter?: () => void;
}

export const keyHandler = ({ onEscape, onEnter }: keyHandlerProps) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && onEscape) {
      onEscape();
    } else if (event.key === "Enter" && onEnter) {
      onEnter();
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
};
import {RenameInputButtonProps} from "../types/renameInputButtonTypes.ts";

export const RenameInputButton = ({isEditing, setIsEditing, content, setContent, editInputStyle, contentStyle}: RenameInputButtonProps) => {
  return(
    <>
      {isEditing ? (
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
          className={editInputStyle}
        />
      ) : (
        <p
          onClick={() => setIsEditing(true)}
          className={contentStyle}
        >
          {content}
        </p>
      )}
    </>
  )
}
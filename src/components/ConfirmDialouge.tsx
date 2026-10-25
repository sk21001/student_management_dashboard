
type ConfirmDialogueProps = {
  studentName: string
  onConfirm: () => void | Promise<void>
  onCancel: () => void
  isDeleting: boolean;
}

const ConfirmDialogue = ({studentName,onConfirm,onCancel,isDeleting}: ConfirmDialogueProps) => {
  return (
    <div className="confirm-dialog" >
      <p>
        Are you sure you want to delete {studentName}?
      </p>

      <button type="button" onClick={onConfirm} disabled={isDeleting} >{isDeleting ? "Deleting..." : "Confirm"}</button>
      <button type="button" onClick={onCancel} disabled={isDeleting} >Cancel</button>
    </div>
  )
}

export default ConfirmDialogue

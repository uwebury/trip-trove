import { toast } from "react-hot-toast";

export const SaveChangesMessage = ({ onConfirm, onCancel }) => (
  <div>
    <p>Are you sure you want to save changes?</p>
    <button
      onClick={() => {
        onConfirm();
        toast.dismiss(); // Dismiss the toast after confirming
      }}
    >
      Save
    </button>
    <button
      onClick={() => {
        onCancel();
        toast.dismiss(); // Dismiss the toast after canceling
      }}
    >
      Cancel
    </button>
  </div>
);

import { toast } from "react-hot-toast";

export const SaveChangesMessage = ({ onConfirm, onCancel }) => (
  <div>
    <p>Are you sure to save changes?</p>
    <button
      onClick={() => {
        onConfirm();
        toast.dismiss();
      }}
    >
      Yes, save
    </button>
    <button
      onClick={() => {
        onCancel();
        toast.dismiss();
      }}
    >
      No, don't save
    </button>
  </div>
);

export const CancelEditMessage = ({ onConfirm, onCancel, originalData }) => (
  <div>
    <p>Are you sure to discard all changes without saving?</p>
    <button
      onClick={() => {
        // Pass the original data to onCancel
        onCancel(originalData);
        toast.dismiss(); // Dismiss the toast after canceling
      }}
    >
      Yes, discard
    </button>
    <button
      onClick={() => {
        onConfirm();
        toast.dismiss(); // Dismiss the toast after confirming
      }}
    >
      No, don't discard
    </button>
  </div>
);

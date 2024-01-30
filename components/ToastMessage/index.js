import styled from "styled-components";
import {
  ButtonContainer,
  StyledTextButton,
} from "@/components/Button/TextButton";
import toast from "react-hot-toast";
import { toastDuration } from "@/lib/utils";

const StyledToasterMessage = styled.p`
  text-align: center;
  font-size: 1.1rem;
`;

export function ToastMessage({
  message,
  onConfirm,
  onCancel,
  textConfirmButton,
  textCancelButton,
  messageAfterConfirm,
  messageAfterCancel,
}) {
  function handleConfirm() {
    onConfirm();
    toast.dismiss();
    if (messageAfterConfirm) {
      toast.success(messageAfterConfirm, { duration: toastDuration });
    }
  }

  function handleCancel() {
    onCancel();
    toast.dismiss();
    if (messageAfterCancel) {
      toast.success(messageAfterCancel, { duration: toastDuration });
    }
  }

  return (
    <div>
      <StyledToasterMessage>{message}</StyledToasterMessage>
      <ButtonContainer>
        <StyledTextButton onClick={handleConfirm}>
          {textConfirmButton || "OK"}
        </StyledTextButton>
        <StyledTextButton onClick={handleCancel}>
          {textCancelButton || "Cancel"}
        </StyledTextButton>
      </ButtonContainer>
    </div>
  );
}

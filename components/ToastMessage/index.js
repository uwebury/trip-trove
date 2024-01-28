import styled from "styled-components";
import {
  ButtonContainer,
  StyledTextButton,
} from "@/components/Button/TextButton";
import { toast } from "react-hot-toast";

const ToasterMessage = styled.p`
  text-align: center;
  font-size: 1.1rem;
`;

export const ToastMessage = ({
  message,
  onConfirm,
  onCancel,
  textConfirmButton,
  textCancelButton,
  messageAfterConfirm,
  messageAfterCancel,
  toastDuration,
  dismissToast,
}) => {
  const handleConfirm = () => {
    onConfirm();
    dismissToast();
    if (messageAfterConfirm) {
      toast.success(messageAfterConfirm, { duration: toastDuration });
    }
  };

  const handleCancel = () => {
    onCancel();
    dismissToast();
    if (messageAfterCancel) {
      toast.success(messageAfterCancel, { duration: toastDuration });
    }
  };

  return (
    <div>
      <ToasterMessage>{message}</ToasterMessage>
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
};

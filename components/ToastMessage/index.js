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
  dismissToast,
  textConfirmButton,
  textCancelButton,
  messageAfterConfirm,
  messageAfterCancel,
}) => {
  const handleConfirm = () => {
    onConfirm();
    dismissToast();
    if (messageAfterConfirm) {
      toast.success(messageAfterConfirm);
    }
  };

  const handleCancel = () => {
    onCancel();
    dismissToast();
    if (messageAfterCancel) {
      toast.success(messageAfterCancel);
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

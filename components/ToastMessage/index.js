import styled from "styled-components";
import {
  ButtonContainer,
  StyledTextButton,
} from "@/components/Button/TextButton";

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
}) => {
  const handleConfirm = () => {
    onConfirm();
    dismissToast();
  };

  const handleCancel = () => {
    onCancel();
    dismissToast();
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

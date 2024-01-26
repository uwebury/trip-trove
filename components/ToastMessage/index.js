import { toast } from "react-hot-toast";
import styled from "styled-components";
import {
  ButtonContainer,
  StyledTextButton,
} from "@/components/Button/TextButton";

const ToasterContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ToasterMessage = styled.p`
  text-align: center;
  font-size: 1.1rem;
`;

export const SaveChangesMessage = ({ onConfirm, onCancel }) => (
  <div>
    <ToasterMessage>Are you sure to save all changes?</ToasterMessage>
    <ButtonContainer>
      <StyledTextButton
        onClick={() => {
          onConfirm();
          toast.dismiss();
        }}
      >
        Yes, save
      </StyledTextButton>
      <StyledTextButton
        onClick={() => {
          onCancel();
          toast.dismiss();
        }}
      >
        No, do not save
      </StyledTextButton>
    </ButtonContainer>
  </div>
);

export const DiscardChangesMessage = ({ onConfirm, onCancel }) => (
  <div>
    <ToasterMessage>Are you sure to discard all changes?</ToasterMessage>
    <ButtonContainer>
      <StyledTextButton
        onClick={() => {
          onCancel();
          toast.dismiss();
        }}
      >
        Yes, discard
      </StyledTextButton>
      <StyledTextButton
        onClick={() => {
          onConfirm();
          toast.dismiss();
        }}
      >
        No, do not discard
      </StyledTextButton>
    </ButtonContainer>
  </div>
);

export const DeleteConfirmationMessage = ({ onConfirm, onCancel }) => (
  <div>
    <ToasterMessage>Are you sure to delete this trip?</ToasterMessage>
    <ButtonContainer>
      <StyledTextButton
        onClick={() => {
          onConfirm();
          toast.dismiss();
        }}
      >
        OK
      </StyledTextButton>
      <StyledTextButton
        onClick={() => {
          onCancel();
          toast.dismiss();
        }}
      >
        Cancel
      </StyledTextButton>
    </ButtonContainer>
  </div>
);

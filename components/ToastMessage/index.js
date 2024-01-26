import { toast } from "react-hot-toast";
import styled from "styled-components";
import {
  ButtonContainer,
  StyledTextButton,
} from "@/components/Button/TextButton";

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
        Yes, save please!
      </StyledTextButton>
      <StyledTextButton
        onClick={() => {
          onCancel();
          toast.dismiss();
        }}
      >
        No, don&apos;t save.
      </StyledTextButton>
    </ButtonContainer>
  </div>
);

export const DiscardChangesMessage = ({ onConfirm, onCancel, defaultData }) => (
  <div>
    <ToasterMessage>Are you sure to discard all changes?</ToasterMessage>
    <ButtonContainer>
      <StyledTextButton
        onClick={() => {
          onCancel(defaultData);
          toast.dismiss();
        }}
      >
        Yes, discard please.
      </StyledTextButton>
      <StyledTextButton
        onClick={() => {
          onConfirm();
          toast.dismiss();
        }}
      >
        No, don&apos;t discard!
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

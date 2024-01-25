import styled from "styled-components";
import { defaultFont } from "@/styles.js";
import { useState } from "react";
import { formatDateForInput } from "@/lib/utils";
import { DiscardChangesMessage } from "@/components/ToastMessage";
import {
  ButtonContainer,
  StyledTextButton,
} from "@/components/Button/TextButton";
import toast from "react-hot-toast";

const FormContainer = styled.form`
  margin: 2rem auto;
  display: grid;
  gap: 0.3rem;
  padding: 1rem 1.6rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  margin-top: 0.4rem;
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--color-form-label);
`;

const Input = styled.input`
  padding: 0.5rem;
  font-family: ${defaultFont.style.fontFamily};
  font-size: inherit;
  background-color: var(--color-form-input);
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 0.1rem;
`;

const DateContainer = styled.fieldset`
  margin: 0;
  padding: 0;
  border-color: transparent;

  display: grid;
  grid-template-columns: 48% 48%;
  grid-template-rows: auto auto;
  gap: inherit;
  grid-auto-flow: column;
  justify-content: space-between;
`;

export default function Form({
  handleSubmit,
  defaultData,
  isEditMode,
  isDisabled,
  onToastToggle,
}) {
  const [handoverData, setHandoverData] = useState(defaultData);

  function handleInput(event) {
    setHandoverData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleReset() {
    setHandoverData(defaultData);
  }

  function handleDiscard() {
    onToastToggle(true);

    toast(
      <DiscardChangesMessage
        onConfirm={() => {
          onToastToggle(false);
        }}
        onCancel={() => {
          setHandoverData(defaultData);
          onToastToggle(false);
        }}
      />,
      {
        duration: Infinity,
      }
    );
  }

  return (
    <>
      <FormContainer aria-label="trip form" onSubmit={handleSubmit}>
        <Label htmlFor="destination">Destination</Label>
        <Input
          id="destination"
          name="destination"
          type="text"
          value={handoverData?.destination || ""}
          onInput={handleInput}
          required
          disabled={isDisabled}
          autoFocus
        />
        <DateContainer>
          <Label htmlFor="start">Start</Label>
          <Input
            id="start"
            name="start"
            type="date"
            value={formatDateForInput(handoverData?.start || "")}
            onInput={handleInput}
            required
            disabled={isDisabled}
          />
          <Label htmlFor="end">End</Label>
          <Input
            id="end"
            name="end"
            type="date"
            value={formatDateForInput(handoverData?.end || "")}
            onInput={handleInput}
            required
            disabled={isDisabled}
          />
        </DateContainer>
        <Label htmlFor="imageURL">Image URL</Label>
        <Input
          id="imageURL"
          name="imageURL"
          type="text"
          value={handoverData?.imageURL || ""}
          onInput={handleInput}
          disabled={isDisabled}
        />
        <Label htmlFor="packingList">Packing List</Label>
        <Input
          id="packingList"
          name="packingList"
          type="text"
          value={handoverData?.packingList || ""}
          onInput={handleInput}
          disabled={isDisabled}
        />
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          name="notes"
          type="text"
          value={handoverData?.notes || ""}
          onInput={handleInput}
          disabled={isDisabled}
        />
        <ButtonContainer>
          <StyledTextButton
            type="button"
            onClick={isEditMode ? handleDiscard : handleReset}
            disabled={isDisabled}
          >
            {isEditMode ? "Discard" : "Reset"}
          </StyledTextButton>
          <StyledTextButton disabled={isDisabled}>Save</StyledTextButton>
        </ButtonContainer>
      </FormContainer>
    </>
  );
}

import styled, { css } from "styled-components";
import { defaultFont } from "@/styles.js";
import { useState } from "react";
import { validateTripDates, formatDateForInput } from "@/lib/utils";
import {
  SaveChangesMessage,
  DiscardChangesMessage,
} from "@/components/ToastMessage";
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

  /* Disable form elements when formDisabled is true */
  ${({ formDisabled }) =>
    formDisabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}
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

export default function Form({ defaultData, isEditMode, onSubmit }) {
  const [handoverData, setHandoverData] = useState(defaultData);
  const [formDisabled, setFormDisabled] = useState(false); // Initialize as not disabled

  function handleInput(event) {
    setHandoverData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleReset() {
    setFormDisabled(true); // Disable the entire form
    if (handoverData === defaultData) {
      toast.error("No entries yet, nothing to reset...");
      setFormDisabled(false); // Enable the form
      return;
    }
    setHandoverData(defaultData);
    setFormDisabled(false); // Enable the form
  }

  function handleDiscard() {
    setFormDisabled(true); // Disable the entire form
    if (handoverData === defaultData) {
      toast.error("No changes yet, nothing to discard...");
      setFormDisabled(false); // Enable the form
      return;
    }

    toast(
      <DiscardChangesMessage
        onConfirm={() => {
          setFormDisabled(false); // Enable the form
        }}
        onCancel={() => {
          setHandoverData(defaultData);
          setFormDisabled(false); // Enable the form
        }}
        handoverData={handoverData}
      />,
      {
        duration: Infinity,
      }
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormDisabled(true); // Disable the entire form

    if (handoverData === defaultData) {
      toast.error("No changes yet, nothing to save...");
      setFormDisabled(false); // Enable the form
      return;
    }

    if (!validateTripDates(handoverData)) {
      toast.error("Oops! End date earlier than start date?");
      setFormDisabled(false); // Enable the form
      return;
    }

    toast(
      <SaveChangesMessage
        onConfirm={() => {
          onSubmit(handoverData);
          setFormDisabled(false); // Enable the form
        }}
        onCancel={() => {
          setFormDisabled(false); // Enable the form
          toast.error("Data not saved.");
          // Check if toast is displayed
          return;
        }}
      />,
      {
        duration: Infinity,
      }
    );
  }

  return (
    <>
      <FormContainer
        aria-label="trip form"
        onSubmit={handleSubmit}
        formDisabled={formDisabled}
      >
        <Label htmlFor="destination">Destination</Label>
        <Input
          id="destination"
          name="destination"
          type="text"
          value={handoverData?.destination || ""}
          onInput={handleInput}
          required
          autoFocus
          disabled={formDisabled}
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
            disabled={formDisabled}
          />
          <Label htmlFor="end">End</Label>
          <Input
            id="end"
            name="end"
            type="date"
            value={formatDateForInput(handoverData?.end || "")}
            onInput={handleInput}
            required
            disabled={formDisabled}
          />
        </DateContainer>
        <Label htmlFor="imageURL">Image URL</Label>
        <Input
          id="imageURL"
          name="imageURL"
          type="text"
          value={handoverData?.imageURL || ""}
          onInput={handleInput}
          disabled={formDisabled}
        />
        <Label htmlFor="packingList">Packing List</Label>
        <Input
          id="packingList"
          name="packingList"
          type="text"
          value={handoverData?.packingList || ""}
          onInput={handleInput}
          disabled={formDisabled}
        />
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          name="notes"
          type="text"
          value={handoverData?.notes || ""}
          onInput={handleInput}
          disabled={formDisabled}
        />
        <ButtonContainer>
          <StyledTextButton
            type="button"
            onClick={isEditMode ? handleDiscard : handleReset}
            disabled={formDisabled}
          >
            {isEditMode ? "Discard" : "Reset"}
          </StyledTextButton>
          <StyledTextButton type="submit" disabled={formDisabled}>
            Save
          </StyledTextButton>
        </ButtonContainer>
      </FormContainer>
    </>
  );
}

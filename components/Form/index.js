import styled from "styled-components";
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

  const [isDisabled, setIsDisabled] = useState(false);

  function handleInput(event) {
    setHandoverData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleReset() {
    setIsDisabled(true);
    if (handoverData === defaultData) {
      toast.error("No entries yet, nothing to reset...");
      setIsDisabled(false);
      return;
    }
    setHandoverData(defaultData);
  }

  function handleDiscard() {
    setIsDisabled(true);
    if (handoverData === defaultData) {
      toast.error("No changes yet, nothing to discard...");
      setIsDisabled(false);
      return;
    }

    toast(
      <DiscardChangesMessage
        onConfirm={() => {
          setIsDisabled(false);
        }}
        onCancel={() => {
          setHandoverData(defaultData);
          setIsDisabled(false);
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
    setIsDisabled(true);

    // ==========================
    // TBD: as destination, start and end are required inputs there's no need to check if (isEditMode). If you agree just kick the commented lines!
    // ==========================

    // if (handoverData === defaultData) {
    //   if (isEditMode) {
    //     toast.error("No changes yet, nothing to save...");
    //   } else {
    //     toast.error("No data entries yet, nothing to save...");
    //   }

    //   setIsDisabled(false);
    //   return;
    // }

    if (handoverData === defaultData) {
      toast.error("No changes yet, nothing to save...");
      setIsDisabled(false);
      return;
    }

    if (!validateTripDates(handoverData)) {
      toast.error("Oops! End date earlier than start date?");
      setIsDisabled(false);
      return;
    }

    toast(
      <SaveChangesMessage
        onConfirm={() => {
          onSubmit(handoverData);
          setIsDisabled(false);
        }}
        onCancel={() => {
          setIsDisabled(false);
          toast.error("Data not saved.");
          // ==========================
          // toast is not displayed yet, but would make sense >>> check!
          // ==========================
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

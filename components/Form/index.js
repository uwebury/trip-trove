import styled from "styled-components";
import { useRef, useState } from "react";
import { formatDateForInput } from "@/lib/utils";
import { DiscardChangesMessage } from "../ToastMessage";
import toast from "react-hot-toast";
import { set } from "mongoose";

const FormContainer = styled.form`
  margin: 2rem auto;
  display: grid;
  gap: 0.4rem;
  padding: 1rem 1.6rem;
  border: 2px solid #ddd;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  margin-top: 0.6rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  background-color: #f5f7f9;
  border: 2px solid #ddd;
  border-radius: 0.5rem;
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

const FormButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;

const StyledFormButton = styled.button`
  min-width: 140px;
  padding: 0.5rem;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border: 2px solid #848484;
  border-radius: 0.5rem;
  font-size: inherit;
  font-weight: bold;
`;

export default function Form({
  handleSubmit,
  defaultData,
  isEditMode,
  isDisabled,
  onToastToggle,
}) {
  const formRef = useRef(null);
  const [handoverData, setHandoverData] = useState(defaultData);

  function handleInput(event) {
    setHandoverData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleReset(event) {
    event.preventDefault();
    setHandoverData(defaultData);
    formRef.current.reset();
    formRef.current.elements.destination.focus();
  }

  function handleDiscard(event) {
    event.preventDefault();
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
        handoverData={handoverData}
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
        ref={formRef}
      >
        <Label htmlFor="destination">Destination</Label>
        <Input
          id="destination"
          name="destination"
          type="text"
          value={handoverData?.destination || ""}
          onInput={handleInput}
          required
          disabled={isDisabled}
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
        <FormButtonContainer>
          <StyledFormButton
            type="button"
            onClick={isEditMode ? handleDiscard : handleReset}
            $backgroundColor="#ffdbdb"
            disabled={isDisabled}
          >
            {isEditMode ? "Discard" : "Reset"}
          </StyledFormButton>
          <StyledFormButton
            type="submit"
            $backgroundColor="#d9d9d9"
            disabled={isDisabled}
          >
            Save
          </StyledFormButton>
        </FormButtonContainer>
      </FormContainer>
    </>
  );
}

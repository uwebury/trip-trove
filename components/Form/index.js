import styled from "styled-components";
import { useRef, useState } from "react";
import { formatDateForInput } from "@/lib/utils";
import { CancelEditMessage } from "../ToastMessage";
import toast from "react-hot-toast";

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

export default function Form({ onSubmit, defaultData, isEditMode }) {
  const formRef = useRef(null);
  const [originalData, setOriginalData] = useState(defaultData);

  const handleReset = (event) => {
    event.preventDefault();
    formRef.current.reset();
    formRef.current.elements.destination.focus();
  };

  const handleCancel = (event) => {
    event.preventDefault();

    toast(
      <CancelEditMessage
        onConfirm={() => {}}
        onCancel={() => discardChanges()}
        originalData={originalData}
      />,
      {
        duration: Infinity,
      }
    );

    const discardChanges = () => {
      formRef.current.elements.destination.value =
        originalData?.destination || "";
      formRef.current.elements.start.value =
        formatDateForInput(originalData?.start) || "";
      formRef.current.elements.end.value =
        formatDateForInput(originalData?.end) || "";
      formRef.current.elements.imageURL.value = originalData?.imageURL || "";
      formRef.current.elements.packingList.value =
        originalData?.packingList || "";
      formRef.current.elements.notes.value = originalData?.notes || "";
    };
  };

  return (
    <>
      <FormContainer aria-label="trip form" onSubmit={onSubmit} ref={formRef}>
        <Label htmlFor="destination">Destination</Label>
        <Input
          id="destination"
          name="destination"
          type="text"
          defaultValue={defaultData?.destination}
          required
        />
        <DateContainer>
          <Label htmlFor="start">Start</Label>
          <Input
            id="start"
            name="start"
            type="date"
            defaultValue={formatDateForInput(defaultData?.start)}
            required
          />
          <Label htmlFor="end">End</Label>
          <Input
            id="end"
            name="end"
            type="date"
            defaultValue={formatDateForInput(defaultData?.end)}
            required
          />
        </DateContainer>
        <Label htmlFor="imageURL">Image URL</Label>
        <Input
          id="imageURL"
          name="imageURL"
          type="text"
          defaultValue={defaultData?.imageURL}
        />
        <Label htmlFor="packingList">Packing List</Label>
        <Input
          id="packingList"
          name="packingList"
          type="text"
          defaultValue={defaultData?.packingList}
        />
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          name="notes"
          type="text"
          defaultValue={defaultData?.notes}
        />
        <FormButtonContainer>
          <StyledFormButton
            onClick={isEditMode ? handleCancel : handleReset}
            $backgroundColor="#ffdbdb"
          >
            {isEditMode ? "Cancel" : "Reset"}
          </StyledFormButton>
          <StyledFormButton type="submit" $backgroundColor="#d9d9d9">
            Save
          </StyledFormButton>
        </FormButtonContainer>
      </FormContainer>
    </>
  );
}

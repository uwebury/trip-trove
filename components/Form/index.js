import styled from "styled-components";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const FormContainer = styled.form`
  margin: 0 3rem;
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

export default function Form() {
  const newTripId = uuidv4();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const startDate = new Date(data.start);
    const endDate = new Date(data.end);

    if (endDate < startDate) {
      alert("End date cannot be before start date");
      return;
    }

    const newTrip = {
      _id: newTripId,
      ...data,
    };

    event.target.reset();
    event.target.elements.destination.focus();

    const existingData = JSON.parse(localStorage.getItem("tripsData")) || [];
    const updatedData = [newTrip, ...existingData];

    localStorage.setItem("tripsData", JSON.stringify(updatedData));
  };

  const formRef = useRef(null);

  const handleReset = (event) => {
    event.preventDefault();
    formRef.current.reset();
    formRef.current.elements.destination.focus();
  };
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
          defaultValue=""
          required
        />
        <DateContainer>
          <Label htmlFor="start">Start</Label>
          <Input id="start" name="start" type="date" required />
          <Label htmlFor="end">End</Label>
          <Input id="end" name="end" type="date" required />
        </DateContainer>
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" name="image" type="text" defaultValue="" />
        <Label htmlFor="packing-list">Packing List</Label>
        <Input
          id="packing-list"
          name="packing-list"
          type="text"
          defaultValue=""
        />
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" name="notes" type="text" defaultValue="" />
        <FormButtonContainer>
          <StyledFormButton onClick={handleReset} $backgroundColor="#ffdbdb">
            Reset
          </StyledFormButton>
          <StyledFormButton type="submit" $backgroundColor="#d9d9d9">
            Save
          </StyledFormButton>
        </FormButtonContainer>
      </FormContainer>
    </>
  );
}

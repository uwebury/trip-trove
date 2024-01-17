import styled from "styled-components";
import { useState, useId } from "react";
import { initialTrips } from "/lib/data";

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
  const [updatedData, setUpdatedData] = useState(initialTrips);
  const newTripId = useId();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const newTrip = {
      _id: newTripId,
      ...data,
    };

    setUpdatedData((prevData) => {
      const updatedData = [...prevData, newTrip];

      event.target.reset();
      localStorage.setItem("tripsData", JSON.stringify(updatedData));
      return updatedData;
    });
  };
  const handleReset = () => {
    console.log("reset button clicked");
  };

  return (
    <>
      <FormContainer aria-label="create new trip form" onSubmit={handleSubmit}>
        <Label htmlFor="destination">Destination</Label>
        <Input
          id="destination"
          name="destination"
          type="text"
          defaultValue=""
          required
        />
        <DateContainer>
          <Label htmlFor="start-date">Start</Label>
          <Input id="start-date" name="start-date" type="date" required />
          <Label htmlFor="end-date">End</Label>
          <Input id="end-date" name="end-date" type="date" required />
        </DateContainer>
        <Label htmlFor="image-url">Image URL</Label>
        <Input id="image-url" name="image-url" type="text" defaultValue="" />
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
          <StyledFormButton
            type="button"
            onClick={handleReset}
            $backgroundColor="#ffdbdb"
          >
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

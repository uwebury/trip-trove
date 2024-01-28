import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { defaultFont } from "@/styles.js";
import { validateTripDates, formatDateForInput } from "@/lib/utils";
import { ToastMessage } from "@/components/ToastMessage";
import {
  ButtonContainer,
  StyledTextButton,
} from "@/components/Button/TextButton";

const FormContainer = styled.form`
  margin: 2rem auto;
  display: grid;
  gap: 0.3rem;
  padding: 1rem 1.6rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.formDisabled ? "0.7" : "1")};
  pointer-events: ${(props) => (props.formDisabled ? "none" : "auto")};
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
  const [formDisabled, setFormDisabled] = useState(false);
  const destinationRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const imageURLRef = useRef(null);
  const packingListRef = useRef(null);
  const notesRef = useRef(null);

  const toastDuration = 2000;

  useEffect(() => {
    setHandoverData(defaultData);
  }, [defaultData]);

  useEffect(() => {
    destinationRef.current.focus();
  }, []);

  useEffect(() => {
    const handleButtonClick = () => {
      toast.dismiss();
    };
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener("click", handleButtonClick);
    });
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", handleButtonClick);
      });
    };
  }, []);

  function handleKeyDown(event, currentRef) {
    const isEnterKey = (event) => {
      return event.key === "Enter";
    };

    const handleEnterKey = (currentRef) => {
      const nextRef = getNextRef(currentRef);
      if (nextRef !== null) {
        nextRef.current.focus();
      } else {
        handleSubmit(event);
      }
    };

    const getNextRef = (currentRef) => {
      switch (currentRef) {
        case destinationRef:
          return startRef;
        case startRef:
          return endRef;
        case endRef:
          return imageURLRef;
        case imageURLRef:
          return packingListRef;
        case packingListRef:
          return notesRef;
        case notesRef:
          return null;
        default:
          return null;
      }
    };

    if (isEnterKey(event)) {
      event.preventDefault();
      handleEnterKey(currentRef);
    }
  }
  function handleInput(event) {
    setHandoverData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleReset() {
    setFormDisabled(true);
    if (handoverData === defaultData) {
      toast.error("No entries yet, nothing to reset...", {
        duration: toastDuration,
      });
      setFormDisabled(false);
      return;
    }
    toast(
      <ToastMessage
        message="Are you sure to reset form?"
        textConfirmButton="Yes, reset please."
        messageAfterConfirm="Ok, form reset."
        textCancelButton="No, don&rsquo;t reset!"
        messageAfterCancel="Ok, no reset."
        toastDuration={toastDuration}
        onConfirm={() => {
          setHandoverData(defaultData);
          setFormDisabled(false);
        }}
        onCancel={() => {
          setFormDisabled(false);
        }}
      />,
      { duration: Infinity }
    );
  }

  function handleDiscard() {
    setFormDisabled(true);
    if (handoverData === defaultData) {
      toast.error("No changes yet, nothing to discard...", {
        duration: toastDuration,
      });
      setFormDisabled(false);
      return;
    }

    toast(
      <ToastMessage
        message="Are you sure to discard all changes?"
        textConfirmButton="Yes, discard please."
        messageAfterConfirm="Form reset to last saved version."
        textCancelButton="No, don&rsquo;t discard!"
        messageAfterCancel="Nothing changed."
        toastDuration={toastDuration}
        onConfirm={() => {
          setHandoverData(defaultData);
          setFormDisabled(false);
        }}
        onCancel={() => {
          setFormDisabled(false);
        }}
      />,
      { duration: Infinity }
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormDisabled(true);

    if (handoverData === defaultData) {
      toast.error("No changes yet, nothing to save...", {
        duration: toastDuration,
      });
      setFormDisabled(false);
      return;
    }

    if (!validateTripDates(handoverData)) {
      toast.error("End date earlier than start date...", {
        duration: toastDuration,
      });
      setFormDisabled(false);
      return;
    }

    toast(
      <ToastMessage
        message="Are you sure to save all changes?"
        textConfirmButton="Yes, save please!"
        messageAfterConfirm="Data successfully saved."
        textCancelButton="No, don&rsquo;t save."
        messageAfterCancel="Data not saved."
        toastDuration={toastDuration}
        onConfirm={() => {
          onSubmit(handoverData);
          setFormDisabled(false);
        }}
        onCancel={() => {
          setFormDisabled(false);
        }}
      />,
      { duration: Infinity }
    );
  }

  return (
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
        disabled={formDisabled}
        ref={destinationRef}
        onKeyDown={(event) => handleKeyDown(event, destinationRef)}
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
          ref={startRef}
          onKeyDown={(event) => handleKeyDown(event, startRef)}
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
          ref={endRef}
          onKeyDown={(event) => handleKeyDown(event, endRef)}
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
        ref={imageURLRef}
        onKeyDown={(event) => handleKeyDown(event, imageURLRef)}
      />
      <Label htmlFor="packingList">Packing List</Label>
      <Input
        id="packingList"
        name="packingList"
        type="text"
        value={handoverData?.packingList || ""}
        onInput={handleInput}
        disabled={formDisabled}
        ref={packingListRef}
        onKeyDown={(event) => handleKeyDown(event, packingListRef)}
      />
      <Label htmlFor="notes">Notes</Label>
      <Input
        id="notes"
        name="notes"
        type="text"
        value={handoverData?.notes || ""}
        onInput={handleInput}
        disabled={formDisabled}
        ref={notesRef}
        onKeyDown={(event) => handleKeyDown(event, notesRef)}
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
  );
}

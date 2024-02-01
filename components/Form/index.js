import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  toastDuration,
  validateTripDates,
  formatDateForInput,
} from "@/lib/utils";
import { ToastMessage } from "@/components/ToastMessage";
import {
  ButtonContainer,
  StyledTextButton,
} from "@/components/Button/TextButton";
import {
  Label,
  TripForm,
  Input,
  DateContainer,
  PackListContainer,
  PackList,
  InputContainer,
  InputItem,
  InputQuantity,
  StyledMiniButton,
} from "@/components/Form/Form.styled";

export default function Form({ defaultData, isEditMode, onSubmit }) {
  const [handoverData, setHandoverData] = useState(defaultData);
  const [formDisabled, setFormDisabled] = useState(false);

  useEffect(() => {
    if (defaultData?.packingList?.length === 0) {
      setHandoverData((prev) => ({
        ...prev,
        packingList: [{ itemName: "", itemQuantity: null }],
      }));
    }
  }, [defaultData]);

  function handleInput(event) {
    setHandoverData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleAddItem() {
    const lastItem =
      handoverData.packingList[handoverData.packingList.length - 1];

    if (!lastItem || lastItem.itemName.trim() !== "") {
      setHandoverData((prev) => ({
        ...prev,
        packingList: [
          ...prev.packingList,
          { itemName: "", itemQuantity: null },
        ],
      }));
    }
  }

  function handleUpdateItem(index, itemName, itemQuantity) {
    setHandoverData((prev) => {
      const updatedPackingList = [...prev.packingList];
      updatedPackingList[index] = { itemName, itemQuantity };
      return {
        ...prev,
        packingList: updatedPackingList,
      };
    });
  }

  function handleRemoveItem(index) {
    setHandoverData((prev) => {
      const updatedPackingList = [...prev.packingList];
      if (
        updatedPackingList.length > 1 ||
        index !== updatedPackingList.length - 1
      ) {
        updatedPackingList.splice(index, 1);
      } else {
        updatedPackingList[index] = { itemName: "", itemQuantity: null };
      }
      return {
        ...prev,
        packingList: updatedPackingList,
      };
    });
  }

  function handleReset() {
    toast.dismiss();
    setFormDisabled(true);
    if (handoverData === defaultData) {
      toast.error("No entries yet, nothing to reset.", {
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
    toast.dismiss();
    setFormDisabled(true);
    if (handoverData === defaultData) {
      toast.error("No changes yet, nothing to discard.", {
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
    toast.dismiss();
    setFormDisabled(true);

    if (handoverData === defaultData) {
      toast.error("No changes yet, nothing to save.", {
        duration: toastDuration,
      });
      setFormDisabled(false);
      return;
    }

    if (!validateTripDates(handoverData)) {
      toast.error("End date earlier than start date.", {
        duration: toastDuration,
      });
      setFormDisabled(false);
      return;
    }

    toast(
      <ToastMessage
        message="Are you sure to save all changes?"
        textConfirmButton="Yes, save please."
        messageAfterConfirm="Data successfully saved."
        textCancelButton="No, don&rsquo;t save."
        messageAfterCancel="Data not saved."
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
    <TripForm
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
      <PackListContainer>
        <Label htmlFor="packingList">Packing List</Label>
        <PackList>
          {handoverData?.packingList?.map((item, index) => (
            <InputContainer key={index}>
              <InputItem
                id={`packingList_${index}`}
                name={`packingList_${index}`}
                type="text"
                value={item.itemName}
                onChange={(event) =>
                  handleUpdateItem(index, event.target.value, item.itemQuantity)
                }
                disabled={formDisabled}
              />
              <InputQuantity
                id={`packingList_quantity_${index}`}
                name={`packingList_quantity_${index}`}
                type="number"
                value={item.itemQuantity}
                onChange={(event) =>
                  handleUpdateItem(
                    index,
                    item.itemName,
                    Math.max(0, parseInt(event.target.value))
                  )
                }
                disabled={formDisabled}
                min="0"
                max="999"
              />
              <StyledMiniButton
                type="button"
                defaultColor={"var(--color-delete-button)"}
                hoverColor={"var(--color-delete-button-hover)"}
                textColor={"var(--color-delete-button-text)"}
                onClick={() => handleRemoveItem(index)}
                disabled={formDisabled}
              >
                X
              </StyledMiniButton>

              {index === handoverData.packingList.length - 1 && (
                <StyledMiniButton
                  type="button"
                  defaultColor={"var(--color-add-button)"}
                  hoverColor={"var(--color-add-button-hover)"}
                  textColor={"var(--color-add-button-text)"}
                  fontSize={"1.4rem"}
                  onClick={handleAddItem}
                  disabled={formDisabled}
                >
                  +
                </StyledMiniButton>
              )}
            </InputContainer>
          ))}
        </PackList>
      </PackListContainer>
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
    </TripForm>
  );
}
